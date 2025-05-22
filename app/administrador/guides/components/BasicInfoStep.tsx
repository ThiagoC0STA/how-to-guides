import { useState } from "react";
import { Box, TextField, Typography, Button, Popover, Switch, FormControlLabel } from "@mui/material";
import { ChromePicker } from "react-color";
import { Guide } from "../types";

interface BasicInfoStepProps {
  formData: Partial<Guide>;
  onFormDataChange: (field: string, value: any) => void;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BasicInfoStep({
  formData,
  onFormDataChange,
  onImageChange,
}: BasicInfoStepProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleColorClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleColorClose = () => {
    setAnchorEl(null);
  };

  const handleColorChange = (color: any) => {
    onFormDataChange("color", color.hex);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <TextField
        fullWidth
        label="Title"
        value={formData.title}
        onChange={(e) => onFormDataChange("title", e.target.value)}
        required
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          },
        }}
      />
      <TextField
        fullWidth
        label="Description"
        value={formData.description}
        onChange={(e) => onFormDataChange("description", e.target.value)}
        multiline
        rows={4}
        required
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          },
        }}
      />
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: "text.secondary",
              fontWeight: 500,
            }}
          >
            Module Color
          </Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Box
              onClick={handleColorClick}
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1,
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
              onChange={(e) => onFormDataChange("color", e.target.value)}
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleColorClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box sx={{ p: 2 }}>
                <ChromePicker
                  color={formData.color}
                  onChange={handleColorChange}
                />
              </Box>
            </Popover>
          </Box>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{
              mb: 1,
              color: "text.secondary",
              fontWeight: 500,
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
              onChange={onImageChange}
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
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": {
                    borderColor: "primary.main",
                    bgcolor: "primary.50",
                  },
                }}
              >
                Upload Image
              </Button>
            </label>
            {formData.image && (
              <Box
                sx={{
                  mt: 2,
                  position: "relative",
                  width: "100%",
                  height: 200,
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                {typeof formData.image === "string" ? (
                  <Box
                    component="img"
                    src={formData.image}
                    alt="Preview"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Box
                    component="img"
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <FormControlLabel
        control={
          <Switch
            checked={!!formData.is_popular}
            onChange={e => onFormDataChange("is_popular", e.target.checked)}
            color="primary"
          />
        }
        label="Popular?"
        sx={{ mt: 2 }}
      />
    </Box>
  );
}
