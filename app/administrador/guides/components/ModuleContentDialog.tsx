"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  FormControlLabel,
  Switch,
  Paper,
  useTheme,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { Module, Section } from "@/types/guide";

interface ModuleContentDialogProps {
  open: boolean;
  onClose: () => void;
  module: Module;
  onSave: (module: Module) => void;
}

export default function ModuleContentDialog({
  open,
  onClose,
  module,
  onSave,
}: ModuleContentDialogProps) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const steps = ["Module Content", "Questions"];
  const [editedModule, setEditedModule] = useState<Module>(() => ({
    title: module?.title || "",
    locked: module?.locked || false,
    content: {
      sections: module?.content?.sections || [
        {
          heading: "",
          text: "",
          list: [],
          expandable: false,
        },
      ],
    },
    questions: module?.questions || [],
  }));

  // Reset editedModule when module prop changes
  useEffect(() => {
    if (module) {
      setEditedModule({
        title: module.title,
        locked: module.locked,
        content: {
          sections: module.content?.sections || [
            {
              heading: "",
              text: "",
              list: [],
              expandable: false,
            },
          ],
        },
        questions: module.questions || [],
      });
    }
  }, [module]);

  const handleSave = () => {
    onSave(editedModule);
  };

  const handleAddSection = () => {
    setEditedModule((prev: Module) => ({
      ...prev,
      content: {
        ...prev.content,
        sections: [
          ...(prev.content?.sections || []),
          {
            heading: "",
            text: "",
            list: [],
          },
        ],
      },
    }));
  };

  const handleRemoveSection = (index: number) => {
    setEditedModule((prev: Module) => ({
      ...prev,
      content: {
        ...prev.content,
        sections:
          prev.content?.sections.filter(
            (_: Section, i: number) => i !== index
          ) || [],
      },
    }));
  };

  const handleSectionChange = (
    index: number,
    field: "heading" | "text" | "expandable",
    value: string | boolean
  ) => {
    setEditedModule((prev: Module) => {
      const updatedSections = [...(prev.content?.sections || [])];
      updatedSections[index] = {
        ...updatedSections[index],
        [field]: value,
      };
      return {
        ...prev,
        content: {
          ...prev.content,
          sections: updatedSections,
        },
      };
    });
  };

  const handleAddListItem = (sectionIndex: number) => {
    setEditedModule((prev: Module) => {
      const updatedSections = [...(prev.content?.sections || [])];
      updatedSections[sectionIndex] = {
        ...updatedSections[sectionIndex],
        list: [...(updatedSections[sectionIndex].list || []), ""],
      };
      return {
        ...prev,
        content: {
          ...prev.content,
          sections: updatedSections,
        },
      };
    });
  };

  const handleRemoveListItem = (sectionIndex: number, itemIndex: number) => {
    setEditedModule((prev: Module) => {
      const updatedSections = [...(prev.content?.sections || [])];
      updatedSections[sectionIndex] = {
        ...updatedSections[sectionIndex],
        list: updatedSections[sectionIndex].list.filter(
          (_: string, i: number) => i !== itemIndex
        ),
      };
      return {
        ...prev,
        content: {
          ...prev.content,
          sections: updatedSections,
        },
      };
    });
  };

  const handleListItemChange = (
    sectionIndex: number,
    itemIndex: number,
    value: string
  ) => {
    setEditedModule((prev: Module) => {
      const updatedSections = [...(prev.content?.sections || [])];
      updatedSections[sectionIndex] = {
        ...updatedSections[sectionIndex],
        list: updatedSections[sectionIndex].list.map(
          (item: string, i: number) => (i === itemIndex ? value : item)
        ),
      };
      return {
        ...prev,
        content: {
          ...prev.content,
          sections: updatedSections,
        },
      };
    });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderModuleContent = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {editedModule.content?.sections?.map((section, sectionIndex) => (
        <Paper
          key={sectionIndex}
          elevation={0}
          sx={{
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            background: theme.palette.background.default,
            transition: "all 0.2s ease-in-out",
            "&:hover": {
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
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  letterSpacing: "-0.3px",
                }}
              >
                Section {sectionIndex + 1}
              </Typography>
              <IconButton
                size="small"
                onClick={() => handleRemoveSection(sectionIndex)}
                sx={{
                  color: theme.palette.error.main,
                  "&:hover": {
                    background: theme.palette.error.light,
                    color: theme.palette.error.contrastText,
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>

            <TextField
              fullWidth
              label="Heading"
              value={section.heading}
              onChange={(e) =>
                handleSectionChange(sectionIndex, "heading", e.target.value)
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              fullWidth
              label="Content"
              value={
                typeof section.text === "string"
                  ? section.text
                  : section.text.join("\n")
              }
              onChange={(e) =>
                handleSectionChange(sectionIndex, "text", e.target.value)
              }
              multiline
              rows={4}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={section.expandable || false}
                  onChange={(e) =>
                    handleSectionChange(
                      sectionIndex,
                      "expandable",
                      e.target.checked
                    )
                  }
                />
              }
              label="Expandable Section"
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.secondary,
                  }}
                >
                  List Items
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleAddListItem(sectionIndex)}
                  startIcon={<AddIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    borderWidth: 2,
                    "&:hover": {
                      borderWidth: 2,
                    },
                  }}
                >
                  Add Item
                </Button>
              </Box>

              {section.list?.map((item, itemIndex) => (
                <Box
                  key={itemIndex}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    value={item}
                    onChange={(e) =>
                      handleListItemChange(
                        sectionIndex,
                        itemIndex,
                        e.target.value
                      )
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleRemoveListItem(sectionIndex, itemIndex)
                    }
                    sx={{
                      color: theme.palette.error.main,
                      "&:hover": {
                        background: theme.palette.error.light,
                        color: theme.palette.error.contrastText,
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      ))}

      <Button
        variant="contained"
        onClick={handleAddSection}
        startIcon={<AddIcon />}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          px: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          "&:hover": {
            boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
          },
        }}
      >
        Add Section
      </Button>
    </Box>
  );

  const renderQuestions = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {editedModule.questions?.map((question, questionIndex) => (
        <Paper
          key={questionIndex}
          elevation={0}
          sx={{
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            background: theme.palette.background.default,
            transition: "all 0.2s ease-in-out",
            "&:hover": {
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
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  letterSpacing: "-0.3px",
                }}
              >
                Question {questionIndex + 1}
              </Typography>
              <IconButton
                size="small"
                onClick={() => {
                  setEditedModule((prev) => ({
                    ...prev,
                    questions: prev.questions.filter(
                      (_, i) => i !== questionIndex
                    ),
                  }));
                }}
                sx={{
                  color: theme.palette.error.main,
                  "&:hover": {
                    background: theme.palette.error.light,
                    color: theme.palette.error.contrastText,
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>

            <TextField
              fullWidth
              label="Question"
              value={question.question}
              onChange={(e) => {
                setEditedModule((prev) => {
                  const updatedQuestions = [...prev.questions];
                  updatedQuestions[questionIndex] = {
                    ...updatedQuestions[questionIndex],
                    question: e.target.value,
                  };
                  return { ...prev, questions: updatedQuestions };
                });
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.secondary,
                mt: 1,
              }}
            >
              Options
            </Typography>
            {question.options.map((option, optionIndex) => (
              <Box
                key={optionIndex}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  label={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) => {
                    setEditedModule((prev) => {
                      const updatedQuestions = [...prev.questions];
                      updatedQuestions[questionIndex].options[optionIndex] =
                        e.target.value;
                      return { ...prev, questions: updatedQuestions };
                    });
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={question.correctAnswer === optionIndex}
                      onChange={() => {
                        setEditedModule((prev) => {
                          const updatedQuestions = [...prev.questions];
                          updatedQuestions[questionIndex].correctAnswer =
                            optionIndex;
                          return { ...prev, questions: updatedQuestions };
                        });
                      }}
                    />
                  }
                  label="Correct"
                />
                <IconButton
                  size="small"
                  onClick={() => {
                    setEditedModule((prev) => {
                      const updatedQuestions = [...prev.questions];
                      updatedQuestions[questionIndex].options =
                        updatedQuestions[questionIndex].options.filter(
                          (_, i) => i !== optionIndex
                        );
                      if (
                        updatedQuestions[questionIndex].correctAnswer ===
                        optionIndex
                      ) {
                        updatedQuestions[questionIndex].correctAnswer = 0;
                      }
                      return { ...prev, questions: updatedQuestions };
                    });
                  }}
                  sx={{
                    color: theme.palette.error.main,
                    "&:hover": {
                      background: theme.palette.error.light,
                      color: theme.palette.error.contrastText,
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}

            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setEditedModule((prev) => {
                  const updatedQuestions = [...prev.questions];
                  updatedQuestions[questionIndex] = {
                    ...updatedQuestions[questionIndex],
                    options: [...updatedQuestions[questionIndex].options, ""],
                  };
                  return { ...prev, questions: updatedQuestions };
                });
              }}
              startIcon={<AddIcon />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                borderWidth: 2,
                "&:hover": {
                  borderWidth: 2,
                },
              }}
            >
              Add Option
            </Button>
          </Box>
        </Paper>
      ))}

      <Button
        variant="contained"
        onClick={() => {
          setEditedModule((prev) => ({
            ...prev,
            questions: [
              ...prev.questions,
              {
                question: "",
                options: [""],
                correctAnswer: 0,
              },
            ],
          }));
        }}
        startIcon={<AddIcon />}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          px: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          "&:hover": {
            boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
          },
        }}
      >
        Add Question
      </Button>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          pb: 2,
          background: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
            {isEditingTitle ? (
              <TextField
                size="small"
                value={editedModule.title}
                onChange={(e) =>
                  setEditedModule((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setIsEditingTitle(false);
                  }
                }}
                autoFocus
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            ) : (
              <>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    letterSpacing: "-0.5px",
                  }}
                >
                  {editedModule.title || "Untitled Module"}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setIsEditingTitle(true)}
                  sx={{
                    color: theme.palette.text.secondary,
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
          <IconButton
            onClick={() =>
              setEditedModule((prev) => ({
                ...prev,
                locked: !prev.locked,
              }))
            }
            sx={{
              color: editedModule.locked
                ? theme.palette.primary.main
                : theme.palette.text.secondary,
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
          >
            {editedModule.locked ? <LockIcon /> : <LockOpenIcon />}
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ p: 4 }}>
        <Stepper
          activeStep={activeStep}
          sx={{
            mb: 4,
            mt: 4,
            "& .MuiStepLabel-label": {
              fontWeight: 500,
              fontSize: "0.9rem",
            },
            "& .MuiStepIcon-root": {
              color: theme.palette.primary.main,
              "&.Mui-active": {
                color: theme.palette.primary.main,
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

        {activeStep === 0 ? renderModuleContent() : renderQuestions()}
      </DialogContent>
      <DialogActions
        sx={{
          p: 3,
          borderTop: "1px solid",
          borderColor: "divider",
          background: theme.palette.background.default,
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 3,
          }}
        >
          Cancel
        </Button>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 3,
              borderWidth: 2,
              "&:hover": {
                borderWidth: 2,
              },
            }}
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 4,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                "&:hover": {
                  boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                },
              }}
            >
              Save Changes
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              variant="contained"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 4,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                "&:hover": {
                  boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                },
              }}
            >
              Next
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
}
