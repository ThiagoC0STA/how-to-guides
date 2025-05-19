import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  FaCheckCircle,
  FaRobot,
  FaLightbulb,
  FaTools,
  FaChartLine,
  FaGraduationCap,
} from "react-icons/fa";

export default function IntroSection() {
  const features = [
    {
      icon: <FaCheckCircle color="#4CAF50" />,
      text: "Structure your prompts for maximum clarity and effectiveness",
    },
    {
      icon: <FaRobot color="#2196F3" />,
      text: "Use specialized techniques for different AI models",
    },
    {
      icon: <FaTools color="#FF9800" />,
      text: "Troubleshoot common prompt issues",
    },
    {
      icon: <FaChartLine color="#9C27B0" />,
      text: "Create consistent, high-quality outputs",
    },
    {
      icon: <FaGraduationCap color="#F44336" />,
      text: "Master advanced prompt engineering methods",
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 6 },
        mb: 6,
        borderRadius: 3,
        bgcolor: "background.default",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #2196F3, #9C27B0)",
        },
      }}
    >
      <Box
        sx={{
          mx: "auto",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            top: -100,
            right: -100,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(33,150,243,0.1) 0%, rgba(33,150,243,0) 70%)",
            zIndex: 0,
          },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: 3,
            fontSize: { xs: "1.8rem", md: "2.2rem" },
            fontWeight: 800,
            background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -0.5,
          }}
        >
          What is Prompt Engineering?
        </Typography>

        <Typography
          paragraph
          sx={{
            fontSize: { xs: "1.1rem", md: "1.2rem" },
            lineHeight: 1.7,
            color: "text.secondary",
            mb: 3,
          }}
        >
          Prompt engineering is the art and science of crafting effective
          instructions for AI models to get the best possible results. It's a
          crucial skill for anyone working with AI tools like ChatGPT,
          Midjourney, DALL-E, and Gemini AI.
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "1.1rem", md: "1.2rem" },
            fontWeight: 600,
            mb: 2,
            color: "text.primary",
          }}
        >
          Our comprehensive prompt engineering guides will teach you how to:
        </Typography>

        <List
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 1, md: 2 },
            mt: 2,
          }}
        >
          {features.map((feature, index) => (
            <ListItem
              key={index}
              sx={{
                bgcolor: "background.paper",
                borderRadius: 2,
                p: 2,
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{feature.icon}</ListItemIcon>
              <ListItemText
                primary={feature.text}
                primaryTypographyProps={{
                  sx: {
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "text.primary",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
}
