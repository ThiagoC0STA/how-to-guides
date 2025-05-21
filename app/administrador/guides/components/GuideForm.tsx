"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
  Paper,
  IconButton,
  useTheme,
  FormControlLabel,
  Switch,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
} from "@mui/icons-material";
import { categories } from "@/data/categories";
import { GUIDES } from "@/data/guides";
import ModuleContentDialog from "./ModuleContentDialog";

interface Section {
  heading: string;
  text: string | string[];
  list: string[];
  expandable?: boolean;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Module {
  title: string;
  locked: boolean;
  content: {
    sections: Section[];
  };
  questions: Question[];
}

interface Guide {
  id?: string;
  title: string;
  description: string;
  image: File | string;
  modules: Module[];
  metadata: {
    categories: string[];
    keywords: string[];
    overview: {
      text: string;
      bullets: string[];
    };
  };
}

const steps = [
  "Basic Information",
  "Categories & Keywords",
  "Overview",
  "Module Sections",
  "Module Questions",
  "Review",
];

export default function GuideForm() {
  const theme = useTheme();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<Partial<Guide>>({
    title: "",
    description: "",
    image: "",
    modules: [],
    metadata: {
      categories: [],
      keywords: [],
      overview: {
        text: "",
        bullets: [],
      },
    },
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [newBullet, setNewBullet] = useState("");
  const [newModule, setNewModule] = useState<Partial<Module>>({
    title: "",
    locked: false,
    content: {
      sections: [],
    },
    questions: [],
  });
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [moduleDialogOpen, setModuleDialogOpen] = useState(false);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleBasicInfoChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      metadata: {
        ...prev.metadata!,
        [field]: value,
      },
    }));
  };

  const handleCategoryChange = (event: any) => {
    setSelectedCategories(event.target.value);
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      setFormData((prev) => ({
        ...prev,
        metadata: {
          ...prev.metadata!,
          keywords: [...(prev.metadata?.keywords || []), newKeyword.trim()],
        },
      }));
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setFormData((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata!,
        keywords: prev.metadata?.keywords.filter((k) => k !== keyword) || [],
      },
    }));
  };

  const handleAddBullet = () => {
    if (newBullet.trim()) {
      setFormData((prev) => ({
        ...prev,
        metadata: {
          ...prev.metadata!,
          overview: {
            ...prev.metadata?.overview!,
            bullets: [...(prev.metadata?.overview?.bullets || []), newBullet.trim()],
          },
        },
      }));
      setNewBullet("");
    }
  };

  const handleRemoveBullet = (bullet: string) => {
    setFormData((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata!,
        overview: {
          ...prev.metadata?.overview!,
          bullets: prev.metadata?.overview?.bullets.filter((b) => b !== bullet) || [],
        },
      },
    }));
  };

  const handleAddModule = () => {
    if (newModule.title) {
      setFormData((prev) => ({
        ...prev,
        modules: [
          ...(prev.modules || []),
          {
            title: newModule.title!,
            locked: newModule.locked || false,
            content: {
              sections: [{
                heading: "",
                text: "",
                list: [],
                expandable: false
              }],
            },
            questions: [],
          } as Module,
        ],
      }));
      setNewModule({
        title: "",
        locked: false,
        content: {
          sections: [],
        },
        questions: [],
      });
    }
  };

  const handleRemoveModule = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleEditModule = (module: Module) => {
    setSelectedModule(module);
  };

  const handleSaveModule = (editedModule: Module) => {
    setFormData((prev) => ({
      ...prev,
      modules:
        prev.modules?.map((m) =>
          m.title === editedModule.title ? editedModule : m
        ) || [],
    }));
    setSelectedModule(null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.image ||
      !formData.metadata?.categories.length ||
      !formData.metadata?.overview ||
      !formData.modules?.length
    ) {
      return;
    }

    const newGuide = {
      id: `guide-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      image: formData.image,
      modules: formData.modules || [],
      metadata: {
        categories: formData.metadata?.categories || [],
        keywords: formData.metadata?.keywords || [],
        overview: formData.metadata?.overview || "",
      },
    } as Guide;

    GUIDES.push(newGuide as any);
    router.push("/administrador/dashboard");
  };

  const renderBasicInfo = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        fullWidth
        label="Title"
        value={formData.title}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, title: e.target.value }))
        }
        required
      />
      <TextField
        fullWidth
        label="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, description: e.target.value }))
        }
        multiline
        rows={4}
        required
      />
      <Box>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="image-upload"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="image-upload">
          <Button variant="outlined" component="span" fullWidth sx={{ mb: 1 }}>
            Upload Image
          </Button>
        </label>
        {formData.image && (
          <Typography variant="body2" color="text.secondary">
            {typeof formData.image === "string"
              ? formData.image
              : formData.image.name}
          </Typography>
        )}
      </Box>
    </Box>
  );

  const renderCategoriesAndKeywords = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Categories</InputLabel>
        <Select
          multiple
          value={selectedCategories}
          onChange={handleCategoryChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {["Beginner", "Intermediate", "Advanced"].map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="subtitle1">Keywords</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            label="New Keyword"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleAddKeyword}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {formData.metadata?.keywords.map((keyword) => (
            <Chip
              key={keyword}
              label={keyword}
              onDelete={() => handleRemoveKeyword(keyword)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );

  const renderOverview = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <TextField
        fullWidth
        label="Overview Text"
        value={formData.metadata?.overview?.text}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            metadata: {
              ...prev.metadata!,
              overview: {
                ...prev.metadata?.overview!,
                text: e.target.value,
              },
            },
          }))
        }
        multiline
        rows={4}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="subtitle1">Bullet Points</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            label="Add Bullet Point"
            value={newBullet}
            onChange={(e) => setNewBullet(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleAddBullet}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {formData.metadata?.overview?.bullets.map((bullet, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography sx={{ flex: 1 }}>{bullet}</Typography>
              <IconButton
                size="small"
                onClick={() => handleRemoveBullet(bullet)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );

  const renderModules = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Modules
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            const newModule: Module = {
              title: `Module ${(formData.modules?.length || 0) + 1}`,
              locked: false,
              content: {
                sections: [],
              },
              questions: [],
            };
            setFormData((prev) => ({
              ...prev,
              modules: [...(prev.modules || []), newModule],
            }));
          }}
          startIcon={<AddIcon />}
        >
          Add Module
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {formData.modules?.map((module, moduleIndex) => (
          <Paper
            key={moduleIndex}
            elevation={1}
            sx={{
              p: 3,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  {module.title}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => {
                      const updatedModules = [...(formData.modules || [])];
                      updatedModules[moduleIndex].locked = !updatedModules[moduleIndex].locked;
                      setFormData((prev) => ({
                        ...prev,
                        modules: updatedModules,
                      }));
                    }}
                  >
                    {module.locked ? <LockIcon /> : <LockOpenIcon />}
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      const updatedModules = [...(formData.modules || [])];
                      updatedModules.splice(moduleIndex, 1);
                      setFormData((prev) => ({
                        ...prev,
                        modules: updatedModules,
                      }));
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Sections: {module.content?.sections?.length || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Questions: {module.questions?.length || 0}
                </Typography>
              </Box>

              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedModule(module);
                  setModuleDialogOpen(true);
                }}
                startIcon={<EditIcon />}
              >
                Edit Content
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );

  const renderModuleQuestions = () => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {formData.modules?.map((module, moduleIndex) => (
          <Box
            key={moduleIndex}
            sx={{
              p: 3,
              border: "1px solid #ddd",
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              {module.title} Questions
            </Typography>
            {module.questions?.map((question, questionIndex) => (
              <Box
                key={questionIndex}
                sx={{
                  p: 2,
                  border: "1px solid #eee",
                  borderRadius: 1,
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="subtitle1">
                    Question {questionIndex + 1}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => {
                      const updatedModules = [...(formData.modules || [])];
                      updatedModules[moduleIndex].questions.splice(
                        questionIndex,
                        1
                      );
                      setFormData((prev) => ({
                        ...prev,
                        modules: updatedModules,
                      }));
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <TextField
                  fullWidth
                  label="Question"
                  value={question.question}
                  onChange={(e) => {
                    const updatedModules = [...(formData.modules || [])];
                    updatedModules[moduleIndex].questions[
                      questionIndex
                    ].question = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      modules: updatedModules,
                    }));
                  }}
                  sx={{ mb: 2 }}
                />
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Options
                </Typography>
                {question.options?.map((option, optionIndex) => (
                  <Box
                    key={optionIndex}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <TextField
                      fullWidth
                      label={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) => {
                        const updatedModules = [...(formData.modules || [])];
                        updatedModules[moduleIndex].questions[
                          questionIndex
                        ].options[optionIndex] = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          modules: updatedModules,
                        }));
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={question.correctAnswer === optionIndex}
                          onChange={() => {
                            const updatedModules = [
                              ...(formData.modules || []),
                            ];
                            updatedModules[moduleIndex].questions[
                              questionIndex
                            ].correctAnswer = optionIndex;
                            setFormData((prev) => ({
                              ...prev,
                              modules: updatedModules,
                            }));
                          }}
                        />
                      }
                      label="Correct"
                    />
                    <IconButton
                      size="small"
                      onClick={() => {
                        const updatedModules = [...(formData.modules || [])];
                        updatedModules[moduleIndex].questions[
                          questionIndex
                        ].options.splice(optionIndex, 1);
                        if (
                          updatedModules[moduleIndex].questions[questionIndex]
                            .correctAnswer === optionIndex
                        ) {
                          updatedModules[moduleIndex].questions[
                            questionIndex
                          ].correctAnswer = 0;
                        }
                        setFormData((prev) => ({
                          ...prev,
                          modules: updatedModules,
                        }));
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  onClick={() => {
                    const updatedModules = [...(formData.modules || [])];
                    updatedModules[moduleIndex].questions[
                      questionIndex
                    ].options.push("");
                    setFormData((prev) => ({
                      ...prev,
                      modules: updatedModules,
                    }));
                  }}
                  startIcon={<AddIcon />}
                  sx={{ mt: 1 }}
                >
                  Add Option
                </Button>
              </Box>
            ))}
            <Button
              variant="contained"
              onClick={() => {
                const updatedModules = [...(formData.modules || [])];
                updatedModules[moduleIndex].questions.push({
                  question: "",
                  options: [""],
                  correctAnswer: 0,
                });
                setFormData((prev) => ({
                  ...prev,
                  modules: updatedModules,
                }));
              }}
              startIcon={<AddIcon />}
            >
              Add Question
            </Button>
          </Box>
        ))}
      </Box>
    );
  };

  const renderReview = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h6">Basic Information</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography>
          <strong>Title:</strong> {formData.title}
        </Typography>
        <Typography>
          <strong>Description:</strong> {formData.description}
        </Typography>
        <Typography>
          <strong>Image:</strong> {formData.image ? (typeof formData.image === 'string' ? formData.image : formData.image.name) : 'No image selected'}
        </Typography>
      </Box>

      <Typography variant="h6">Categories & Keywords</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography>
          <strong>Categories:</strong>{" "}
          {formData.metadata?.categories?.join(", ") || "None"}
        </Typography>
        <Typography>
          <strong>Keywords:</strong>{" "}
          {formData.metadata?.keywords?.join(", ") || "None"}
        </Typography>
      </Box>

      <Typography variant="h6">Overview</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography>
          <strong>Text:</strong> {formData.metadata?.overview?.text || "None"}
        </Typography>
        {formData.metadata?.overview?.bullets?.length ? (
          <>
            <Typography>
              <strong>Bullet Points:</strong>
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              {formData.metadata.overview.bullets.map((bullet, index) => (
                <Typography key={index} component="li">
                  {bullet}
                </Typography>
              ))}
            </Box>
          </>
        ) : null}
      </Box>

      <Typography variant="h6">Modules</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {formData.modules?.map((module, moduleIndex) => (
          <Box
            key={moduleIndex}
            sx={{
              p: 2,
              border: "1px solid #ddd",
              borderRadius: 1,
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {module.title} {module.locked ? "(Locked)" : ""}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Sections: {module.content?.sections?.length || 0}
            </Typography>
            <Typography variant="body2">
              Questions: {module.questions?.length || 0}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return renderBasicInfo();
      case 1:
        return renderCategoriesAndKeywords();
      case 2:
        return renderOverview();
      case 3:
        return renderModules();
      case 4:
        return renderModuleQuestions();
      case 5:
        return renderReview();
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Create New Guide
      </Typography>

      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mb: 4 }}>
          {renderStepContent(activeStep)}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
          >
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </Box>
      </Paper>

      <ModuleContentDialog
        open={moduleDialogOpen}
        onClose={() => {
          setModuleDialogOpen(false);
          setSelectedModule(null);
        }}
        module={selectedModule!}
        onSave={(updatedModule) => {
          if (selectedModule) {
            const moduleIndex = formData.modules?.findIndex(
              (m) => m === selectedModule
            );
            if (moduleIndex !== undefined && moduleIndex !== -1) {
              const updatedModules = [...(formData.modules || [])];
              updatedModules[moduleIndex] = updatedModule;
              setFormData((prev) => ({
                ...prev,
                modules: updatedModules,
              }));
            }
          }
          setModuleDialogOpen(false);
          setSelectedModule(null);
        }}
      />
    </Box>
  );
}
