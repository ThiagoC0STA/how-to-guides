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
  Divider,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { Module, Section } from "@/types/guide";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

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
  const steps = ["Module Content", "Questions"];
  const [editedModule, setEditedModule] = useState<Module>(() => ({
    title: module?.title || "",
    locked: module?.locked || false,
    content: {
      sections: module?.content?.sections || [{
        heading: "",
        text: "",
        list: [],
        expandable: false
      }]
    },
    questions: module?.questions || []
  }));

  // Reset editedModule when module prop changes
  useEffect(() => {
    if (module) {
      setEditedModule({
        title: module.title,
        locked: module.locked,
        content: {
          sections: module.content?.sections || [{
            heading: "",
            text: "",
            list: [],
            expandable: false
          }]
        },
        questions: module.questions || []
      });
    }
  }, [module]);

  const [newSection, setNewSection] = useState<Partial<Section>>({
    heading: "",
    text: "",
    expandable: false,
  });
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  });

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
        sections: prev.content?.sections.filter((_: Section, i: number) => i !== index) || [],
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
        list: updatedSections[sectionIndex].list.filter((_: string, i: number) => i !== itemIndex),
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
        list: updatedSections[sectionIndex].list.map((item: string, i: number) =>
          i === itemIndex ? value : item
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
      <Paper
        elevation={1}
        sx={{
          p: 3,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            fullWidth
            label="Module Title"
            value={editedModule.title}
            onChange={(e) =>
              setEditedModule((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />
          <FormControlLabel
            control={
              <Switch
                checked={editedModule.locked}
                onChange={(e) =>
                  setEditedModule((prev) => ({
                    ...prev,
                    locked: e.target.checked,
                  }))
                }
              />
            }
            label="Lock Module"
          />
        </Box>
      </Paper>

      {editedModule.content?.sections?.map((section, sectionIndex) => (
        <Paper
          key={sectionIndex}
          elevation={1}
          sx={{
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Section {sectionIndex + 1}
              </Typography>
              <IconButton
                size="small"
                onClick={() => handleRemoveSection(sectionIndex)}
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
            />

            <TextField
              fullWidth
              label="Content"
              value={typeof section.text === "string" ? section.text : section.text.join("\n")}
              onChange={(e) =>
                handleSectionChange(sectionIndex, "text", e.target.value)
              }
              multiline
              rows={4}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={section.expandable || false}
                  onChange={(e) =>
                    handleSectionChange(sectionIndex, "expandable", e.target.checked)
                  }
                />
              }
              label="Expandable Section"
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="subtitle2">List Items</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleAddListItem(sectionIndex)}
                  startIcon={<AddIcon />}
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
                  />
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleRemoveListItem(sectionIndex, itemIndex)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );

  const renderQuestions = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
      {editedModule.questions?.map((question, questionIndex) => (
        <Paper
          key={questionIndex}
          elevation={1}
          sx={{
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Question {questionIndex + 1}
              </Typography>
              <IconButton
                size="small"
                onClick={() => {
                  setEditedModule((prev) => ({
                    ...prev,
                    questions: prev.questions.filter((_, i) => i !== questionIndex),
                  }));
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
            />

            <Typography variant="subtitle2">Options</Typography>
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
                      updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
                      return { ...prev, questions: updatedQuestions };
                    });
                  }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={question.correctAnswer === optionIndex}
                      onChange={() => {
                        setEditedModule((prev) => {
                          const updatedQuestions = [...prev.questions];
                          updatedQuestions[questionIndex].correctAnswer = optionIndex;
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
                      updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.filter(
                        (_, i) => i !== optionIndex
                      );
                      if (updatedQuestions[questionIndex].correctAnswer === optionIndex) {
                        updatedQuestions[questionIndex].correctAnswer = 0;
                      }
                      return { ...prev, questions: updatedQuestions };
                    });
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
                    options: [...updatedQuestions[questionIndex].options, ""]
                  };
                  return { ...prev, questions: updatedQuestions };
                });
              }}
              startIcon={<AddIcon />}
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
      >
        Add Question
      </Button>
    </Box>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Edit Module
          </Typography>
          {activeStep === 0 && (
            <Button
              variant="contained"
              onClick={handleAddSection}
              startIcon={<AddIcon />}
            >
              Add Section
            </Button>
          )}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 4, mt: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 ? renderModuleContent() : renderQuestions()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button onClick={handleSave} variant="contained">
              Save Changes
            </Button>
          ) : (
            <Button onClick={handleNext} variant="contained">
              Next
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
} 