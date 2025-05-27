import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Guide } from "../types";

interface OverviewStepProps {
  formData: Partial<Guide>;
  newBullet: string;
  onFormDataChange: (field: string, value: any) => void;
  onNewBulletChange: (value: string) => void;
  onAddBullet: () => void;
  onRemoveBullet: (bullet: string) => void;
}

export default function OverviewStep({
  formData,
  newBullet,
  onFormDataChange,
  onNewBulletChange,
  onAddBullet,
  onRemoveBullet,
}: OverviewStepProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <TextField
        fullWidth
        label="Overview Text"
        value={formData.metadata?.overview?.text}
        onChange={(e) =>
          onFormDataChange("metadata", {
            ...formData.metadata,
            overview: {
              ...formData.metadata?.overview,
              text: e.target.value,
            },
          })
        }
        multiline
        rows={4}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          },
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          Bullet Points
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            label="Add Bullet Point"
            value={newBullet}
            onChange={(e) => onNewBulletChange(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={onAddBullet}
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: "none",
              fontWeight: 500,
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
              },
            }}
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
                p: 1,
                borderRadius: 1,
                bgcolor: "grey.50",
                "&:hover": {
                  bgcolor: "grey.100",
                },
              }}
            >
              <Typography sx={{ flex: 1 }}>{bullet}</Typography>
              <IconButton
                size="small"
                onClick={() => onRemoveBullet(bullet)}
                sx={{
                  color: "error.main",
                  "&:hover": {
                    bgcolor: "error.50",
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
