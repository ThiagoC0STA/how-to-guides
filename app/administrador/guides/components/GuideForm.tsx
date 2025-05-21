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
  Container,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  List as ListIcon,
  Quiz as QuizIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import { categories } from "@/data/categories";
import { GUIDES } from "@/data/guides";
import ModuleContentDialog from "./ModuleContentDialog";
import { SketchPicker } from 'react-color';

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
  color: string;
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
  "Guide Overview",
  "Modules",
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
    color: "#3f51b5",
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
  const [showColorPicker, setShowColorPicker] = useState(false);

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
      color: formData.color,
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <TextField
        fullWidth
        label="Title"
        value={formData.title}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, title: e.target.value }))
        }
        required
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
          },
        }}
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
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
          },
        }}
      />
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              color: 'text.secondary',
              fontWeight: 500
            }}
          >
            Module Color
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box
              onClick={() => setShowColorPicker(!showColorPicker)}
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1,
                border: '2px solid',
                borderColor: 'divider',
                bgcolor: formData.color,
                transition: 'all 0.2s',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }
              }}
            />
            <TextField
              value={formData.color}
              onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
              sx={{
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            {showColorPicker && (
              <Box sx={{ 
                position: 'absolute',
                zIndex: 2,
                mt: 1
              }}>
                <Box
                  sx={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                  }}
                  onClick={() => setShowColorPicker(false)}
                />
                <SketchPicker
                  color={formData.color}
                  onChange={(color) => setFormData(prev => ({ ...prev, color: color.hex }))}
                />
              </Box>
            )}
          </Box>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 1,
              color: 'text.secondary',
              fontWeight: 500
            }}
          >
            Cover Image
          </Typography>
          <Box>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="image-upload"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload">
              <Button 
                variant="outlined" 
                component="span" 
                fullWidth 
                sx={{ 
                  mb: 1,
                  borderRadius: 2,
                  py: 1.8,
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'primary.50'
                  }
                }}
              >
                Upload Image
              </Button>
            </label>
            {formData.image && (
              <Box sx={{ 
                mt: 2,
                position: 'relative',
                width: '100%',
                height: 200,
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider'
              }}>
                {typeof formData.image === "string" ? (
                  <Box
                    component="img"
                    src={formData.image}
                    alt="Preview"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <Box
                    component="img"
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );

  const renderCategoriesAndKeywords = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <FormControl fullWidth>
        <InputLabel>Categories</InputLabel>
        <Select
          multiple
          value={selectedCategories}
          onChange={handleCategoryChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip 
                  key={value} 
                  label={value}
                  sx={{
                    borderRadius: 1,
                    bgcolor: 'primary.50',
                    color: 'primary.main',
                    '& .MuiChip-deleteIcon': {
                      color: 'primary.main',
                      '&:hover': {
                        color: 'primary.dark'
                      }
                    }
                  }}
                />
              ))}
            </Box>
          )}
          sx={{
            borderRadius: 2,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'divider'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main'
            }
          }}
        >
          {["Beginner", "Intermediate", "Advanced"].map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontWeight: 600,
            color: 'text.primary'
          }}
        >
          Keywords
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            label="New Keyword"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleAddKeyword}
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: 'none',
              fontWeight: 500,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none'
              }
            }}
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
              sx={{
                borderRadius: 1,
                bgcolor: 'grey.100',
                '&:hover': {
                  bgcolor: 'grey.200'
                },
                '& .MuiChip-deleteIcon': {
                  color: 'grey.500',
                  '&:hover': {
                    color: 'error.main'
                  }
                }
              }}
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            color: 'text.primary'
          }}
        >
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
          sx={{
            borderRadius: 2,
            px: 3,
            textTransform: 'none',
            fontWeight: 500,
            boxShadow: 'none',
            bgcolor: "var(--primary-blue)",
            '&:hover': {
              boxShadow: 'none',
              opacity: 0.9
            }
          }}
        >
          Add Module
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {formData.modules?.map((module, moduleIndex) => (
          <Paper
            key={moduleIndex}
            elevation={0}
            sx={{
              p: 3,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                borderColor: formData.color,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 500,
                    color: 'text.primary'
                  }}
                >
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
                    sx={{
                      color: module.locked ? formData.color : 'grey.500',
                      '&:hover': {
                        bgcolor: `${formData.color}15`
                      }
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
                    sx={{
                      color: 'error.main',
                      '&:hover': {
                        bgcolor: 'error.50'
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <ListIcon fontSize="small" />
                  Sections: {module.content?.sections?.length || 0}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <QuizIcon fontSize="small" />
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
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  borderColor: formData.color,
                  color: formData.color,
                  '&:hover': {
                    borderColor: formData.color,
                    bgcolor: `${formData.color}15`
                  }
                }}
              >
                Edit Content
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );

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
        return renderReview();
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            color: 'text.primary',
            letterSpacing: '-0.5px'
          }}
        >
          Create New Guide
        </Typography>

        <Paper 
          elevation={0} 
          sx={{ 
            p: 4,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper'
          }}
        >
          <Stepper 
            activeStep={activeStep} 
            sx={{ 
              mb: 6,
              '& .MuiStepLabel-label': {
                fontWeight: 500,
                fontSize: '0.875rem'
              },
              '& .MuiStepIcon-root': {
                color: 'primary.main',
                '&.Mui-active': {
                  color: 'primary.main'
                },
                '&.Mui-completed': {
                  color: 'success.main'
                }
              }
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ 
            mb: 6,
            minHeight: '400px'
          }}>
            {renderStepContent(activeStep)}
          </Box>

          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between",
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 4,
                textTransform: 'none',
                fontWeight: 500
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
              sx={{
                borderRadius: 2,
                px: 4,
                textTransform: 'none',
                fontWeight: 500,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none'
                }
              }}
            >
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </Paper>
      </Box>

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
    </Container>
  );
}
