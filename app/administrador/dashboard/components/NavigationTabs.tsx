"use client";

import { Button, Paper, useTheme } from "@mui/material";

interface NavigationTabsProps {
  sections: {
    id: string;
    label: string;
  }[];
  selectedSection: string;
  onSectionChange: (section: string) => void;
}

export default function NavigationTabs({
  sections,
  selectedSection,
  onSectionChange,
}: NavigationTabsProps) {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        display: "inline-flex",
        gap: 1,
        p: 1,
        backgroundColor: theme.palette.background.default,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      {sections.map((section) => (
        <Button
          key={section.id}
          variant={selectedSection === section.id ? "contained" : "text"}
          onClick={() => onSectionChange(section.id)}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            py: 1,
            minWidth: "120px",
            transition: "all 0.2s ease",
            letterSpacing: "0.3px",
            fontSize: "0.95rem",
            ...(selectedSection === section.id
              ? {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  boxShadow: `0 2px 8px ${theme.palette.primary.main}40`,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: `0 4px 12px ${theme.palette.primary.main}60`,
                    transform: "translateY(-1px)",
                  },
                }
              : {
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    color: theme.palette.text.primary,
                    transform: "translateY(-1px)",
                  },
                }),
          }}
        >
          {section.label}
        </Button>
      ))}
    </Paper>
  );
} 