"use client";

import { notFound } from "next/navigation";
import { GUIDES } from "@/data/guides";
import { useState, useMemo } from "react";
import { FaCheckCircle } from "react-icons/fa";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  Button,
  Chip,
  LinearProgress,
  Divider,
  TextField,
} from "@mui/material";
import ExpandableSection from "@/components/ExpandableSection";
import KnowledgeCheck from "@/components/KnowledgeCheck";

function hexToRgb(hex: string) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((x) => x + x)
      .join("");
  }
  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255].join(", ");
}

function ModuleContent({
  module,
  onQuestionSuccess,
  completedQuestions,
  guideColor,
  guideColorRgb,
}: any) {
  return (
    <Box>
      <Typography variant="h3" fontWeight={800} mb={3}>
        {module.title}
      </Typography>
      {module.content &&
        module.content.sections &&
        module.content.sections.map((section: any, i: number) => {
          if (section.expandable) {
            return (
              <ExpandableSection
                key={i}
                title={section.heading}
                guideColor={guideColor}
              >
                <Typography variant="body1" mb={section.list ? 1 : 2}>
                  {section.text}
                </Typography>
                {section.list && (
                  <List
                    sx={{
                      pl: 3,
                      mb: 1,
                      listStyleType: "disc",
                      listStylePosition: "inside",
                    }}
                  >
                    {section.list.map((item: string, j: number) => (
                      <ListItem
                        key={j}
                        sx={{
                          display: "list-item",
                          pl: 0,
                          py: 0,
                          listStyleType: "inherit",
                        }}
                      >
                        {item}
                      </ListItem>
                    ))}
                  </List>
                )}
                {section.note && (
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    <em>{section.note}</em>
                  </Typography>
                )}
              </ExpandableSection>
            );
          }
          return (
            <Box key={i} mb={2}>
              <Typography variant="h5" fontWeight={700} mb={1.5}>
                {section.heading}
              </Typography>
              <Typography variant="body1" mb={section.list ? 1 : 2}>
                {section.text}
              </Typography>
              {section.list && (
                <List sx={{ pl: 3, mb: 1 }}>
                  {section.list.map((item: string, j: number) => (
                    <ListItem key={j} sx={{ display: "list-item", pl: 0 }}>
                      {item}
                    </ListItem>
                  ))}
                </List>
              )}
              {section.note && (
                <Typography variant="body2" color="text.secondary" mt={1}>
                  <em>{section.note}</em>
                </Typography>
              )}
            </Box>
          );
        })}
      {module.questions &&
        module.questions.length > 0 &&
        module.questions.map((q: any, idx: number) => (
          <KnowledgeCheck
            key={idx}
            question={q.question}
            options={q.options}
            correctAnswer={q.correctAnswer}
            onSuccess={() => onQuestionSuccess(idx)}
            guideColor={guideColor}
            guideColorRgb={guideColorRgb}
          />
        ))}
    </Box>
  );
}

export default function GuidePage({ params }: { params: { id: string } }) {
  const guide = GUIDES.find((g) => g.id === params.id);
  const [currentModule, setCurrentModule] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<{
    [key: number]: boolean[];
  }>({});

  if (!guide) return notFound();

  const modules = guide.modules || [];
  const isLocked = modules[currentModule]?.locked && !unlocked;
  const progress = Math.floor((completedModules.length / modules.length) * 100);
  const current = modules[currentModule];

  const guideColor = guide.color || "#2563eb";
  const guideColorRgb = hexToRgb(guideColor);

  // Handler para marcar perguntas como respondidas corretamente
  function handleQuestionSuccess(qIdx: number) {
    setCompletedQuestions((prev) => {
      const arr = prev[currentModule] ? [...prev[currentModule]] : [];
      arr[qIdx] = true;
      return { ...prev, [currentModule]: arr };
    });
  }

  // Verifica se todas as perguntas do módulo atual foram respondidas corretamente
  const allQuestionsCorrect = useMemo(() => {
    if (!current.questions || current.questions.length === 0) return true;
    const arr = completedQuestions[currentModule] || [];
    return arr.length === current.questions.length && arr.every(Boolean);
  }, [completedQuestions, current.questions, currentModule]);

  // Marcar módulo como completo ao acertar todas as perguntas
  useMemo(() => {
    if (allQuestionsCorrect && !completedModules.includes(currentModule)) {
      setCompletedModules((prev) => [...prev, currentModule]);
    }
  }, [allQuestionsCorrect, currentModule, completedModules]);

  return (
    <Box
      display="flex"
      gap={4}
      alignItems="flex-start"
      maxWidth={1300}
      mx="auto"
      my={6}
      px={2}
    >
      {/* Sidebar */}
      <Paper
        elevation={2}
        sx={{
          width: 320,
          borderRadius: 3,
          p: 3,
          border: "1.5px solid",
          borderColor: "grey.200",
          bgcolor: "#fff",
          minWidth: 260,
        }}
      >
        <Typography variant="h5" fontWeight={800} mb={3}>
          Guide Modules
        </Typography>
        <Box mb={2}>
          <Typography variant="body2" color="text.secondary" mb={0.5}>
            Your Progress: {progress}%
          </Typography>
        </Box>
        <List sx={{ p: 0 }}>
          {modules.map((mod, idx) => (
            <ListItem key={mod.title} disableGutters sx={{ mb: 1, p: 0 }}>
              <Button
                onClick={() =>
                  completedModules.includes(idx) || idx === currentModule
                    ? setCurrentModule(idx)
                    : null
                }
                disabled={
                  (mod.locked && !unlocked) ||
                  (!completedModules.includes(idx) && idx !== currentModule)
                }
                fullWidth
                variant="text"
                sx={{
                  justifyContent: "space-between",
                  textTransform: "none",
                  fontWeight: idx === currentModule ? 700 : 500,
                  fontSize: 16,
                  borderRadius: 2,
                  color:
                    idx === currentModule ? guideColor : "var(--foreground)",
                  background:
                    idx === currentModule
                      ? `rgba(${guideColorRgb}, 0.08)`
                      : "transparent",
                  boxShadow: "none",
                  border: "none",
                  px: 2,
                  py: 1.5,
                  minHeight: 48,
                  opacity: mod.locked && !unlocked ? 0.5 : 1,
                  "&:hover": {
                    background:
                      idx === currentModule
                        ? `rgba(${guideColorRgb}, 0.13)`
                        : "var(--footer-bg, #f2f3f5)",
                  },
                  alignItems: "center",
                  transition: "background 0.18s",
                }}
                endIcon={
                  completedModules.includes(idx) && idx !== currentModule ? (
                    <FaCheckCircle
                      style={{
                        color: guideColor,
                        fontSize: 20,
                        marginLeft: 8,
                      }}
                    />
                  ) : null
                }
              >
                <span style={{ flex: 1, textAlign: "left" }}>
                  {idx + 1}. {mod.title}
                </span>
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
      {/* Conteúdo do módulo */}
      <Paper
        elevation={2}
        sx={{
          flex: 1,
          borderRadius: 3,
          p: 5,
          border: "1.5px solid",
          borderColor: "grey.200",
          bgcolor: "#fff",
          minHeight: 600,
        }}
      >
        {isLocked ? (
          <Box>
            <Typography variant="h5" fontWeight={700} mb={2}>
              Este módulo está bloqueado
            </Typography>
            <Typography variant="body1" mb={2}>
              Para acessar todos os módulos, insira seu e-mail abaixo:
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                setUnlocked(true);
              }}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: 320,
              }}
            >
              <TextField
                type="email"
                required
                label="Seu e-mail"
                size="medium"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ fontWeight: 700, fontSize: 16, py: 1.5 }}
              >
                Desbloquear módulos
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <ModuleContent
              module={current}
              onQuestionSuccess={(qIdx: number) => handleQuestionSuccess(qIdx)}
              completedQuestions={completedQuestions[currentModule] || []}
              guideColor={guideColor}
              guideColorRgb={guideColorRgb}
            />
            <Box mt={3} display="flex" gap={2}>
              {currentModule > 0 && (
                <Button
                  variant="outlined"
                  onClick={() => setCurrentModule(currentModule - 1)}
                  sx={{
                    bgcolor: guideColor,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 16,
                    py: 1,
                    px: 3,
                    boxShadow: `0 2px 8px 0 rgba(${guideColorRgb}, 0.10)`,
                    textTransform: "none",
                    border: "none",
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: guideColor,
                      filter: "brightness(1.08)",
                      boxShadow: `0 4px 16px 0 rgba(${guideColorRgb}, 0.18)`,
                      transform: "scale(1.04)",
                      transition: "all 0.18s ease-in-out",
                    },
                    "&.Mui-disabled": {
                      bgcolor: `rgba(${guideColorRgb}, 0.18)`,
                      color: "#fff",
                    },
                  }}
                >
                  Anterior
                </Button>
              )}
              {currentModule < modules.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!allQuestionsCorrect}
                  onClick={() => setCurrentModule(currentModule + 1)}
                  sx={{
                    bgcolor: guideColor,
                    color: "#fff",
                    border: "none",
                    fontWeight: 700,
                    fontSize: 16,
                    py: 1,
                    px: 3,
                    boxShadow: `0 2px 8px 0 rgba(${guideColorRgb}, 0.10)`,
                    textTransform: "none",
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: guideColor,
                      filter: "brightness(1.08)",
                      boxShadow: `0 4px 16px 0 rgba(${guideColorRgb}, 0.18)`,
                      transform: "scale(1.04)",
                      transition: "all 0.18s ease-in-out",
                    },
                    "&.Mui-disabled": {
                      bgcolor: `rgba(${guideColorRgb}, 0.18)`,
                      color: "#fff",
                    },
                  }}
                >
                  Próximo
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
