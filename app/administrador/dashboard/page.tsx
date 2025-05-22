"use client";

import { useState, useEffect } from "react";
import {
  Box,
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
  Typography,
  Tabs,
  Tab,
  IconButton,
  Container,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Book as BookIcon,
  Category as CategoryIcon,
  SmartToy as ModelIcon,
  AddCircleOutline as AddCircleOutlineIcon,
} from "@mui/icons-material";
import DataTable from "./components/DataTable";
import { GUIDES } from "@/data/guides";
import { modelData } from "@/data/models";
import { useRouter } from "next/navigation";
import CategoryDialog from "./components/CategoryDialog";
import ActionButton from "./components/ActionButton";
import { supabase } from "@/lib/supabaseClient";
import { publicRequest, privateRequest } from "@/utils/apiClient";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import { useLoading } from "@/components/LoadingProvider";

interface Category {
  id: string;
  title: string;
  description: string;
  icon_url: string;
  color: string;
  guides: string[];
  featured?: boolean;
  comingSoon?: boolean;
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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Dashboard() {
  const { show: showLoading, hide: hideLoading } = useLoading();
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openModelDialog, setOpenModelDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDeleteGuideDialog, setOpenDeleteGuideDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [guides, setGuides] = useState<any[]>([]);
  const router = useRouter();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      showLoading();
      try {
        const { data } = await publicRequest.get("/categories");
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        hideLoading();
      }
    };

    fetchCategories();
  }, []);

  // Fetch guides
  useEffect(() => {
    const fetchGuides = async () => {
      showLoading();
      try {
        const { data } = await publicRequest.get("/guides");
        setGuides(data.guides);
      } catch (error) {
        console.error("Error fetching guides:", error);
      } finally {
        hideLoading();
      }
    };
    fetchGuides();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setOpenCategoryDialog(true);
  };

  const handleEditCategory = (category: Category) => {
    console.log("Editing category:", category);
    setSelectedCategory({
      id: category.id,
      title: category.title,
      description: category.description,
      icon_url: category.icon_url,
      color: category.color,
      featured: category.featured || false,
      comingSoon: category.comingSoon || false,
      guides: category.guides || [],
    });
    setOpenCategoryDialog(true);
  };

  const handleDeleteCategory = async (category: Category) => {
    setSelectedCategory(category);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;

    showLoading();
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("User not authenticated");
      }

      await privateRequest.delete(`/categories/${selectedCategory.id}`);

      // Update local state
      setCategories((prev) => prev.filter((c) => c.id !== selectedCategory.id));
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Erro ao excluir categoria. Por favor, tente novamente.");
    } finally {
      hideLoading();
    }
  };

  const handleSaveCategory = async (category: Partial<Category>) => {
    showLoading();
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("User not authenticated");
      }

      if (selectedCategory) {
        // Update existing category
        await privateRequest.put(
          `/categories/${selectedCategory.id}`,
          category
        );
      } else {
        // Create new category
        const response = await privateRequest.post("/categories", category);
        if (!response.data?.category) {
          throw new Error("Invalid response from server");
        }
      }

      // Fetch updated categories
      const { data } = await publicRequest.get("/categories");
      setCategories(data.categories);

      setOpenCategoryDialog(false);
      setSelectedCategory(null);
    } catch (error: any) {
      console.error("Error saving category:", error);
      alert(
        error.message || "Erro ao salvar categoria. Por favor, tente novamente."
      );
    } finally {
      hideLoading();
    }
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

  const handleDeleteGuide = (guide: any) => {
    setSelectedGuide(guide);
    setOpenDeleteGuideDialog(true);
  };

  const handleConfirmDeleteGuide = async () => {
    if (!selectedGuide) return;
    showLoading();
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("User not authenticated");
      await privateRequest.delete(`/guides/${selectedGuide.id}`);
      setGuides((prev) => prev.filter((g) => g.id !== selectedGuide.id));
      setOpenDeleteGuideDialog(false);
      setSelectedGuide(null);
    } catch (error) {
      alert("Erro ao deletar guide");
    } finally {
      hideLoading();
    }
  };

  const renderStats = () => {
    return (
      <Box sx={{ display: "flex", gap: 3, mb: 4, flexWrap: "wrap" }}>
        <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "var(--footer-border)",
              bgcolor: "#fff",
              height: "100%",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "var(--primary-blue)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "var(--primary-blue)15",
                  color: "var(--primary-blue)",
                }}
              >
                <BookIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Total Guides
              </Typography>
            </Box>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, color: "var(--primary-blue)" }}
            >
              {guides.length}
            </Typography>
          </Paper>
        </Box>

        <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "var(--footer-border)",
              bgcolor: "#fff",
              height: "100%",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "var(--primary-purple)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "var(--primary-purple)15",
                  color: "var(--primary-purple)",
                }}
              >
                <CategoryIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Categories
              </Typography>
            </Box>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, color: "var(--primary-purple)" }}
            >
              {categories.length}
            </Typography>
          </Paper>
        </Box>

        <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "var(--footer-border)",
              bgcolor: "#fff",
              height: "100%",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "var(--primary-red)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "var(--primary-red)15",
                  color: "var(--primary-red)",
                }}
              >
                <ModelIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                AI Models
              </Typography>
            </Box>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, color: "var(--primary-red)" }}
            >
              {modelData.text.length}
            </Typography>
          </Paper>
        </Box>
      </Box>
    );
  };

  const renderGuides = () => {
    const columns = [
      { field: "title", headerName: "Title", width: 200 },
      { field: "description", headerName: "Description", width: 300 },
      {
        field: "categories",
        headerName: "Categories",
        width: 200,
        renderCell: (row: any) => {
          const categories = row.metadata?.categories || [];
          return (
            <Box sx={{ display: "flex", gap: 1 }}>
              {categories.map((cat: any) => (
                <Chip
                  key={cat.id}
                  label={cat.title}
                  size="small"
                  sx={{
                    bgcolor: "var(--primary-blue)15",
                    color: "var(--primary-blue)",
                    fontWeight: 500,
                    "&:hover": {
                      bgcolor: "var(--primary-blue)25",
                    },
                  }}
                />
              ))}
            </Box>
          );
        },
      },
      {
        field: "modules",
        headerName: "Modules",
        width: 100,
        renderCell: (row: any) => row.modules?.length || 0,
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
        field: "created_at",
        headerName: "Created At",
        width: 150,
        renderCell: (row: any) => new Date(row.created_at).toLocaleDateString(),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 100,
        renderCell: (row: any) => (
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton size="small" color="primary">
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDeleteGuide(row)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ),
      },
    ];

    return (
      <Paper
        elevation={0}
        sx={{
          p: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            px: 1.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <BookIcon sx={{ color: "var(--primary-blue)" }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Guides
            </Typography>
          </Box>
          <ActionButton
            icon={<AddCircleOutlineIcon />}
            color="blue"
            onClick={() => router.push("/administrador/guides/new")}
          >
            New Guide
          </ActionButton>
        </Box>
        <DataTable title="" data={guides} columns={columns} />
      </Paper>
    );
  };

  const renderCategories = () => {
    const columns = [
      {
        field: "icon_url",
        headerName: "Icon",
        width: 100,
        renderCell: (row: Category) => (
          <Box
            sx={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              bgcolor: `${row.color}15`,
              color: row.color,
            }}
          >
            <img
              src={row.icon_url}
              alt={row.title}
              style={{ width: 24, height: 24 }}
            />
          </Box>
        ),
      },
      { field: "title", headerName: "Title", width: 200 },
      { field: "description", headerName: "Description", width: 300 },
      {
        field: "featured",
        headerName: "Featured",
        width: 100,
        renderCell: (row: Category) => (
          <Chip
            label={row.featured ? "Yes" : "No"}
            color={row.featured ? "primary" : "default"}
            size="small"
          />
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 100,
        renderCell: (row: Category) => (
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleEditCategory(row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDeleteCategory(row)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ),
      },
    ];

    return (
      <Paper
        elevation={0}
        sx={{
          p: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            px: 1.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CategoryIcon sx={{ color: "var(--primary-purple)" }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Categories
            </Typography>
          </Box>
          <ActionButton
            icon={<AddCircleOutlineIcon />}
            color="purple"
            onClick={handleAddCategory}
          >
            Add New Category
          </ActionButton>
        </Box>
        <DataTable title="" data={categories} columns={columns} />
      </Paper>
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
      {
        field: "actions",
        headerName: "Actions",
        width: 100,
        renderCell: (row: Model) => (
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleEditModel(row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDeleteModel(row)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ),
      },
    ];

    const models = modelData.text.map((model) => ({
      ...model,
      status: "active" as const,
    }));

    return (
      <Paper
        elevation={0}
        sx={{
          bgcolor: "#fff",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            px: 1.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ModelIcon sx={{ color: "var(--primary-red)" }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              AI Models
            </Typography>
          </Box>
          <ActionButton
            icon={<AddCircleOutlineIcon />}
            color="red"
            onClick={handleAddModel}
          >
            New Model
          </ActionButton>
        </Box>
        <DataTable title="" data={models} columns={columns} />
      </Paper>
    );
  };

  return (
    <Container sx={{ pt: 5 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 4, color: "var(--foreground)" }}
      >
        Dashboard
      </Typography>

      {renderStats()}

      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "var(--footer-border)",
          bgcolor: "#fff",
          overflow: "hidden",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: "1px solid",
            borderColor: "var(--footer-border)",
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              fontSize: "1rem",
              py: 2,
              px: 3,
            },
            "& .Mui-selected": {
              color: "var(--primary-blue) !important",
            },
            "& .MuiTabs-indicator": {
              bgcolor: "var(--primary-blue)",
            },
          }}
        >
          <Tab
            icon={<BookIcon sx={{ mr: 1 }} />}
            iconPosition="start"
            label="Guides"
          />
          <Tab
            icon={<CategoryIcon sx={{ mr: 1 }} />}
            iconPosition="start"
            label="Categories"
          />
          <Tab
            icon={<ModelIcon sx={{ mr: 1 }} />}
            iconPosition="start"
            label="AI Models"
          />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          {renderGuides()}
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          {renderCategories()}
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          {renderModels()}
        </TabPanel>
      </Paper>

      {/* Category Dialog */}
      <CategoryDialog
        open={openCategoryDialog}
        onClose={() => setOpenCategoryDialog(false)}
        onSave={handleSaveCategory}
        category={selectedCategory || undefined}
      />

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
                <Switch defaultChecked={selectedModel?.status === "active"} />
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

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        itemName={selectedCategory?.title || ""}
      />

      <DeleteConfirmationDialog
        open={openDeleteGuideDialog}
        onClose={() => setOpenDeleteGuideDialog(false)}
        onConfirm={handleConfirmDeleteGuide}
        title="Delete Guide"
        itemName={selectedGuide?.title || ""}
      />
    </Container>
  );
}
