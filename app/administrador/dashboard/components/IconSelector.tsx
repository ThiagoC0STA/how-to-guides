import { useState, useRef } from "react";
import {
  Box,
  Typography,
  Popover,
  Button,
} from "@mui/material";
import { Upload as UploadIcon } from "@mui/icons-material";

interface IconSelectorProps {
  value: string;
  onChange: (iconName: string) => void;
}

export default function IconSelector({ value, onChange }: IconSelectorProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const svgContent = e.target?.result as string;
        onChange(svgContent);
        handleClose();
      };
      reader.readAsText(file);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        {value ? (
          <Box
            sx={{
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            No icon selected
          </Typography>
        )}
        <Button
          variant="outlined"
          onClick={handleClick}
          startIcon={<UploadIcon />}
          sx={{
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          Import SVG
        </Button>
      </Box>
      <input
        type="file"
        accept=".svg"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            width: 300,
            p: 2,
            borderRadius: 2,
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Import SVG Icon
          </Typography>
          <Button
            variant="outlined"
            onClick={() => fileInputRef.current?.click()}
            startIcon={<UploadIcon />}
            sx={{
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Choose SVG File
          </Button>
          {value && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
                Preview:
              </Typography>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  p: 1,
                }}
                dangerouslySetInnerHTML={{ __html: value }}
              />
            </Box>
          )}
        </Box>
      </Popover>
    </Box>
  );
} 