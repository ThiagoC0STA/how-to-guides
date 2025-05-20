import { Box, Container, Typography, Paper } from "@mui/material";

export default function IntroSection() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 4,
          background: "var(--card-bg)",
          border: "1px solid",
          borderColor: "var(--primary-blue)15",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle at top right, var(--primary-blue)08 0%, transparent 60%)",
            zIndex: 0,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle at bottom left, var(--primary-red)08 0%, transparent 60%)",
            zIndex: 0,
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 28, md: 36 },
              fontWeight: 800,
              mb: 3,
              color: "var(--foreground)",
              textAlign: "center",
              letterSpacing: -0.5,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -12,
                left: "50%",
                transform: "translateX(-50%)",
                width: 60,
                height: 4,
                background: "linear-gradient(90deg, var(--primary-blue) 0%, var(--primary-red) 100%)",
                borderRadius: 2,
              },
            }}
          >
            Essential AI Resources
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "var(--footer-text)",
              fontSize: { xs: 16, md: 18 },
              lineHeight: 1.8,
              textAlign: "center",
              maxWidth: 800,
              mx: "auto",
              mb: 3,
            }}
          >
            Our collection of AI resources is designed to help you navigate the complex world of artificial intelligence tools and techniques.
            Whether you&apos;re looking for definitions of AI terminology, prompt engineering templates, or detailed comparisons of AI models,
            you&apos;ll find everything you need to enhance your AI skills and knowledge.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "var(--footer-text)",
              fontSize: { xs: 16, md: 18 },
              lineHeight: 1.8,
              textAlign: "center",
              maxWidth: 800,
              mx: "auto",
            }}
          >
            These resources complement our comprehensive how-to guides, providing additional context and reference materials
            to deepen your understanding of AI concepts and improve your practical skills.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
} 