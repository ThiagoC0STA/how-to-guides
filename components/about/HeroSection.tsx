import { Box, Container, Typography } from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      sx={{
        pt: { xs: 8, md: 12 },
        pb: { xs: 6, md: 8 },
        textAlign: "center",
        background: "linear-gradient(180deg, var(--background) 0%, var(--card-bg) 100%)",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 36, md: 48 },
            fontWeight: 800,
            mb: 2,
            background: "linear-gradient(90deg, var(--primary-blue) 0%, var(--primary-red) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          About How-ToGuides.com
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "var(--footer-text)",
            fontWeight: 500,
            maxWidth: 800,
            mx: "auto",
          }}
        >
          Making AI accessible through comprehensive, step-by-step guides
        </Typography>
      </Container>
    </Box>
  );
} 