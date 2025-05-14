import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  Button,
  LinearProgress,
} from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";
import { SxProps, Theme } from "@mui/material/styles";

interface GuideSidebarProps {
  modules: any[];
  currentModule: number;
  completedModules: number[];
  progress: number;
  guideColor: string;
  guideColorRgb: string;
  unlocked: boolean;
  onModuleClick: (index: number) => void;
  sx?: SxProps<Theme>;
}

export default function GuideSidebar({
  modules,
  currentModule,
  completedModules,
  progress,
  guideColor,
  guideColorRgb,
  unlocked,
  onModuleClick,
  sx,
}: GuideSidebarProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: 320,
        borderRadius: 3,
        p: 3,
        border: "1.5px solid",
        borderColor: "grey.200",
        bgcolor: "#fff",
        minWidth: 260,
        ...sx,
      }}
    >
      <Typography variant="h5" fontWeight={800} mb={3}>
        Guide Modules
      </Typography>
      <Box mb={2}>
        <Typography variant="body2" color="text.secondary" mb={0.5}>
          Your Progress: {progress}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: `rgba(${guideColorRgb}, 0.1)`,
            "& .MuiLinearProgress-bar": {
              bgcolor: guideColor,
              borderRadius: 4,
            },
          }}
        />
      </Box>
      <List sx={{ p: 0 }}>
        {modules.map((mod, idx) => (
          <ListItem key={mod.title} disableGutters sx={{ mb: 1, p: 0 }}>
            <Button
              onClick={() => onModuleClick(idx)}
              disabled={
                (mod.locked && !unlocked) ||
                (idx > 0 &&
                  !completedModules.includes(idx - 1) &&
                  idx !== currentModule)
              }
              fullWidth
              variant="text"
              sx={{
                justifyContent: "space-between",
                textTransform: "none",
                fontWeight: idx === currentModule ? 700 : 500,
                fontSize: 16,
                borderRadius: 2,
                color: idx === currentModule ? guideColor : "var(--foreground)",
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
                completedModules.includes(idx) ? (
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
  );
}
