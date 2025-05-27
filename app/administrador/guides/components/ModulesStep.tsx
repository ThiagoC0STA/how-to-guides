import { Box, Button, Typography, Paper, IconButton } from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  List as ListIcon,
  Quiz as QuizIcon,
} from "@mui/icons-material";
import { Guide, Module } from "../types";

interface ModulesStepProps {
  formData: Partial<Guide>;
  onFormDataChange: (field: string, value: any) => void;
  onModuleEdit: (module: Module) => void;
}

export default function ModulesStep({
  formData,
  onFormDataChange,
  onModuleEdit,
}: ModulesStepProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          Modules
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            const newModule: Module = {
              title: `Module ${(formData.modules?.length || 0) + 1}`,
              locked: false,
              content: {
                sections: [],
              },
              questions: [],
            };
            onFormDataChange("modules", [
              ...(formData.modules || []),
              newModule,
            ]);
          }}
          startIcon={<AddIcon />}
          sx={{
            borderRadius: 2,
            px: 3,
            textTransform: "none",
            fontWeight: 500,
            boxShadow: "none",
            bgcolor: "var(--primary-blue)",
            "&:hover": {
              boxShadow: "none",
              opacity: 0.9,
            },
          }}
        >
          Add Module
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {formData.modules?.map((module, moduleIndex) => (
          <Paper
            key={moduleIndex}
            elevation={0}
            sx={{
              p: 3,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: formData.color,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              },
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    color: "text.primary",
                  }}
                >
                  {module.title}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => {
                      const updatedModules = [...(formData.modules || [])];
                      updatedModules[moduleIndex].locked =
                        !updatedModules[moduleIndex].locked;
                      onFormDataChange("modules", updatedModules);
                    }}
                    sx={{
                      color: module.locked ? formData.color : "grey.500",
                      "&:hover": {
                        bgcolor: `${formData.color}15`,
                      },
                    }}
                  >
                    {module.locked ? <LockIcon /> : <LockOpenIcon />}
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      const updatedModules = [...(formData.modules || [])];
                      updatedModules.splice(moduleIndex, 1);
                      onFormDataChange("modules", updatedModules);
                    }}
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
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <ListIcon fontSize="small" />
                  Sections: {module.content?.sections?.length || 0}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <QuizIcon fontSize="small" />
                  Questions: {module.questions?.length || 0}
                </Typography>
              </Box>

              <Button
                variant="outlined"
                onClick={() => onModuleEdit(module)}
                startIcon={<EditIcon />}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 500,
                  borderColor: formData.color,
                  color: formData.color,
                  "&:hover": {
                    borderColor: formData.color,
                    bgcolor: `${formData.color}15`,
                  },
                }}
              >
                Edit Content
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
