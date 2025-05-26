import { Box, Typography, Paper } from "@mui/material";

const values = [
  {
    title: "Accessibility",
    description:
      "We believe AI should be accessible to everyone. Our guides use clear language, avoid unnecessary jargon, and break down complex concepts into digestible steps.",
    color: "#134CCD",
  },
  {
    title: "Thoroughness",
    description:
      "We don't just scratch the surface. Our guides are comprehensive, covering everything from basic concepts to advanced techniques, troubleshooting, and best practices.",
    color: "#7c3aed",
  },
  {
    title: "Accuracy",
    description:
      "We rigorously test all our guides to ensure they're accurate and up-to-date. When AI tools change, we promptly update our content to reflect the latest features and interfaces.",
    color: "#059669",
  },
  {
    title: "Practicality",
    description:
      "Our guides focus on practical applications and real-world use cases. We help you understand not just how to use AI tools, but how to apply them to solve problems and enhance your work.",
    color: "#dc2626",
  },
];

export default function ValuesSection() {
  return (
    <Box sx={{ mb: 8 }}>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: 28, md: 36 },
          fontWeight: 700,
          mb: 4,
          textAlign: "center",
          color: "var(--foreground)",
        }}
      >
        Our Values
      </Typography>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { 
          xs: '1fr', 
          md: 'repeat(2, 1fr)' 
        }, 
        gap: 3,
        maxWidth: 1200,
        mx: 'auto',
        px: { xs: 2, md: 4 }
      }}>
        {values.map((value, index) => (
          <Box key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: "100%",
                borderRadius: 4,
                background: `linear-gradient(135deg, ${value.color}08 0%, ${value.color}15 100%)`,
                border: "1px solid",
                borderColor: `${value.color}20`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: `0 12px 40px 0 ${value.color}20`,
                  borderColor: `${value.color}40`,
                  "& .value-icon": {
                    transform: "scale(1.1)",
                    opacity: 0.2,
                  },
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: 4,
                  background: `linear-gradient(90deg, ${value.color} 0%, ${value.color}80 100%)`,
                },
              }}
            >
              <Box
                className="value-icon"
                sx={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${value.color}20 0%, ${value.color}10 100%)`,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  opacity: 0.1,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: value.color,
                  fontWeight: 800,
                  mb: 2,
                  fontSize: 20,
                  position: "relative",
                }}
              >
                {value.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--footer-text)",
                  lineHeight: 1.7,
                  position: "relative",
                  fontSize: 15,
                }}
              >
                {value.description}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>
    </Box>
  );
} 