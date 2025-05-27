import { Box, Button } from "@mui/material";

interface ModuleNavigationProps {
  currentModule: number;
  totalModules: number;
  allQuestionsCorrect: boolean;
  guideColor: string;
  guideColorRgb: string;
  onPrevious: () => void;
  onNext: () => void;
}

export default function ModuleNavigation({
  currentModule,
  totalModules,
  allQuestionsCorrect,
  guideColor,
  guideColorRgb,
  onPrevious,
  onNext,
}: ModuleNavigationProps) {
  return (
    <Box mt={3} display="flex" gap={2}>
      {currentModule > 0 && (
        <Button
          variant="outlined"
          onClick={onPrevious}
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
          Back
        </Button>
      )}
      {currentModule < totalModules - 1 && (
        <Button
          variant="contained"
          color="primary"
          disabled={!allQuestionsCorrect}
          onClick={onNext}
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
          Next
        </Button>
      )}
    </Box>
  );
} 