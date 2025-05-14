"use client";

import { useState, useMemo } from "react";
import { Box, Paper } from "@mui/material";
import GuideSidebar from "@/components/GuideSidebar";
import ModuleContent from "@/components/ModuleContent";
import ModuleNavigation from "@/components/ModuleNavigation";
import LockedModuleOverlay from "@/components/LockedModuleOverlay";

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

interface GuideLayoutProps {
  guide: any;
}

export default function GuideLayout({ guide }: GuideLayoutProps) {
  const [currentModule, setCurrentModule] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<{
    [key: number]: boolean[];
  }>({});

  const modules = guide.modules || [];
  const isLocked = modules[currentModule]?.locked && !unlocked;
  const progress = modules.length > 0 ? Math.floor((completedModules.length / modules.length) * 100) : 0;
  const current = modules[currentModule];

  const guideColor = guide.color || "#2563eb";
  const guideColorRgb = hexToRgb(guideColor);

  function handleQuestionSuccess(qIdx: number) {
    setCompletedQuestions((prev) => {
      const arr = prev[currentModule] ? [...prev[currentModule]] : [];
      arr[qIdx] = true;
      return { ...prev, [currentModule]: arr };
    });
  }

  const allQuestionsCorrect = useMemo(() => {
    if (!current.questions || current.questions.length === 0) return true;
    const arr = completedQuestions[currentModule] || [];
    return arr.length === current.questions.length && arr.every(Boolean);
  }, [completedQuestions, current.questions, currentModule]);

  useMemo(() => {
    if (allQuestionsCorrect && !completedModules.includes(currentModule)) {
      setCompletedModules((prev) => Array.from(new Set([...prev, currentModule])));
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
      <GuideSidebar
        modules={modules}
        currentModule={currentModule}
        completedModules={completedModules}
        progress={progress}
        guideColor={guideColor}
        guideColorRgb={guideColorRgb}
        unlocked={unlocked}
        onModuleClick={setCurrentModule}
      />
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
          <LockedModuleOverlay
            moduleTitle={current.title}
            onUnlock={() => setUnlocked(true)}
            onBack={() => setCurrentModule(currentModule - 1)}
            guideColor={guideColor}
            guideColorRgb={guideColorRgb}
          />
        ) : (
          <Box>
            <ModuleContent
              module={current}
              onQuestionSuccess={handleQuestionSuccess}
              completedQuestions={completedQuestions}
              guideColor={guideColor}
              guideColorRgb={guideColorRgb}
              moduleIndex={currentModule}
            />
            <ModuleNavigation
              currentModule={currentModule}
              totalModules={modules.length}
              allQuestionsCorrect={allQuestionsCorrect}
              guideColor={guideColor}
              guideColorRgb={guideColorRgb}
              onPrevious={() => setCurrentModule(currentModule - 1)}
              onNext={() => setCurrentModule(currentModule + 1)}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
} 