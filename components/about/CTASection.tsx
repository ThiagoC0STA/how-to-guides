import { Box, Typography, Stack, Button, Paper } from "@mui/material";
import Link from "next/link";
import { FaRocket, FaBook } from "react-icons/fa";

export default function CTASection() {
  return (
    <Box sx={{ mb: 8, py: { xs: 2, md: 4 } }}>
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
            background:
              "radial-gradient(circle at top right, var(--primary-blue)08 0%, transparent 60%)",
            zIndex: 0,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(circle at bottom left, var(--primary-red)08 0%, transparent 60%)",
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
              mb: 2,
              color: "var(--foreground)",
              textAlign: "center",
              letterSpacing: -0.5,
            }}
          >
            Ready to Master AI?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "var(--footer-text)",
              fontSize: { xs: 16, md: 18 },
              lineHeight: 1.8,
              mb: 5,
              maxWidth: 600,
              mx: "auto",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            Explore our comprehensive guides and resources to start your AI
            journey today.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              component={Link}
              href="/guides"
              variant="contained"
              size="large"
              startIcon={<FaRocket />}
              sx={{
                bgcolor: "var(--primary-blue)",
                color: "#fff",
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                minWidth: { xs: "100%", sm: 240 },
                boxShadow: "0 4px 20px 0 rgba(37,99,235,0.2)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                  transform: "translateX(-100%)",
                  transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                },
                "&:hover": {
                  bgcolor: "var(--primary-blue-dark)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 32px 0 rgba(37,99,235,0.3)",
                  "&::before": {
                    transform: "translateX(100%)",
                  },
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Browse AI Guides
            </Button>
            <Button
              component={Link}
              href="/resources"
              variant="outlined"
              size="large"
              startIcon={<FaBook />}
              sx={{
                borderColor: "var(--primary-blue)",
                color: "var(--primary-blue)",
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                minWidth: { xs: "100%", sm: 240 },
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(45deg, transparent 0%, rgba(37,99,235,0.05) 50%, transparent 100%)",
                  transform: "translateX(-100%)",
                  transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                },
                "&:hover": {
                  borderColor: "var(--primary-blue-dark)",
                  color: "var(--primary-blue-dark)",
                  bgcolor: "rgba(37,99,235,0.08)",
                  transform: "translateY(-2px)",
                  "&::before": {
                    transform: "translateX(100%)",
                  },
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Explore Resources
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
