"use client";

import { useState } from "react";
import {
  Box,
  Stack,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Chip,
} from "@mui/material";
import DataTable from "./components/DataTable";
import { GUIDES } from "@/data/guides";
import { categories } from "@/data/categories";
import { modelData } from "@/data/models";

interface Category {
  id: string;
  title: string;
  description: string;
}

interface Model {
  name: string;
  company: string;
  releaseDate: string;
  description: string;
  strengths: string[];
  limitations: string[];
  useCases: string[];
  pricing: {
    free: string;
    paid: string;
    api: string;
  };
  link: string | null;
  status?: "active" | "inactive";
}

export default function Dashboard() {
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openModelDialog, setOpenModelDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setOpenCategoryDialog(true);
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setOpenCategoryDialog(true);
  };

  const handleDeleteCategory = (category: Category) => {
    // TODO: Implement delete category
    console.log("Delete category:", category);
  };

  const handleAddModel = () => {
    setSelectedModel(null);
    setOpenModelDialog(true);
  };

  const handleEditModel = (model: Model) => {
    setSelectedModel(model);
    setOpenModelDialog(true);
  };

  const handleDeleteModel = (model: Model) => {
    // TODO: Implement delete model
    console.log("Delete model:", model);
  };

  const renderGuides = () => {
    const columns = [
      { field: "title", headerName: "Title", width: 200 },
      { field: "description", headerName: "Description", width: 300 },
      {
        field: "categories",
        headerName: "Categories",
        width: 200,
        renderCell: (row: any) => (
          <Box sx={{ display: "flex", gap: 1 }}>
            {row.metadata.categories.map((category: string) => (
              <Chip key={category} label={category} size="small" />
            ))}
          </Box>
        ),
      },
      {
        field: "featured",
        headerName: "Featured",
        width: 100,
        renderCell: (row: any) => (
          <Chip
            label={row.featured ? "Yes" : "No"}
            color={row.featured ? "primary" : "default"}
            size="small"
          />
        ),
      },
      {
        field: "lastUpdated",
        headerName: "Last Updated",
        width: 150,
      },
    ];

    return (
      <DataTable
        title="Guides"
        data={GUIDES}
        columns={columns}
      />
    );
  };

  const renderCategories = () => {
    const columns = [
      { field: "title", headerName: "Title", width: 200 },
      { field: "description", headerName: "Description", width: 300 },
    ];

    return (
      <DataTable
        title="Categories"
        data={categories}
        columns={columns}
        onAdd={handleAddCategory}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
      />
    );
  };

  const renderModels = () => {
    const columns = [
      { field: "name", headerName: "Title", width: 200 },
      { field: "description", headerName: "Description", width: 300 },
      { field: "company", headerName: "Company", width: 150 },
      {
        field: "status",
        headerName: "Status",
        width: 100,
        renderCell: (row: Model) => (
          <Chip
            label={row.status || "active"}
            color={row.status === "active" ? "success" : "default"}
            size="small"
          />
        ),
      },
    ];

    const models = modelData.text.map(model => ({
      ...model,
      status: "active" as const,
    }));

    return (
      <DataTable
        title="Models"
        data={models}
        columns={columns}
        onAdd={handleAddModel}
        onEdit={handleEditModel}
        onDelete={handleDeleteModel}
      />
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Box>
          {renderGuides()}
        </Box>
        <Stack direction="row" spacing={3}>
          <Box sx={{ flex: 1 }}>
            {renderCategories()}
          </Box>
          <Box sx={{ flex: 1 }}>
            {renderModels()}
          </Box>
        </Stack>
      </Stack>

      {/* Category Dialog */}
      <Dialog
        open={openCategoryDialog}
        onClose={() => setOpenCategoryDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedCategory ? "Edit Category" : "Add New Category"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              label="Title"
              fullWidth
              defaultValue={selectedCategory?.title}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              defaultValue={selectedCategory?.description}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCategoryDialog(false)}>Cancel</Button>
          <Button variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Model Dialog */}
      <Dialog
        open={openModelDialog}
        onClose={() => setOpenModelDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedModel ? "Edit Model" : "Add New Model"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              label="Title"
              fullWidth
              defaultValue={selectedModel?.name}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              defaultValue={selectedModel?.description}
            />
            <TextField
              label="Company"
              fullWidth
              defaultValue={selectedModel?.company}
            />
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={selectedModel?.status === "active"}
                />
              }
              label="Active"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModelDialog(false)}>Cancel</Button>
          <Button variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
