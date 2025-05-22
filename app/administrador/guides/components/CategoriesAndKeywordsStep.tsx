import { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Chip, CircularProgress } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { Guide } from "../types";
import { publicRequest } from "@/utils/apiClient";

interface Category {
  id: string;
  title: string;
}

interface CategoriesAndKeywordsStepProps {
  formData: Partial<Guide>;
  selectedCategories: string[];
  newKeyword: string;
  onFormDataChange: (field: string, value: any) => void;
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
  onFormDataChange,
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <FormControl fullWidth>
        <InputLabel>Categories</InputLabel>
        <Select
          multiple
          value={selectedCategories}
          onChange={onCategoryChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => {
                const cat = categories.find((c) => c.id === value);
                return (
                  <Chip
                    key={value}
                    label={cat ? cat.title : value}
                    sx={{
                      borderRadius: 1,
                      bgcolor: "primary.50",
                      color: "primary.main",
                    }}
                  />
                );
              })}
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
          {loading ? (
            <MenuItem disabled>
              <CircularProgress size={20} /> Carregando...
            </MenuItem>
          ) : (
            categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.title}
              </MenuItem>
            ))
          )}
        </Select>
        <Button
          variant="text"
          startIcon={<AddIcon />}
          onClick={onAddCategoryClick}
          sx={{ mt: 1, alignSelf: "flex-end", textTransform: "none" }}
        >
          Nova Categoria
        </Button>
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
            onChange={(e) => onNewKeywordChange(e.target.value)}
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
            onClick={onAddKeyword}
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
              onDelete={() => onRemoveKeyword(keyword)}
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
} 