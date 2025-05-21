"use client";

import { useState } from "react";
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
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { categories } from "@/data/categories";
import { GUIDES } from "@/data/guides";

interface Module {
  title: string;
  locked: boolean;
  content: {
    sections: {
      heading: string;
      text: string | string[];
      list?: string[];
      expandable?: boolean;
    }[];
  };
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

interface Guide {
  id: string;
  title: string;
  description: string;
  image: File | string;
  color: string;
  featured: boolean;
  lastUpdated: string;
  updateNotes: string;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    openGraph: {
      title: string;
      description: string;
      url: string;
      type: string;
      images: {
        url: string;
        width: number;
        height: number;
        alt: string;
      }[];
    };
    twitter: {
      card: string;
      title: string;
      description: string;
      images: string[];
    };
  };
  overview: {
    title: string;
    description: string;
    bullets: string[];
  };
  modules: Module[];
}

interface AddGuideFormProps {
  onClose?: () => void;
}

export default function AddGuideForm({ onClose }: AddGuideFormProps) {
  const theme = useTheme();
  const [guide, setGuide] = useState<Partial<Guide>>({
    featured: false,
    lastUpdated: new Date().toISOString().split("T")[0],
    updateNotes: "Initial version published",
    metadata: {
      title: "",
      description: "",
      keywords: [],
      openGraph: {
        title: "",
        description: "",
        url: "",
        type: "article",
        images: [
          {
            url: "",
            width: 1200,
            height: 630,
            alt: "",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "",
        description: "",
        images: [],
      },
    },
    overview: {
      title: "Guide Overview",
      description: "",
      bullets: [],
    },
    modules: [],
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

  const handleBasicInfoChange = (field: string, value: string) => {
    setGuide((prev) => ({
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
    if (newKeyword && guide.metadata?.keywords) {
      setGuide((prev) => ({
        ...prev,
        metadata: {
          ...prev.metadata!,
          keywords: [...prev.metadata!.keywords, newKeyword],
        },
      }));
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setGuide((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata!,
        keywords: prev.metadata!.keywords.filter((k) => k !== keyword),
      },
    }));
  };

  const handleAddBullet = () => {
    if (newBullet && guide.overview?.bullets) {
      setGuide((prev) => ({
        ...prev,
        overview: {
          ...prev.overview!,
          bullets: [...prev.overview!.bullets, newBullet],
        },
      }));
      setNewBullet("");
    }
  };

  const handleRemoveBullet = (bullet: string) => {
    setGuide((prev) => ({
      ...prev,
      overview: {
        ...prev.overview!,
        bullets: prev.overview!.bullets.filter((b) => b !== bullet),
      },
    }));
  };

  const handleAddModule = () => {
    if (newModule.title) {
      setGuide((prev) => ({
        ...prev,
        modules: [...(prev.modules || []), newModule as Module],
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setGuide((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !guide.id ||
      !guide.title ||
      !guide.description ||
      !guide.image ||
      !guide.color
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Create new guide
    const newGuide: any = {
      ...guide,
      id: guide.id!,
      title: guide.title!,
      description: guide.description!,
      image: guide.image!,
      color: guide.color!,
      featured: guide.featured || false,
      lastUpdated: guide.lastUpdated || new Date().toISOString().split("T")[0],
      updateNotes: guide.updateNotes || "Initial version published",
      metadata: {
        ...guide.metadata!,
        title: guide.title!,
        description: guide.description!,
      },
      overview: {
        title: guide.overview?.title || "Guide Overview",
        description: guide.overview?.description || "",
        bullets: guide.overview?.bullets || [],
      },
      modules:
        guide.modules?.map((module) => ({
          ...module,
          content: {
            sections: module.content.sections.map((section) => {
              const text = Array.isArray(section.text)
                ? section.text
                : [section.text];
              if (section.expandable) {
                return {
                  heading: section.heading,
                  text,
                  expandable: true,
                };
              } else if (section.list) {
                return {
                  heading: section.heading,
                  text,
                  list: section.list,
                };
              } else {
                return {
                  heading: section.heading,
                  text,
                };
              }
            }),
          },
        })) || [],
    };

    // Add to GUIDES array
    GUIDES.push(newGuide);

    // Close dialog
    if (onClose) {
      onClose();
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Add New Guide
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Basic Information */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
              Basic Information
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                label="ID"
                value={guide.id || ""}
                onChange={(e) => handleBasicInfoChange("id", e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Title"
                value={guide.title || ""}
                onChange={(e) => handleBasicInfoChange("title", e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Description"
                value={guide.description || ""}
                onChange={(e) =>
                  handleBasicInfoChange("description", e.target.value)
                }
                multiline
                rows={2}
                required
                sx={{ gridColumn: { xs: "1", md: "1 / -1" } }}
              />
              <Box sx={{ gridColumn: { xs: "1", md: "1 / -1" } }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image-upload"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    Upload Image
                  </Button>
                </label>
                {guide.image && (
                  <Typography variant="body2" color="text.secondary">
                    {typeof guide.image === 'string' ? guide.image : guide.image.name}
                  </Typography>
                )}
              </Box>
              <TextField
                fullWidth
                label="Color"
                value={guide.color || ""}
                onChange={(e) => handleBasicInfoChange("color", e.target.value)}
                required
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={guide.featured}
                    onChange={(e) =>
                      setGuide((prev) => ({
                        ...prev,
                        featured: e.target.checked,
                      }))
                    }
                  />
                }
                label="Featured"
              />
            </Box>
          </Box>

          {/* Categories */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
              Categories
            </Typography>
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
                        label={
                          categories.find((cat) => cat.id === value)?.title
                        }
                      />
                    ))}
                  </Box>
                )}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Keywords */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
              Keywords
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                label="Add Keyword"
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
              {guide.metadata?.keywords.map((keyword, index) => (
                <Chip
                  key={index}
                  label={keyword}
                  onDelete={() => handleRemoveKeyword(keyword)}
                />
              ))}
            </Box>
          </Box>

          {/* Overview */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
              Overview
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Overview Description"
                value={guide.overview?.description || ""}
                onChange={(e) =>
                  setGuide((prev) => ({
                    ...prev,
                    overview: {
                      ...prev.overview!,
                      description: e.target.value,
                    },
                  }))
                }
                multiline
                rows={3}
              />
              <Box>
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
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
                  {guide.overview?.bullets.map((bullet, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        p: 1,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
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
          </Box>

          {/* Modules */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
              Modules
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Module Title"
                  value={newModule.title}
                  onChange={(e) =>
                    setNewModule((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={newModule.locked}
                      onChange={(e) =>
                        setNewModule((prev) => ({
                          ...prev,
                          locked: e.target.checked,
                        }))
                      }
                    />
                  }
                  label="Locked"
                />
                <Button
                  variant="contained"
                  onClick={handleAddModule}
                  startIcon={<AddIcon />}
                >
                  Add Module
                </Button>
              </Box>
              {guide.modules?.map((module, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    {module.title} {module.locked && "(Locked)"}
                  </Typography>
                  {/* TODO: Add module content and questions management */}
                </Paper>
              ))}
            </Box>
          </Box>

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Create Guide
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
}
