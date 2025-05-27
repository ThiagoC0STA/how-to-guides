import { Box, Paper, Container } from "@mui/material";
import { Guide } from "../types";
import GuideHero from "@/components/GuideHero";
import GuideOverview from "@/components/GuideOverview";
import GuideSidebar from "@/components/GuideSidebar";
import ModuleContent from "@/components/ModuleContent";
import ModuleNavigation from "@/components/ModuleNavigation";
import LeadMagnetKit from "@/components/LeadMagnetKit";

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

interface ReviewStepProps {
  formData: Partial<Guide>;
}

export default function ReviewStep({ formData }: ReviewStepProps) {
  const guideColor = formData.color || "var(--primary-blue)";
  const guideColorRgb = hexToRgb(guideColor);

  // Criar um objeto guide compatível com o layout
  const previewGuide = {
    ...formData,
    lastUpdated: new Date().toISOString().split("T")[0],
    overview: {
      title: "Guide Overview",
      description: formData.metadata?.overview?.text || "",
      bullets: formData.metadata?.overview?.bullets || [],
    },
  };

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
      <GuideHero
        title={formData.title || ""}
        description={formData.description || ""}
        lastUpdated={previewGuide.lastUpdated}
        image={formData.image || ""}
      />

      {formData.metadata?.overview?.text && (
        <GuideOverview
          title="Guide Overview"
          description={formData.metadata.overview.text}
          bullets={formData.metadata.overview.bullets}
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
          modules={formData.modules || []}
          currentModule={0}
          completedModules={[]}
          progress={0}
          guideColor={guideColor}
          guideColorRgb={guideColorRgb}
          unlocked={true}
          onModuleClick={() => {}}
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
            borderColor: "var(--footer-border)",
            bgcolor: "#fff",
            minHeight: { xs: "auto", md: 600 },
            width: "100%",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              borderColor: guideColor,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            },
          }}
        >
          {formData.modules?.[0] && (
            <Box>
              <ModuleContent
                module={formData.modules[0]}
                onQuestionSuccess={() => {}}
                completedQuestions={{}}
                guideColor={guideColor}
                guideColorRgb={guideColorRgb}
                moduleIndex={0}
              />
              <ModuleNavigation
                currentModule={0}
                totalModules={formData.modules.length}
                allQuestionsCorrect={true}
                guideColor={guideColor}
                guideColorRgb={guideColorRgb}
                onPrevious={() => {}}
                onNext={() => {}}
              />
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
