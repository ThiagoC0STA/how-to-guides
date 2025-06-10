"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useLoading } from "@/components/LoadingProvider";
import { useErrorStore } from "@/store/errorStore";
import { useSuccessStore } from "@/store/successStore";
import { privateRequest } from "@/utils/apiClient";
import { supabase } from "@/lib/supabaseClient";
import CategoryDialog from "../../dashboard/components/CategoryDialog";
import { Guide } from "../types";
import ReviewStep from "../components/ReviewStep";

export default function AddGuideByJson() {
  const router = useRouter();
  const { show: showLoading, hide: hideLoading } = useLoading();
  const { showError } = useErrorStore();
  const { showSuccess } = useSuccessStore();

  const [prompt, setPrompt] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<Partial<Guide> | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [numModules, setNumModules] = useState(8);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const { data } = await privateRequest.get("/categories");
      if (data?.categories) {
        setCategories(data.categories);
      }
    } catch (error: any) {
      showError(
        "Error loading categories",
        error.message || "Could not load categories"
      );
    }
  };

  // Add useEffect to fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      // Criar URL temporária para preview
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
    }
  };

  const handleAddCategory = () => {
    setOpenCategoryDialog(true);
  };

  const handleCategoryDialogSave = async (categoryData: any) => {
    showLoading();
    try {
      const response = await privateRequest.post("/categories", categoryData);
      if (!response.data?.category) {
        throw new Error("Error creating category");
      }
      setOpenCategoryDialog(false);
      await fetchCategories();
      setSelectedCategories((prev) => [...prev, response.data.category.id]);
    } catch (error: any) {
      showError(
        "Error creating category",
        error.message || "Could not create category"
      );
    } finally {
      hideLoading();
    }
  };

  const handlePreview = () => {
    try {
      if (!jsonInput.trim()) {
        showError("Invalid Input", "Please paste your JSON data first");
        return;
      }

      const jsonData = JSON.parse(jsonInput);
      
      // Validar campos obrigatórios do JSON
      const missingFields = [];
      if (!jsonData.title) missingFields.push("Title");
      if (!jsonData.description) missingFields.push("Description");
      if (!jsonData.modules?.length) missingFields.push("At least one Module");
      if (!jsonData.metadata?.keywords?.length) missingFields.push("At least one Keyword");
      if (!jsonData.metadata?.overview?.text) missingFields.push("Overview Text");
      if (!jsonData.metadata?.overview?.bullets?.length) missingFields.push("At least one Overview Bullet");

      if (missingFields.length > 0) {
        showError(
          "Invalid JSON Structure",
          `Your JSON is missing the following required fields:\n\n${missingFields.map(field => `• ${field}`).join('\n')}`
        );
        return;
      }

      // Adicionar a URL da imagem ao preview se existir
      const previewDataWithImage = {
        ...jsonData,
        image: imagePreviewUrl || jsonData.image,
      };

      setPreviewData(previewDataWithImage);
      setShowPreview(true);
    } catch (error) {
      showError(
        "Invalid JSON Format",
        "Please check your JSON format. Make sure it's valid JSON and follows the required structure."
      );
      console.error(error);
    }
  };

  // Limpar URL temporária quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const handleSubmit = async () => {
    const missingFields = [];

    if (!previewData) missingFields.push("JSON data");
    if (!image) missingFields.push("Guide image");
    if (!selectedCategories.length) missingFields.push("At least one category");

    if (missingFields.length > 0) {
      showError(
        "Required Fields Missing",
        `Please provide the following required fields:\n\n${missingFields.map(field => `• ${field}`).join('\n')}`
      );
      return;
    }

    showLoading();
    try {
      // 1. Upload image
      if (!image) throw new Error("No image selected");
      
      // Limpar o nome do arquivo
      const sanitizedFileName = image.name
        .replace(/\s+/g, '_') // Substituir espaços por underscore
        .replace(/[^a-zA-Z0-9._-]/g, '') // Remover caracteres especiais
        .toLowerCase(); // Converter para minúsculas
      
      const filePath = `guides/${Date.now()}-${sanitizedFileName}`;
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, image, {
          cacheControl: "3600",
          upsert: false,
        });
      if (uploadError) throw new Error(`Error uploading image: ${uploadError.message}`);

      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      // 2. Prepare guide data
      const guideData = {
        ...previewData,
        image: publicUrlData.publicUrl,
        categories: categories
          .filter((cat) => selectedCategories.includes(cat.id))
          .map((cat) => ({
            id: cat.id,
            title: cat.title,
            color: cat.color,
          })),
      };

      // 3. Create guide
      const response = await privateRequest.post("/guides", guideData);
      if (!response.data?.guide) {
        throw new Error("Error creating guide: No guide data returned");
      }

      showSuccess("Guide created successfully!");
      router.push("/administrador/dashboard");
    } catch (error: any) {
      showError(
        "Error Creating Guide",
        error.message || "Could not create guide. Please check all required fields and try again."
      );
    } finally {
      hideLoading();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Add Guide by JSON
      </Typography>

      <Stack spacing={4}>
        {/* Prompt Section */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Example Prompt for ChatGPT
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Enter your guide topic"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Machine Learning Basics, Neural Networks, Deep Learning, Computer Vision, NLP, etc."
            />
            <TextField
              type="number"
              label="Number of Modules"
              value={numModules}
              onChange={e => setNumModules(Math.max(1, Number(e.target.value)))}
              inputProps={{ min: 1, style: { width: 60 } }}
              sx={{ width: 140 }}
            />
            <Button
              variant="contained"
              onClick={() => {
                const exampleText = `Generate a comprehensive guide JSON object for a guide about ${prompt}. The guide should be in English and follow this structure. Make sure to create at least ${numModules} detailed modules with multiple sections each:

{
  "title": "Guide Title (be specific and engaging)",
  "description": "Detailed description that explains what the guide covers and its value to the reader",
  "color": "hex color code (choose a color that matches the topic and creates a professional look)",
  "is_popular": boolean (set to true if the topic is trending or widely used),
  "modules": [
    {
      "title": "Introduction Module Title",
      "locked": false,
      "content": {
        "sections": [
          {
            "heading": "What is ${prompt}?",
            "text": "Clear explanation of the topic, its importance, and current relevance",
            "list": [
              "Key feature or benefit 1",
              "Key feature or benefit 2",
              "Key feature or benefit 3"
            ],
            "expandable": false
          },
          {
            "heading": "Why Learn ${prompt} Now?",
            "text": "Explain the current relevance and future potential",
            "list": [
              "Current trend or need 1",
              "Future opportunity 2",
              "Industry demand 3"
            ],
            "expandable": true
          }
        ]
      },
      "questions": [
        {
          "question": "Multiple choice question about ${prompt}",
          "options": [
            "Option 1 (incorrect)",
            "Option 2 (incorrect)",
            "Option 3 (correct)",
            "Option 4 (incorrect)"
          ],
          "correctAnswer": 2
        }
      ]
    },
    {
      "title": "Getting Started with ${prompt}",
      "locked": false,
      "content": {
        "sections": [
          {
            "heading": "Prerequisites",
            "text": "What users need to know or have before starting",
            "list": [
              "Requirement 1",
              "Requirement 2",
              "Requirement 3"
            ],
            "expandable": false
          },
          {
            "heading": "Setup Steps",
            "text": "Detailed setup instructions",
            "list": [
              "Step 1 with details",
              "Step 2 with details",
              "Step 3 with details"
            ],
            "expandable": true
          }
        ]
      },
      "questions": [
        {
          "question": "Question about ${prompt} setup or prerequisites",
          "options": [
            "Option 1",
            "Option 2",
            "Option 3",
            "Option 4"
          ],
          "correctAnswer": 0
        }
      ]
    }
  ],
  "metadata": {
    "keywords": [
      "${prompt.toLowerCase()}",
      "keyword2",
      "keyword3",
      "keyword4",
      "keyword5"
    ],
    "overview": {
      "text": "Comprehensive overview of what the guide covers and its value proposition",
      "bullets": [
        "Key learning outcome 1",
        "Key learning outcome 2",
        "Key learning outcome 3",
        "Estimated time to complete"
      ]
    }
  }
}

Make sure to:\n1. Create at least ${numModules} detailed modules\n2. Each module should have 2-3 sections\n3. Include relevant questions for each module\n4. Use clear and concise English\n5. Include all required fields\n6. Generate realistic and helpful content\n7. Use appropriate color codes that match the topic\n8. Structure modules and steps logically\n9. Add comprehensive metadata and keywords\n10. Set locked to false for all modules\n11. Return ONLY the JSON object, no additional text`;
                navigator.clipboard.writeText(exampleText);
                showSuccess("Example prompt copied to clipboard!");
              }}
              disabled={!prompt}
            >
              Copy Example
            </Button>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={12}
            label="Example prompt (read-only)"
            value={`Generate a comprehensive guide JSON object for a guide about ${
              prompt || "[YOUR AI TOPIC]"
            }. The guide should be in English and follow this structure. Make sure to create at least ${numModules} detailed modules with multiple sections each. Focus on practical applications, current state of the art, and real-world use cases:

{
  "title": "Create an engaging and specific title",
  "description": "Write a comprehensive description",
  "color": "Choose a hex color code",
  "is_popular": true,
  "modules": [
    {
      "title": "Create an introduction module title",
      "locked": false,
      "content": {
        "sections": [
          {
            "heading": "Create a relevant heading",
            "text": "Write detailed explanation text",
            "list": [
              "Create relevant list item 1",
              "Create relevant list item 2",
              "Create relevant list item 3"
            ],
            "expandable": false
          },
          {
            "heading": "Create another relevant heading",
            "text": "Write detailed explanation text",
            "list": [
              "Create relevant list item 1",
              "Create relevant list item 2",
              "Create relevant list item 3"
            ],
            "expandable": true
          }
        ]
      },
      "questions": [
        {
          "question": "Create a relevant question",
          "options": [
            "Create option 1",
            "Create option 2",
            "Create option 3",
            "Create option 4"
          ],
          "correctAnswer": 2
        }
      ]
    }
  ],
  "metadata": {
    "keywords": [
      "Generate 5 relevant keywords"
    ],
    "overview": {
      "text": "Write a comprehensive overview",
      "bullets": [
        "Create relevant bullet 1",
        "Create relevant bullet 2",
        "Create relevant bullet 3",
        "Add estimated time"
      ]
    }
  }
}

Make sure to:
1. Create at least ${numModules} detailed modules
2. Each module should have 2-3 sections
3. Include relevant questions for each module
4. Use clear and concise English
5. Include all required fields
6. Generate realistic and helpful content
7. Use appropriate color codes that match the topic
8. Structure modules and steps logically
9. Add comprehensive metadata and keywords
10. Set locked to false for all modules
11. Return ONLY the JSON object, no additional text`}
            InputProps={{
              readOnly: true,
            }}
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter your topic above and click &quot;Copy Example&quot; to copy
            the prompt. Then paste it into ChatGPT and copy the generated JSON
            back to the field below.
          </Typography>
        </Paper>

        {/* JSON Input Section */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Guide JSON
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={10}
            label="Paste your JSON here"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Paper>

        {/* Categories Section */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Categories
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Categories</InputLabel>
            <Select
              multiple
              value={selectedCategories}
              onChange={(e) =>
                setSelectedCategories(e.target.value as string[])
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => {
                    const category = categories.find((cat) => cat.id === value);
                    return (
                      <Chip
                        key={value}
                        label={category?.title || value}
                        sx={{
                          bgcolor: category?.color || "default",
                          color: category?.color ? "#fff" : "inherit",
                        }}
                      />
                    );
                  })}
                </Box>
              )}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.id}
                  value={category.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {category.icon_url && (
                    <Box
                      component="img"
                      src={category.icon_url}
                      alt={category.title}
                      sx={{ width: 24, height: 24 }}
                    />
                  )}
                  <Typography>{category.title}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            onClick={handleAddCategory}
            startIcon={<AddIcon />}
          >
            Add New Category
          </Button>
        </Paper>

        {/* Image Upload Section */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Guide Image
          </Typography>
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button variant="outlined" component="span">
              Upload Image
            </Button>
          </label>
          {image && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Selected: {image.name}
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Preview and Submit Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={handlePreview}>
            Preview Guide
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Create Guide
          </Button>
        </Box>
      </Stack>

      {/* Preview Dialog */}
      <Dialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Preview Guide</DialogTitle>
        <DialogContent>
          {previewData && <ReviewStep formData={previewData} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPreview(false)}>Close</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Create Guide
          </Button>
        </DialogActions>
      </Dialog>

      {/* Category Dialog */}
      <CategoryDialog
        open={openCategoryDialog}
        onClose={() => setOpenCategoryDialog(false)}
        onSave={handleCategoryDialogSave}
      />
    </Container>
  );
}
