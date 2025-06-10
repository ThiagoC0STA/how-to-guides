"use client";

import { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Container,
  Breadcrumbs,
  Link,
  Typography,
} from "@mui/material";
import GuideSidebar from "@/components/GuideSidebar";
import ModuleContent from "@/components/ModuleContent";
import ModuleNavigation from "@/components/ModuleNavigation";
import LockedModuleOverlay from "@/components/LockedModuleOverlay";
import GuideHero from "@/components/GuideHero";
import GuideOverview from "@/components/GuideOverview";
import LeadMagnetKit from "./LeadMagnetKit";
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentModule, setCurrentModule] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<{
    [key: number]: boolean[];
  }>({});

  const modules = guide.modules || [];
  const isLocked = modules[currentModule]?.locked && !unlocked;
  const progress =
    modules.length > 0
      ? Math.floor((completedModules.length / modules.length) * 100)
      : 0;
  const current = modules[currentModule];

  const guideColor = guide.color || "#134CCD";
  const guideColorRgb = hexToRgb(guideColor);

  function handleQuestionSuccess(qIdx: number) {
    setCompletedQuestions((prev) => {
      const arr = prev[currentModule] ? [...prev[currentModule]] : [];
      arr[qIdx] = true;
      return { ...prev, [currentModule]: arr };
    });
  }

  const allQuestionsCorrect = useMemo(() => {
    if (!current?.questions || current.questions.length === 0) return true;
    const moduleQuestions = completedQuestions[currentModule] || [];
    return (
      moduleQuestions.length === current.questions.length &&
      moduleQuestions.every(Boolean)
    );
  }, [completedQuestions, current?.questions, currentModule]);

  useMemo(() => {
    if (allQuestionsCorrect && !completedModules.includes(currentModule)) {
      setCompletedModules((prev) =>
        Array.from(new Set([...prev, currentModule]))
      );
    }
  }, [allQuestionsCorrect, currentModule, completedModules]);

  const overview = guide?.metadata?.overview;

  // Função para gerar os breadcrumbs baseado no pathname e searchParams
  const getBreadcrumbs = () => {
    const breadcrumbs = [];
    const from = searchParams.get("from");

    // Sempre adiciona Home como primeiro item
    breadcrumbs.push({
      label: "Home",
      href: "/",
    });

    // Adiciona o caminho baseado no parâmetro 'from'
    if (from === "dashboard") {
      breadcrumbs.push({
        label: "Dashboard",
        href: "/administrador",
      });
      breadcrumbs.push({
        label: "Guides",
        href: "/administrador/guides",
      });
    } else if (from === "categories") {
      const categoryId = searchParams.get("categoryId");
      breadcrumbs.push({
        label: "Categories",
        href: "/categories",
      });
      if (categoryId) {
        breadcrumbs.push({
          label: "Category",
          href: `/categories/${categoryId}`,
        });
      }
    } else if (from === "guides") {
      const returnCategory = searchParams.get("returnCategory");
      breadcrumbs.push({
        label: "Guides",
        href: `/guides${returnCategory ? `?category=${returnCategory}` : ""}`,
      });
    }

    // Adiciona o título do guia atual
    breadcrumbs.push({
      label: guide.title,
      href: pathname,
      isCurrent: true,
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <Container
      maxWidth="lg"
      sx={{ backgroundColor: "var(--background)", px: { xs: 2, md: 4 } }}
    >
      <Breadcrumbs
        sx={{
          mt: 4,
          mb: 2,
          "& .MuiBreadcrumbs-separator": {
            color: "var(--footer-text)",
          },
        }}
      >
        {breadcrumbs.map((crumb, index) =>
          crumb.isCurrent ? (
            <Typography
              key={index}
              color="var(--foreground)"
              sx={{ fontWeight: 500 }}
            >
              {crumb.label}
            </Typography>
          ) : (
            <Link
              key={index}
              component={NextLink}
              href={crumb.href}
              underline="hover"
              sx={{
                color: "var(--footer-text)",
                "&:hover": {
                  color: "var(--primary-blue)",
                },
              }}
            >
              {crumb.label}
            </Link>
          )
        )}
      </Breadcrumbs>

      <GuideHero
        title={guide.title}
        description={guide.description}
        lastUpdated={guide.lastUpdated}
        image={guide.image}
      />
      {overview && (
        <GuideOverview
          title={"Guide Overview"}
          description={overview.description}
          bullets={overview.bullets}
          guideColor={guideColor}
          guideColorRgb={guideColorRgb}
        />
      )}
      <LeadMagnetKit />
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={{ xs: 3, md: 4 }}
        alignItems={{ xs: "stretch", md: "flex-start" }}
        mx="auto"
        my={{ xs: 4, md: 6 }}
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
          sx={{
            width: { xs: "100%", md: 320 },
            position: { xs: "sticky", md: "static" },
            top: { xs: 16, md: "auto" },
            zIndex: 1,
          }}
        />
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            borderRadius: 3,
            p: { xs: 3, md: 5 },
            border: "1.5px solid",
            borderColor: "grey.200",
            bgcolor: "#fff",
            minHeight: { xs: "auto", md: 600 },
            width: "100%",
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
    </Container>
  );
}
