"use client";

import { useState } from "react";
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
import { GUIDES } from "@/data/guides";
import ModuleContentDialog from "./ModuleContentDialog";
import BasicInfoStep from "./BasicInfoStep";
import CategoriesAndKeywordsStep from "./CategoriesAndKeywordsStep";
import OverviewStep from "./OverviewStep";
import ModulesStep from "./ModulesStep";
import ReviewStep from "./ReviewStep";
import { Guide, Module } from "../types";

const steps = [
  "Basic Information",
  "Categories & Keywords",
  "Guide Overview",
  "Modules",
  "Review",
];

export default function GuideForm() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<Partial<Guide>>({
    title: "",
    description: "",
    image: "",
    color: "#3f51b5",
    modules: [],
    metadata: {
      categories: [],
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

  const handleNext = () => {
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
    setSelectedCategories(event.target.value);
    handleFormDataChange("metadata", {
      ...formData.metadata,
      categories: event.target.value,
    });
  };

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
          ...formData.metadata?.overview!,
          bullets: [...(formData.metadata?.overview?.bullets || []), newBullet.trim()],
        },
      });
      setNewBullet("");
    }
  };

  const handleRemoveBullet = (bullet: string) => {
    handleFormDataChange("metadata", {
      ...formData.metadata,
      overview: {
        ...formData.metadata?.overview!,
        bullets: formData.metadata?.overview?.bullets.filter((b) => b !== bullet) || [],
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

  const handleSubmit = () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.image ||
      !formData.metadata?.categories.length ||
      !formData.metadata?.overview ||
      !formData.modules?.length
    ) {
      return;
    }

    const newGuide = {
      id: `guide-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      image: formData.image,
      color: formData.color,
      modules: formData.modules || [],
      metadata: {
        categories: formData.metadata?.categories || [],
        keywords: formData.metadata?.keywords || [],
        overview: formData.metadata?.overview || "",
      },
    } as Guide;

    console.log("New Guide:", newGuide);
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
            onFormDataChange={handleFormDataChange}
            onCategoryChange={handleCategoryChange}
            onNewKeywordChange={setNewKeyword}
            onAddKeyword={handleAddKeyword}
            onRemoveKeyword={handleRemoveKeyword}
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
      <Box sx={{ 
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            color: 'text.primary',
            letterSpacing: '-0.5px'
          }}
        >
          Create New Guide
        </Typography>

        <Paper 
          elevation={0} 
          sx={{ 
            p: 4,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper'
          }}
        >
          <Stepper 
            activeStep={activeStep} 
            sx={{ 
              mb: 6,
              '& .MuiStepLabel-label': {
                fontWeight: 500,
                fontSize: '0.875rem'
              },
              '& .MuiStepIcon-root': {
                color: 'primary.main',
                '&.Mui-active': {
                  color: 'primary.main'
                },
                '&.Mui-completed': {
                  color: 'success.main'
                }
              }
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ 
            mb: 6,
            minHeight: '400px'
          }}>
            {renderStepContent(activeStep)}
          </Box>

          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between",
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 4,
                textTransform: 'none',
                fontWeight: 500
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
              sx={{
                borderRadius: 2,
                px: 4,
                textTransform: 'none',
                fontWeight: 500,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none'
                }
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
    </Container>
  );
}
