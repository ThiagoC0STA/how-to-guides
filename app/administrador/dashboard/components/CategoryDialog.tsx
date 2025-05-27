import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  FormControlLabel,
  Switch,
  IconButton,
  Paper,
  Autocomplete,
} from "@mui/material";
import { ChromePicker } from "react-color";
import { Category } from "@/data/categories";
import {
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";
import ActionButton from "./ActionButton";
import { supabase } from "@/lib/supabaseClient";
import { useLoading } from "@/components/LoadingProvider";
import { useSuccessStore } from "@/store/successStore";
import Image from "next/image";

interface CategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (category: Partial<Category>) => void;
  category?: any;
  withGuides?: boolean;
  onAddAnotherCategory?: () => void;
}

export default function CategoryDialog({
  open,
  onClose,
  onSave,
  category,
  withGuides,
  onAddAnotherCategory,
}: CategoryDialogProps) {
  const { show: showLoading, hide: hideLoading } = useLoading();

  const { showSuccess } = useSuccessStore();
  const [formData, setFormData] = useState<Partial<Category>>(() => {
    if (category) {
      return {
        id: category.id,
        title: category.title,
        description: category.description,
        icon_url: category.icon_url,
        color: category.color,
        featured: category.featured || false,
        comingSoon: category.comingSoon || false,
        guides: category.guides || [],
      };
    }
    return {
      title: "",
      description: "",
      icon_url: "",
      color: "#74aa9c",
      featured: false,
      comingSoon: false,
      guides: [],
    };
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [recentIcons, setRecentIcons] = useState<
    { name: string; url: string }[]
  >([]);
  const [allGuides, setAllGuides] = useState<any[]>([]);
  const [selectedGuides, setSelectedGuides] = useState<any[]>([]);

  useEffect(() => {
    if (category) {
      setFormData({
        id: category.id,
        title: category.title,
        description: category.description,
        icon_url: category.icon_url,
        color: category.color,
        featured: category.featured || false,
        comingSoon: category.comingSoon || false,
        guides: category.guides || [],
      });
    } else {
      setFormData({
        title: "",
        description: "",
        icon_url: "",
        color: "#74aa9c",
        featured: false,
        comingSoon: false,
        guides: [],
      });
    }
  }, [category]);

  useEffect(() => {
    if (open) {
      fetchAllIcons();
    }
  }, [open]);

  useEffect(() => {
    if (withGuides && formData.guides && allGuides.length > 0) {
      console.log("formData.guides:", formData.guides);
      console.log("allGuides:", allGuides);
      const selected = formData.guides
        .map((id: string) => allGuides.find((g) => g.id === id))
        .filter(Boolean);
      console.log("selected:", selected);
      setSelectedGuides(selected);
    } else if (!category) {
      setSelectedGuides([]);
    }
  }, [formData.guides, allGuides, withGuides, category]);

  useEffect(() => {
    if (withGuides && open) {
      const fetchGuides = async () => {
        const query = supabase.from("guides").select("id, title, color");
        const { data, error } = await query;
        if (!error) {
          console.log("Fetched guides:", data);
          setAllGuides(data || []);
        }
      };
      fetchGuides();
    }
  }, [withGuides, open]);

  const fetchAllIcons = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("icons")
        .list("category-icons", {
          limit: 1000,
          sortBy: { column: "created_at", order: "desc" },
        });

      if (error) throw error;

      const icons = await Promise.all(
        data
          .filter((file) => file.name !== ".emptyFolderPlaceholder")
          .map(async (file) => {
            const { data: publicUrlData } = supabase.storage
              .from("icons")
              .getPublicUrl(`category-icons/${file.name}`);
            return {
              name: file.name,
              url: publicUrlData.publicUrl,
            };
          })
      );

      setRecentIcons(icons);
    } catch (error) {
      console.error("Error fetching icons:", error);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddAnother = () => {
    console.log("[CategoryDialog] Add Another Category button clicked");
    if (onAddAnotherCategory) {
      console.log("[CategoryDialog] Calling onAddAnotherCategory");
      onAddAnotherCategory();
    }
    setFormData({
      title: "",
      description: "",
      icon_url: "",
      color: "#74aa9c",
      featured: false,
      comingSoon: false,
      guides: [],
    });
    setIconFile(null);
  };

  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.description ||
      !(formData.icon_url || iconFile)
    ) {
      return;
    }

    showLoading();
    try {
      let iconUrl = formData.icon_url;

      if (iconFile) {
        const fileExt = iconFile.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `category-icons/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("icons")
          .upload(filePath, iconFile);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("icons").getPublicUrl(filePath);

        iconUrl = publicUrl;
      }

      const categoryData = {
        ...formData,
        icon_url: iconUrl,
        guides: selectedGuides.map((g) => g.id),
      };

      console.log("CategoryDialog - Saving category data:", categoryData);
      await onSave(categoryData);

      showSuccess(
        `Category ${category ? "updated" : "created"} successfully!`,
        {
          text: "OK",
          onClick: () => onClose(),
        },
        {
          text: "Add Another Category",
          onClick: handleAddAnother,
        }
      );
    } catch (error: any) {
      console.error("Error saving category:", error);
    } finally {
      hideLoading();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        },
      }}
    >
      <DialogTitle
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {category ? "Edit Category" : "Add New Category"}
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: "text.secondary",
            "&:hover": {
              color: "text.primary",
              bgcolor: "action.hover",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mt: 2 }}>
          <TextField
            label="Title"
            fullWidth
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                fontSize: "1.1rem",
              },
              "& .MuiInputLabel-root": {
                fontSize: "1.1rem",
              },
            }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                fontSize: "1.1rem",
              },
              "& .MuiInputLabel-root": {
                fontSize: "1.1rem",
              },
            }}
          />
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1, color: "text.secondary" }}
            >
              Icon
            </Typography>

            {/* Recent Icons */}
            {recentIcons.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", mb: 1, display: "block" }}
                >
                  Recent Icons
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    overflowX: "auto",
                    maxWidth: "100%",
                  }}
                >
                  {recentIcons.map((icon) => (
                    <Box key={icon.name}>
                      <Paper
                        elevation={0}
                        onClick={() => handleChange("icon_url", icon.url)}
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          border: "2px solid",
                          borderColor:
                            formData.icon_url === icon.url
                              ? "primary.main"
                              : "divider",
                          overflow: "hidden",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          },
                        }}
                      >
                        <Image
                          src={icon.url}
                          alt={icon.name}
                          width={48}
                          height={48}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Paper>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Current Icon Preview */}
            {formData.icon_url && (
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", mb: 1, display: "block" }}
                >
                  Current Icon
                </Typography>
                <Paper
                  elevation={0}
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    border: "2px solid",
                    borderColor: "divider",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={formData.icon_url}
                    alt="Current icon"
                    width={64}
                    height={64}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Paper>
              </Box>
            )}

            {/* Upload Button */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                border: "2px dashed",
                borderColor: "divider",
                borderRadius: 2,
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: "primary.main",
                  bgcolor: "action.hover",
                },
              }}
              onClick={() => document.getElementById("icon-upload")?.click()}
            >
              <input
                id="icon-upload"
                type="file"
                accept="image/*, .svg"
                onChange={(e) => setIconFile(e.target.files?.[0] || null)}
                style={{ display: "none" }}
              />
              <CloudUploadIcon
                sx={{ fontSize: 40, color: "text.secondary", mb: 1 }}
              />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {iconFile ? iconFile.name : "Click to upload icon"}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "block", mt: 0.5 }}
              >
                Supports: PNG, JPG, SVG
              </Typography>
            </Paper>
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1, color: "text.secondary" }}
            >
              Color
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Paper
                elevation={0}
                onClick={() => setShowColorPicker(!showColorPicker)}
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  border: "2px solid",
                  borderColor: "divider",
                  bgcolor: formData.color,
                  transition: "all 0.2s",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  },
                }}
              />
              <TextField
                value={formData.color}
                onChange={(e) => handleChange("color", e.target.value)}
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                variant="outlined"
              />
            </Box>
            {showColorPicker && (
              <Box
                sx={{ position: "absolute", zIndex: 2, bottom: 60, left: 0 }}
              >
                <Box
                  sx={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                  }}
                  onClick={() => setShowColorPicker(false)}
                />
                <Paper
                  elevation={8}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                  }}
                >
                  <ChromePicker
                    color={formData.color}
                    onChange={(color) => handleChange("color", color.hex)}
                  />
                </Paper>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              p: 2,
              borderRadius: 2,
              bgcolor: "action.hover",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={formData.featured}
                  onChange={(e) => handleChange("featured", e.target.checked)}
                  color="primary"
                />
              }
              label="Featured"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.comingSoon}
                  onChange={(e) => handleChange("comingSoon", e.target.checked)}
                  color="primary"
                />
              }
              label="Coming Soon"
            />
          </Box>
          {withGuides && (
            <Autocomplete
              multiple
              options={allGuides}
              getOptionLabel={(option) => option.title}
              value={selectedGuides}
              onChange={(_, newValue) => {
                console.log("New selected guides:", newValue);
                setSelectedGuides(newValue);
                handleChange(
                  "guides",
                  newValue.map((g) => g.id)
                );
              }}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Guides"
                  placeholder="Search guides..."
                />
              )}
              sx={{ mb: 2 }}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          p: 3,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
            px: 3,
            py: 1,
            borderRadius: 2,
          }}
        >
          Cancel
        </Button>
        <ActionButton
          color="purple"
          onClick={handleSubmit}
          disabled={
            !formData.title ||
            !formData.description ||
            !(formData.icon_url || iconFile)
          }
        >
          Save
        </ActionButton>
      </DialogActions>
    </Dialog>
  );
}
