"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Container,
} from "@mui/material";
import ModuleContentDialog from "./ModuleContentDialog";
import BasicInfoStep from "./BasicInfoStep";
import CategoriesAndKeywordsStep from "./CategoriesAndKeywordsStep";
import OverviewStep from "./OverviewStep";
import ModulesStep from "./ModulesStep";
import ReviewStep from "./ReviewStep";
import { Guide, Module } from "../types";
import { supabase } from "@/lib/supabaseClient";
import { privateRequest, publicRequest } from "@/utils/apiClient";
import CategoryDialog from "../../dashboard/components/CategoryDialog";
import { useLoading } from "@/components/LoadingProvider";
import { useErrorStore } from "@/store/errorStore";
import { useSuccessStore } from "@/store/successStore";

const steps = [
  "Basic Information",
  "Categories & Keywords",
  "Guide Overview",
  "Modules",
  "Review",
];

interface GuideFormProps {
  guideId?: string;
}

export default function GuideForm({ guideId }: GuideFormProps) {
  const router = useRouter();
  const { show: showLoading, hide: hideLoading } = useLoading();
  const { showError } = useErrorStore();
  const { showSuccess } = useSuccessStore();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<Partial<Guide>>({
    title: "",
    description: "",
    image: "",
    color: "#3f51b5",
    modules: [],
    is_popular: false,
    categories: [],
    metadata: {
      keywords: [],
      overview: {
        text: "",
        bullets: [],
      },
    },
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [newBullet, setNewBullet] = useState("");
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [moduleDialogOpen, setModuleDialogOpen] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [categoriesRefreshKey, setCategoriesRefreshKey] = useState(0);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);

  useEffect(() => {
    const fetchGuide = async () => {
      if (!guideId || guideId === "new") return;

      showLoading();
      try {
        const { data } = await publicRequest.get(`/guides/${guideId}`);
        if (!data?.guide) throw new Error("Guide not found");

        const guide = data.guide;

        // Fill form data
        setFormData({
          title: guide.title,
          description: guide.description,
          image: guide.image,
          color: guide.color,
          modules: guide.modules,
          is_popular: guide.is_popular,
          categories: guide.categories || [],
          metadata: guide.metadata,
        });

        // Set selected categories
        const categoryIds = (guide.categories || []).map((cat: any) => cat.id);
        setSelectedCategories(categoryIds);
      } catch (error) {
        console.error("Error fetching guide:", error);
        alert("Error loading guide data");
      } finally {
        hideLoading();
      }
    };

    fetchGuide();
  }, [guideId]);

  // Função para validar campos obrigatórios por passo
  const validateStep = (step: number) => {
    const missing: string[] = [];
    if (step === 0) {
      if (!formData.title) missing.push("Title");
      if (!formData.description) missing.push("Description");
      if (!formData.image) missing.push("Image");
    }
    if (step === 1) {
      if (!formData.metadata?.keywords || !formData.metadata.keywords.length)
        missing.push("At least one Keyword");
    }
    if (step === 2) {
      if (!formData.metadata?.overview?.text) missing.push("Overview Text");
    }
    if (step === 3) {
      if (!formData.modules || !formData.modules.length)
        missing.push("At least one Module");
    }
    return missing;
  };

  const handleNext = () => {
    const missing = validateStep(activeStep);
    if (missing.length > 0) {
      showError(
        "Required fields",
        `Please fill in the following fields before continuing:\n\n${missing.join(
          "\n"
        )}`
      );
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFormDataChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCategoryChange = (event: any) => {
    console.log('handleCategoryChange - event.target.value:', event.target.value);
    setSelectedCategories(event.target.value);
  };

  // Sincronizar formData.categories com selectedCategories
  useEffect(() => {
    console.log('Syncing categories - selectedCategories:', selectedCategories);
    console.log('Syncing categories - categoriesList:', categoriesList);
    const selectedObjs = categoriesList
      .filter((cat) => selectedCategories.includes(cat.id))
      .map((cat) => ({ id: cat.id, title: cat.title, color: cat.color }));
    console.log('Syncing categories - selectedObjs:', selectedObjs);
    
    // Só atualiza se houver mudança real
    if (JSON.stringify(selectedObjs) !== JSON.stringify(formData.categories)) {
      console.log('Updating formData.categories with:', selectedObjs);
      handleFormDataChange("categories", selectedObjs);
    }
  }, [selectedCategories, categoriesList]);

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      handleFormDataChange("metadata", {
        ...formData.metadata,
        keywords: [...(formData.metadata?.keywords || []), newKeyword.trim()],
      });
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    handleFormDataChange("metadata", {
      ...formData.metadata,
      keywords: formData.metadata?.keywords.filter((k) => k !== keyword) || [],
    });
  };

  const handleAddBullet = () => {
    if (newBullet.trim()) {
      handleFormDataChange("metadata", {
        ...formData.metadata,
        overview: {
          ...formData.metadata?.overview,
          bullets: [
            ...(formData.metadata?.overview?.bullets || []),
            newBullet.trim(),
          ],
        },
      });
      setNewBullet("");
    }
  };

  const handleRemoveBullet = (bullet: string) => {
    handleFormDataChange("metadata", {
      ...formData.metadata,
      overview: {
        ...formData.metadata?.overview,
        bullets:
          formData.metadata?.overview?.bullets.filter((b) => b !== bullet) ||
          [],
      },
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFormDataChange("image", file);
    }
  };

  const handleModuleEdit = (module: Module) => {
    setSelectedModule(module);
    setModuleDialogOpen(true);
  };

  const handleSubmit = async () => {
    console.log('Submit - Initial formData:', formData);
    console.log('Submit - Current selectedCategories:', selectedCategories);
    console.log('Submit - Current categoriesList:', categoriesList);
    
    const missingFields = [];

    if (!formData.title) missingFields.push("Title");
    if (!formData.description) missingFields.push("Description");
    if (!formData.image) missingFields.push("Image");
    if (!formData.metadata?.overview?.text) missingFields.push("Overview");
    if (!formData.modules?.length) missingFields.push("Modules");

    if (missingFields.length > 0) {
      showError(
        "Required fields",
        `Please fill in the following fields before continuing:\n\n${missingFields.join(
          "\n"
        )}`
      );
      return;
    }

    showLoading();
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("User not authenticated");

      let imageUrl = formData.image;
      if (formData.image && typeof formData.image !== "string") {
        const file = formData.image as File;
        const filePath = `guides/${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });
        if (uploadError) throw new Error(uploadError.message);
        const { data: publicUrlData } = supabase.storage
          .from("images")
          .getPublicUrl(filePath);
        imageUrl = publicUrlData.publicUrl;
      }

      // Garantir que todas as categorias selecionadas estejam no formData
      const finalCategories = categoriesList
        .filter((cat) => selectedCategories.includes(cat.id))
        .map((cat) => ({ id: cat.id, title: cat.title, color: cat.color }));

      console.log('Submit - Final categories:', finalCategories);

      const guideData = {
        title: formData.title,
        description: formData.description,
        image: imageUrl,
        color: formData.color,
        modules: formData.modules,
        is_popular: formData.is_popular,
        categories: finalCategories,
        metadata: {
          ...formData.metadata,
        },
      };

      console.log('Submit - Final guideData:', guideData);

      const isEdit = guideId && guideId !== "new";
      const response = isEdit
        ? await privateRequest.put(`/guides/${guideId}`, guideData)
        : await privateRequest.post("/guides", guideData);

      console.log('Submit - Response:', response.data);

      if (!response.data?.guide) {
        throw new Error(
          guideId ? "Error updating guide" : "Error creating guide"
        );
      }

      router.push("/administrador/dashboard");
    } catch (error: any) {
      console.error('Submit - Error:', error);
      showError(
        "Error",
        error.message ||
          (guideId ? "Error updating guide" : "Error creating guide")
      );
    } finally {
      hideLoading();
    }
  };

  const handleAddCategoryClick = () => {
    setOpenCategoryDialog(true);
  };

  const handleCategoryDialogSave = async (categoryData: any) => {
    showLoading();
    try {
      console.log('CategoryDialog Save - Input:', categoryData);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("User not authenticated");
      const response = await privateRequest.post("/categories", categoryData);
      console.log('CategoryDialog Save - Response:', response.data);
      
      if (!response.data?.category) {
        throw new Error("Error creating category");
      }
      setOpenCategoryDialog(false);
      setCategoriesRefreshKey((k) => k + 1);

      // Atualizar selectedCategories com o novo ID
      setSelectedCategories((prev) => {
        const newSelected = [...prev, response.data.category.id];
        console.log('Updated selectedCategories:', newSelected);
        return newSelected;
      });

      // Atualizar formData.categories com o objeto completo da nova categoria
      setFormData((prev) => {
        const newCategories = [
          ...(prev.categories || []),
          {
            id: response.data.category.id,
            title: response.data.category.title,
            color: response.data.category.color,
          },
        ];
        console.log('Updated formData.categories:', newCategories);
        return {
          ...prev,
          categories: newCategories,
        };
      });

      setCategoriesList((prev) => [
        ...prev,
        {
          id: response.data.category.id,
          title: response.data.category.title,
          color: response.data.category.color,
        },
      ]);

      showSuccess("Category created successfully!", {
        text: "OK",
        onClick: () => {},
      });
    } catch (error: any) {
      console.error('CategoryDialog Save - Error:', error);
      showError("Error", error.message || "Error creating category");
    } finally {
      hideLoading();
    }
  };

  // Buscar categorias reais para montar o array de objetos no submit
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await publicRequest.get("/categories");
        console.log('Fetched categories:', data.categories);
        setCategoriesList(data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddAnotherCategory = () => {
    setOpenCategoryDialog(true);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <BasicInfoStep
            formData={formData}
            onFormDataChange={handleFormDataChange}
            onImageChange={handleImageChange}
          />
        );
      case 1:
        return (
          <CategoriesAndKeywordsStep
            formData={formData}
            selectedCategories={selectedCategories}
            newKeyword={newKeyword}
            onCategoryChange={handleCategoryChange}
            onNewKeywordChange={setNewKeyword}
            onAddKeyword={handleAddKeyword}
            onRemoveKeyword={handleRemoveKeyword}
            onAddCategoryClick={handleAddCategoryClick}
            refreshKey={categoriesRefreshKey}
          />
        );
      case 2:
        return (
          <OverviewStep
            formData={formData}
            newBullet={newBullet}
            onFormDataChange={handleFormDataChange}
            onNewBulletChange={setNewBullet}
            onAddBullet={handleAddBullet}
            onRemoveBullet={handleRemoveBullet}
          />
        );
      case 3:
        return (
          <ModulesStep
            formData={formData}
            onFormDataChange={handleFormDataChange}
            onModuleEdit={handleModuleEdit}
          />
        );
      case 4:
        return <ReviewStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          py: 4,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            letterSpacing: "-0.5px",
          }}
        >
          {guideId ? "Edit Guide" : "Create New Guide"}
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Stepper
            activeStep={activeStep}
            sx={{
              mb: 6,
              "& .MuiStepLabel-label": {
                fontWeight: 500,
                fontSize: "0.875rem",
              },
              "& .MuiStepIcon-root": {
                color: "primary.main",
                "&.Mui-active": {
                  color: "primary.main",
                },
                "&.Mui-completed": {
                  color: "success.main",
                },
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box
            sx={{
              mb: 6,
              minHeight: "400px",
            }}
          >
            {renderStepContent(activeStep)}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pt: 2,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 4,
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={
                activeStep === steps.length - 1 ? handleSubmit : handleNext
              }
              sx={{
                borderRadius: 2,
                px: 4,
                textTransform: "none",
                fontWeight: 500,
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </Paper>
      </Box>

      <ModuleContentDialog
        open={moduleDialogOpen}
        onClose={() => {
          setModuleDialogOpen(false);
          setSelectedModule(null);
        }}
        module={selectedModule!}
        onSave={(updatedModule) => {
          if (selectedModule) {
            const moduleIndex = formData.modules?.findIndex(
              (m) => m === selectedModule
            );
            if (moduleIndex !== undefined && moduleIndex !== -1) {
              const updatedModules = [...(formData.modules || [])];
              updatedModules[moduleIndex] = updatedModule;
              handleFormDataChange("modules", updatedModules);
            }
          }
          setModuleDialogOpen(false);
          setSelectedModule(null);
        }}
      />

      <CategoryDialog
        open={openCategoryDialog}
        onClose={() => setOpenCategoryDialog(false)}
        onSave={handleCategoryDialogSave}
        onAddAnotherCategory={handleAddAnotherCategory}
      />
    </Container>
  );
}
