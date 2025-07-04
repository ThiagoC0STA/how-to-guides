"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Chip,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Container,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Book as BookIcon,
  Category as CategoryIcon,
  SmartToy as ModelIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import DataTable from "./components/DataTable";
import { useRouter } from "next/navigation";
import CategoryDialog from "./components/CategoryDialog";
import { supabase } from "@/lib/supabaseClient";
import { publicRequest, privateRequest } from "@/utils/apiClient";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import { useLoading } from "@/components/LoadingProvider";
import { useSuccessStore } from "@/store/successStore";
import Image from "next/image";
import ModelDialog from "./components/ModelDialog";
import { Model } from "../guides/types";
import { useErrorStore } from "@/store/errorStore";

interface Category {
  id: string;
  title: string;
  description: string;
  icon_url: string;
  color: string;
  guides: string[];
  featured?: boolean;
  comingSoon?: boolean;
  guide_categories?: Array<{
    guide?: {
      id: string;
      title: string;
    };
  }>;
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

// Botão de menu para adicionar Guides
function AddGuideMenuButton() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAddJson = () => {
    router.push("/administrador/guides/json");
    handleClose();
  };
  const handleAddManual = () => {
    router.push("/administrador/guides/new");
    handleClose();
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleClick}
        sx={{ borderRadius: 2, height: 40, whiteSpace: "nowrap", px: 2 }}
      >
        Add Guide
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleAddJson}>Add by JSON</MenuItem>
        <MenuItem onClick={handleAddManual}>Add manually</MenuItem>
      </Menu>
    </>
  );
}

type AddCategoryButtonProps = {
  onClick: () => void;
};
function AddCategoryButton({ onClick }: AddCategoryButtonProps) {
  return (
    <Button
      variant="outlined"
      startIcon={<AddIcon />}
      onClick={onClick}
      sx={{ borderRadius: 2, height: 40, whiteSpace: "nowrap" }}
    >
      Add Category
    </Button>
  );
}

export default function Dashboard() {
  const { show: showLoading, hide: hideLoading } = useLoading();
  const { showError } = useErrorStore();
  const { showSuccess } = useSuccessStore();
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
  const [models, setModels] = useState<any[]>([]);
  const router = useRouter();

  // Pagination state
  const [guidesPage, setGuidesPage] = useState(0);
  const [guidesRowsPerPage, setGuidesRowsPerPage] = useState(10);
  const [guidesTotalCount, setGuidesTotalCount] = useState(0);
  const [categoriesPage, setCategoriesPage] = useState(0);
  const [categoriesRowsPerPage, setCategoriesRowsPerPage] = useState(10);
  const [categoriesTotalCount, setCategoriesTotalCount] = useState(0);
  const [modelsPage, setModelsPage] = useState(0);
  const [modelsRowsPerPage, setModelsRowsPerPage] = useState(10);
  const [modelsTotalCount, setModelsTotalCount] = useState(0);

  // Remove filters state and simplify search
  const [guidesSearchTerm, setGuidesSearchTerm] = useState("");
  const [guidesSortField, setGuidesSortField] = useState("");
  const [guidesSortDirection, setGuidesSortDirection] = useState<
    "asc" | "desc"
  >("asc");

  // Categories search/sort state
  const [categoriesSearchTerm, setCategoriesSearchTerm] = useState("");
  const [categoriesSortField, setCategoriesSortField] = useState("");
  const [categoriesSortDirection, setCategoriesSortDirection] = useState<
    "asc" | "desc"
  >("asc");

  // Models search/sort state
  const [modelsSearchTerm, setModelsSearchTerm] = useState("");
  const [modelsSortField, setModelsSortField] = useState("");
  const [modelsSortDirection, setModelsSortDirection] = useState<
    "asc" | "desc"
  >("asc");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      showLoading();
      try {
        const queryParams = new URLSearchParams({
          page: categoriesPage.toString(),
          limit: categoriesRowsPerPage.toString(),
        });
        if (categoriesSearchTerm) {
          queryParams.append("search", categoriesSearchTerm);
        }
        if (categoriesSortField) {
          queryParams.append("sortBy", categoriesSortField);
          queryParams.append("sortDirection", categoriesSortDirection);
        }
        const { data } = await publicRequest.get(
          `/categories?${queryParams.toString()}`
        );
        setCategories(data.categories || []);
        setCategoriesTotalCount(data.totalCount || 0);
      } catch (error: any) {
        showError(
          "Error loading categories",
          error.message || "Could not load categories. Please try again."
        );
      } finally {
        hideLoading();
      }
    };
    fetchCategories();
  }, [
    categoriesPage,
    categoriesRowsPerPage,
    categoriesSearchTerm,
    categoriesSortField,
    categoriesSortDirection,
  ]);

  // Update fetchGuides to handle simplified search
  useEffect(() => {
    const fetchGuides = async () => {
      showLoading();
      try {
        const queryParams = new URLSearchParams({
          page: guidesPage.toString(),
          limit: guidesRowsPerPage.toString(),
        });

        if (guidesSearchTerm) {
          queryParams.append("search", guidesSearchTerm);
        }

        if (guidesSortField) {
          queryParams.append("sortBy", guidesSortField);
          queryParams.append("sortDirection", guidesSortDirection);
        }

        const { data } = await publicRequest.get(
          `/guides?${queryParams.toString()}`
        );
        setGuides(data.guides || []);
        setGuidesTotalCount(data.totalCount || 0);
      } catch (error: any) {
        showError(
          "Error loading guides",
          error.message || "Could not load guides. Please try again."
        );
      } finally {
        hideLoading();
      }
    };
    fetchGuides();
  }, [
    guidesPage,
    guidesRowsPerPage,
    guidesSearchTerm,
    guidesSortField,
    guidesSortDirection,
  ]);

  // Fetch AI models
  useEffect(() => {
    const fetchModels = async () => {
      showLoading();
      try {
        const queryParams = new URLSearchParams({
          page: modelsPage.toString(),
          limit: modelsRowsPerPage.toString(),
        });
        if (modelsSearchTerm) {
          queryParams.append("search", modelsSearchTerm);
        }
        if (modelsSortField) {
          queryParams.append("sortBy", modelsSortField);
          queryParams.append("sortDirection", modelsSortDirection);
        }
        const { data } = await publicRequest.get(
          `/ai-models?${queryParams.toString()}`
        );
        setModels(data.models || []);
        setModelsTotalCount(data.totalCount || 0);
      } catch (error: any) {
        showError(
          "Error loading models",
          error.message || "Could not load AI models. Please try again."
        );
      } finally {
        hideLoading();
      }
    };
    fetchModels();
  }, [
    modelsPage,
    modelsRowsPerPage,
    modelsSearchTerm,
    modelsSortField,
    modelsSortDirection,
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleEditCategory = (category: Category) => {
    const guides = Array.isArray(category.guide_categories)
      ? category.guide_categories.map((gc: any) => gc.guide?.id).filter(Boolean)
      : [];

    setSelectedCategory({
      id: category.id,
      title: category.title,
      description: category.description,
      icon_url: category.icon_url,
      color: category.color,
      featured: category.featured || false,
      comingSoon: category.comingSoon || false,
      guides,
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

      showSuccess("Category deleted successfully!", {
        text: "OK",
        onClick: () => setSelectedCategory(null),
      });
    } catch (error: any) {
      showError(
        "Error deleting category",
        error.message || "Could not delete category. Please try again."
      );
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
          throw new Error("Invalid server response");
        }
      }

      // Fetch updated categories
      const { data } = await publicRequest.get("/categories");
      setCategories(data.categories);

      // Fetch updated guides
      const { data: guidesData } = await publicRequest.get("/guides");
      setGuides(guidesData.guides);

      setOpenCategoryDialog(false);
      setSelectedCategory(null);
    } catch (error: any) {
      showError(
        "Error saving category",
        error.message || "Could not save category. Please try again."
      );
    } finally {
      hideLoading();
    }
  };

  const handleEditModel = (model: any) => {
    setSelectedModel(model);
    setOpenModelDialog(true);
  };

  const handleSaveModel = async (modelData: any) => {
    showLoading();
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("User not authenticated");
      let response;
      if (selectedModel && selectedModel.id) {
        response = await privateRequest.put(
          `/ai-models/${selectedModel.id}`,
          modelData
        );
      } else {
        response = await privateRequest.post("/ai-models", modelData);
      }
      if (!response.data?.model) {
        throw new Error(
          selectedModel ? "Error updating model" : "Error creating model"
        );
      }
      // Update list
      const { data } = await publicRequest.get("/ai-models");
      setModels(data.models || []);
      setOpenModelDialog(false);
      setSelectedModel(null);
    } catch (error: any) {
      showError(
        "Error saving model",
        error.message || "Could not save model. Please try again."
      );
    } finally {
      hideLoading();
    }
  };

  const handleDeleteModel = async (model: any) => {
    if (
      !window.confirm(
        `Are you sure you want to delete the model "${model.name}"?`
      )
    )
      return;
    showLoading();
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("User not authenticated");
      await privateRequest.delete(`/ai-models/${model.id}`);
      // Update list
      const { data } = await publicRequest.get("/ai-models");
      setModels(data.models || []);
    } catch (error: any) {
      showError(
        "Error deleting model",
        error.message || "Could not delete model. Please try again."
      );
    } finally {
      hideLoading();
    }
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

      // Atualizar categorias após deletar o guia
      const { data } = await publicRequest.get("/categories");
      setCategories(data.categories);
    } catch (error: any) {
      showError(
        "Error deleting guide",
        error.message || "Could not delete guide. Please try again."
      );
    } finally {
      hideLoading();
    }
  };

  const handleAddAnotherCategory = () => {
    setSelectedCategory(null);
    setOpenCategoryDialog(true);
  };

  // Simplify search handler
  const handleGuidesSearch = (searchTerm: string) => {
    setGuidesSearchTerm(searchTerm);
    setGuidesPage(0); // Reset to first page when searching
  };

  const handleGuidesSort = (field: string, direction: "asc" | "desc") => {
    setGuidesSortField(field);
    setGuidesSortDirection(direction);
    setGuidesPage(0); // Reset to first page when sorting
  };

  // Handlers for categories
  const handleCategoriesSearch = (searchTerm: string) => {
    setCategoriesSearchTerm(searchTerm);
    setCategoriesPage(0);
  };
  const handleCategoriesSort = (field: string, direction: "asc" | "desc") => {
    setCategoriesSortField(field);
    setCategoriesSortDirection(direction);
    setCategoriesPage(0);
  };

  // Handlers for models
  const handleModelsSearch = (searchTerm: string) => {
    setModelsSearchTerm(searchTerm);
    setModelsPage(0);
  };
  const handleModelsSort = (field: string, direction: "asc" | "desc") => {
    setModelsSortField(field);
    setModelsSortDirection(direction);
    setModelsPage(0);
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
              {models.length}
            </Typography>
          </Paper>
        </Box>
      </Box>
    );
  };

  const renderGuides = () => {
    const columns = [
      {
        field: "image",
        headerName: "Image",
        width: 100,
        sortable: false,
        renderCell: (row: any) => (
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "var(--primary-blue)15",
            }}
          >
            {row.image ? (
              <Image
                src={row.image}
                alt={row.title}
                width={48}
                height={48}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary-blue)",
                }}
              >
                <BookIcon />
              </Box>
            )}
          </Box>
        ),
      },
      {
        field: "title",
        headerName: "Title",
        width: 200,
        sortable: true,
        renderCell: (row: any) => (
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {row.title}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {row.description?.slice(0, 50)}...
            </Typography>
          </Box>
        ),
      },
      {
        field: "categories",
        headerName: "Categories",
        width: 250,
        sortable: false,
        renderCell: (row: any) => {
          const categories = row.categories || [];
          return (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                p: 1,
                bgcolor: "var(--primary-purple)05",
                borderRadius: 1,
                minHeight: 48,
                alignItems: "center",
                width: "100%",
              }}
            >
              {categories.length > 0 ? (
                categories.map((cat: any) => (
                  <Chip
                    key={cat.id}
                    label={cat.title}
                    size="small"
                    sx={{
                      bgcolor: cat.color || "white",
                      color: cat.color ? "#fff" : "var(--primary-purple)",
                      fontWeight: 500,
                      border: cat.color ? "none" : "1px solid",
                      borderColor: cat.color
                        ? "transparent"
                        : "var(--primary-purple)25",
                      "&:hover": {
                        bgcolor: cat.color
                          ? cat.color + "cc"
                          : "var(--primary-purple)10",
                      },
                    }}
                  />
                ))
              ) : (
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontStyle: "italic",
                  }}
                >
                  No categories
                </Typography>
              )}
            </Box>
          );
        },
      },
      {
        field: "modules",
        headerName: "Modules",
        width: 100,
        sortable: true,
        renderCell: (row: any) => (
          <Chip
            label={`${row.modules?.length || 0} modules`}
            size="small"
            sx={{
              bgcolor: "var(--primary-blue)15",
              color: "var(--primary-blue)",
              fontWeight: 500,
            }}
          />
        ),
      },
      {
        field: "featured",
        headerName: "Featured",
        width: 100,
        sortable: true,
        renderCell: (row: any) => (
          <Chip
            label={row.featured ? "Yes" : "No"}
            color={row.featured ? "primary" : "default"}
            size="small"
            sx={{
              fontWeight: 500,
            }}
          />
        ),
      },
      {
        field: "created_at",
        headerName: "Created At",
        width: 150,
        sortable: true,
        renderCell: (row: any) => (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {new Date(row.created_at).toLocaleDateString()}
          </Typography>
        ),
      },
      {
        field: "is_popular",
        headerName: "Popular",
        width: 100,
        sortable: true,
        renderCell: (row: any) =>
          row.is_popular ? (
            <Chip label="Yes" color="success" size="small" />
          ) : (
            <Chip label="No" size="small" />
          ),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 100,
        sortable: false,
        renderCell: (row: any) => (
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => router.push(`/administrador/guides/${row.id}`)}
            >
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

    return columns;
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
            <Image
              src={row.icon_url}
              alt={row.title}
              width={24}
              height={24}
              style={{ width: 24, height: 24, objectFit: "cover" }}
            />
          </Box>
        ),
      },
      { field: "title", headerName: "Title", width: 200 },
      { field: "description", headerName: "Description", width: 300 },
      {
        field: "guides",
        headerName: "Guides",
        width: 200,
        renderCell: (row: any) => {
          const guideTitles = row.guide_categories
            ? row.guide_categories
                .map((gc: any) => gc.guide?.title)
                .filter(Boolean)
            : [];

          return guideTitles.length > 0 ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {guideTitles.map((title: any, idx: any) => (
                <Chip key={idx} label={title} size="small" />
              ))}
            </Box>
          ) : (
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              No guides
            </Typography>
          );
        },
      },
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

    return columns;
  };

  const renderModels = () => {
    const columns = [
      { field: "name", headerName: "Title", width: 200 },
      { field: "description", headerName: "Description", width: 300 },
      { field: "company", headerName: "Company", width: 150 },
      {
        field: "actions",
        headerName: "Actions",
        width: 100,
        renderCell: (row: any) => (
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

    return columns;
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
          <DataTable
            title="Guides"
            data={guides}
            columns={renderGuides()}
            totalCount={guidesTotalCount}
            page={guidesPage}
            rowsPerPage={guidesRowsPerPage}
            onPageChange={setGuidesPage}
            onRowsPerPageChange={setGuidesRowsPerPage}
            onSearch={handleGuidesSearch}
            onSort={handleGuidesSort}
            showSearch={true}
            searchPlaceholder="Search guides..."
            extraAction={<AddGuideMenuButton />}
          />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <DataTable
            title="Categories"
            data={categories}
            columns={renderCategories()}
            totalCount={categoriesTotalCount}
            page={categoriesPage}
            rowsPerPage={categoriesRowsPerPage}
            onPageChange={setCategoriesPage}
            onRowsPerPageChange={setCategoriesRowsPerPage}
            onSearch={handleCategoriesSearch}
            onSort={handleCategoriesSort}
            showSearch={true}
            searchPlaceholder="Search categories..."
            extraAction={<AddCategoryButton onClick={() => setOpenCategoryDialog(true)} />}
          />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <DataTable
            title="AI Models"
            data={models}
            columns={renderModels()}
            totalCount={modelsTotalCount}
            page={modelsPage}
            rowsPerPage={modelsRowsPerPage}
            onPageChange={setModelsPage}
            onRowsPerPageChange={setModelsRowsPerPage}
            onSearch={handleModelsSearch}
            onSort={handleModelsSort}
            showSearch={true}
            searchPlaceholder="Search AI models..."
          />
        </TabPanel>
      </Paper>

      {/* Category Dialog */}
      <CategoryDialog
        open={openCategoryDialog}
        onClose={() => setOpenCategoryDialog(false)}
        onSave={handleSaveCategory}
        category={selectedCategory || undefined}
        withGuides={true}
        onAddAnotherCategory={handleAddAnotherCategory}
      />

      <ModelDialog
        open={openModelDialog}
        onClose={() => {
          setOpenModelDialog(false);
          setSelectedModel(null);
        }}
        onSave={handleSaveModel}
        model={selectedModel || undefined}
      />

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
