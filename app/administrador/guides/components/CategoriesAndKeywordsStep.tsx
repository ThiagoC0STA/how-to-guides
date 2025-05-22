import { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Chip, CircularProgress } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { Guide } from "../types";
import { publicRequest } from "@/utils/apiClient";

interface Category {
  id: string;
  title: string;
  color?: string;
}

interface CategoriesAndKeywordsStepProps {
  formData: Partial<Guide>;
  selectedCategories: string[];
  newKeyword: string;
  onCategoryChange: (event: any) => void;
  onNewKeywordChange: (value: string) => void;
  onAddKeyword: () => void;
  onRemoveKeyword: (keyword: string) => void;
  onAddCategoryClick?: () => void;
  refreshKey?: number;
}

export default function CategoriesAndKeywordsStep({
  formData,
  selectedCategories,
  newKeyword,
  onCategoryChange,
  onNewKeywordChange,
  onAddKeyword,
  onRemoveKeyword,
  onAddCategoryClick,
  refreshKey,
}: CategoriesAndKeywordsStepProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    publicRequest.get("/categories").then((res) => {
      setCategories(res.data.categories || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [refreshKey]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, p: 2 }}>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel sx={{ borderRadius: 2 }}>Categories</InputLabel>
        <Select
          multiple
          value={selectedCategories}
          onChange={onCategoryChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {selected.map((value) => {
                const cat = categories.find((c) => c.id === value);
                return (
                  <Chip
                    key={value}
                    label={cat ? cat.title : value}
                    sx={{
                      borderRadius: 2,
                      bgcolor: cat?.color || "primary.50",
                      color: cat?.color ? "#fff" : "primary.main",
                      fontWeight: 600,
                      fontSize: "0.95em",
                      px: 1.5,
                      py: 0.5,
                      boxShadow: cat?.color ? "0 2px 8px 0 #0001" : undefined,
                    }}
                  />
                );
              })}
            </Box>
          )}
          sx={{
            borderRadius: 3,
            bgcolor: "background.paper",
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'divider',
              borderRadius: 3,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
            minHeight: 56,
          }}
        >
          {loading ? (
            <MenuItem disabled>
              <CircularProgress size={20} /> Loading...
            </MenuItem>
          ) : (
            categories.map((category) => (
              <MenuItem key={category.id} value={category.id} sx={{ borderRadius: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip
                    label={category.title}
                    size="small"
                    sx={{
                      bgcolor: category.color || "primary.50",
                      color: category.color ? "#fff" : "primary.main",
                      borderRadius: 2,
                      fontWeight: 500,
                    }}
                  />
                </Box>
              </MenuItem>
            ))
          )}
        </Select>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={onAddCategoryClick}
          sx={{ mt: 2, alignSelf: "flex-end", textTransform: "none", borderRadius: 2, fontWeight: 600 }}
        >
          New category
        </Button>
      </FormControl>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontWeight: 700,
            color: 'text.primary',
            mb: 1
          }}
        >
          Keywords
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="New keyword"
            value={newKeyword}
            onChange={(e) => onNewKeywordChange(e.target.value)}
            sx={{
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: 'background.paper',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={onAddKeyword}
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: 'none',
              bgcolor: 'primary.main',
              '&:hover': {
                boxShadow: 'none',
                bgcolor: 'primary.dark',
              }
            }}
          >
            Add
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
          {formData.metadata?.keywords.map((keyword) => (
            <Chip
              key={keyword}
              label={keyword}
              onDelete={() => onRemoveKeyword(keyword)}
              sx={{
                borderRadius: 2,
                bgcolor: 'grey.100',
                color: 'primary.main',
                fontWeight: 500,
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
} 