import { Box, Typography, Stack } from "@mui/material";

const approachSteps = [
  {
    number: 1,
    title: "Research & Testing",
    description:
      "We thoroughly research each AI tool and test all features extensively before creating our guides. This hands-on approach ensures we understand the nuances and can anticipate common challenges.",
  },
  {
    number: 2,
    title: "Structured Learning Path",
    description:
      "Our guides follow a logical progression from basic to advanced concepts, allowing readers to build their skills step by step. We include clear objectives at each stage so you know what you'll be able to accomplish.",
  },
  {
    number: 3,
    title: "Visual Documentation",
    description:
      "We include detailed screenshots, diagrams, and visual examples to illustrate key concepts and interface elements. Visual learners can follow along easily, and everyone benefits from seeing exactly what to expect.",
  },
  {
    number: 4,
    title: "Practical Examples",
    description:
      "Every guide includes real-world examples and use cases to help you apply what you've learned. We show you not just the 'how' but also the 'why' and 'when' to use specific features.",
  },
  {
    number: 5,
    title: "Regular Updates",
    description:
      "AI tools evolve rapidly. We continuously monitor changes and update our guides to ensure they remain accurate and relevant. Our revision history shows when content was last updated.",
  },
];

export default function ApproachSection() {
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
        Our Approach
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "var(--footer-text)",
          fontSize: { xs: 16, md: 18 },
          lineHeight: 1.8,
          textAlign: "center",
          mb: 4,
          maxWidth: 800,
          mx: "auto",
        }}
      >
        What sets How-ToGuides.com apart is our structured, comprehensive approach to creating AI tutorials:
      </Typography>
      <Stack spacing={6}>
        {approachSteps.map((step, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              gap: 4,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 32,
                bottom: 0,
                width: 2,
                background: "linear-gradient(180deg, var(--primary-blue) 0%, transparent 100%)",
                opacity: 0.2,
              },
              "&:last-child::before": {
                height: "50%",
              },
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-blue-dark) 100%)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 28,
                flexShrink: 0,
                position: "relative",
                zIndex: 1,
                boxShadow: "0 4px 20px 0 rgba(37,99,235,0.2)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0 8px 32px 0 rgba(37,99,235,0.3)",
                },
              }}
            >
              {step.number}
            </Box>
            <Box
              sx={{
                flex: 1,
                pt: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "var(--foreground)",
                  fontWeight: 800,
                  mb: 1.5,
                  fontSize: 20,
                  display: "inline-block",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                    width: "100%",
                    height: 2,
                    background: "linear-gradient(90deg, var(--primary-blue) 0%, transparent 100%)",
                    opacity: 0.5,
                  },
                }}
              >
                {step.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--footer-text)",
                  lineHeight: 1.7,
                  fontSize: 15,
                }}
              >
                {step.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
} 