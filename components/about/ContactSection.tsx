import { Box, Typography, Stack, Button } from "@mui/material";
import { FaEnvelope, FaTwitter } from "react-icons/fa";

export default function ContactSection() {
  return (
    <Box sx={{ py: { xs: 2, md: 6 }, mb: { xs: 2, md: 6 } }}>
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
        Contact Us
      </Typography>
      <Box
        sx={{
          maxWidth: 800,
          mx: "auto",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, var(--primary-blue)08 0%, transparent 70%)",
            zIndex: 0,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, var(--primary-blue)08 0%, transparent 70%)",
            zIndex: 0,
          },
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "var(--footer-text)",
            fontSize: { xs: 16, md: 18 },
            lineHeight: 1.8,
            mb: 6,
            textAlign: "center",
            maxWidth: 600,
            mx: "auto",
            position: "relative",
          }}
        >
          Have questions, suggestions, or feedback about our guides? We'd love
          to hear from you!
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          justifyContent="center"
          alignItems="center"
          sx={{ position: "relative" }}
        >
          <Box
            sx={{
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: -20,
                left: -20,
                right: -20,
                bottom: -20,
                borderRadius: 3,
                background:
                  "linear-gradient(135deg, var(--primary-blue)08 0%, transparent 100%)",
                zIndex: -1,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                opacity: 0,
              },
              "&:hover::before": {
                opacity: 1,
              },
            }}
          >
            <Button
              startIcon={<FaEnvelope />}
              href="mailto:contact@how-toguides.com"
              variant="contained"
              sx={{
                bgcolor: "var(--primary-blue)",
                color: "#fff",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                minWidth: { xs: "100%", sm: 280 },
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
              contact@how-toguides.com
            </Button>
          </Box>
          <Box
            sx={{
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: -20,
                left: -20,
                right: -20,
                bottom: -20,
                borderRadius: 3,
                background:
                  "linear-gradient(135deg, var(--primary-blue)08 0%, transparent 100%)",
                zIndex: -1,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                opacity: 0,
              },
              "&:hover::before": {
                opacity: 1,
              },
            }}
          >
            <Button
              startIcon={<FaTwitter />}
              href="https://twitter.com/howtoguides"
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              sx={{
                borderColor: "var(--primary-blue)",
                color: "var(--primary-blue)",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                minWidth: { xs: "100%", sm: 280 },
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
              @howtoguides
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
