import { Box, Container, Typography, Paper } from "@mui/material";
import { FaRocket, FaBook, FaLightbulb } from "react-icons/fa";

export default function MissionSection() {
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
            Our Mission
          </Typography>

          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
            mt: 6,
            mb: 6
          }}>
            <Box sx={{ textAlign: "center" }}>
              <Box sx={{ 
                width: 80, 
                height: 80, 
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-blue-dark) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
                boxShadow: "0 4px 20px 0 rgba(37,99,235,0.2)",
              }}>
                <FaRocket size={32} color="#fff" />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: "var(--foreground)",
                  fontWeight: 700,
                  mb: 2,
                  fontSize: 20,
                }}
              >
                Accessibility
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--footer-text)",
                  lineHeight: 1.7,
                  fontSize: 15,
                }}
              >
                Making AI accessible to everyone, regardless of technical background or expertise.
              </Typography>
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Box sx={{ 
                width: 80, 
                height: 80, 
                borderRadius: "50%",
                background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
                boxShadow: "0 4px 20px 0 rgba(124,58,237,0.2)",
              }}>
                <FaBook size={32} color="#fff" />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: "var(--foreground)",
                  fontWeight: 700,
                  mb: 2,
                  fontSize: 20,
                }}
              >
                Education
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--footer-text)",
                  lineHeight: 1.7,
                  fontSize: 15,
                }}
              >
                Creating comprehensive, easy-to-follow guides that demystify AI tools and their applications.
              </Typography>
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Box sx={{ 
                width: 80, 
                height: 80, 
                borderRadius: "50%",
                background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
                boxShadow: "0 4px 20px 0 rgba(220,38,38,0.2)",
              }}>
                <FaLightbulb size={32} color="#fff" />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: "var(--foreground)",
                  fontWeight: 700,
                  mb: 2,
                  fontSize: 20,
                }}
              >
                Innovation
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--footer-text)",
                  lineHeight: 1.7,
                  fontSize: 15,
                }}
              >
                Staying at the forefront of AI technology to provide the most up-to-date and relevant content.
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="body1"
            sx={{
              color: "var(--footer-text)",
              fontSize: { xs: 16, md: 18 },
              lineHeight: 1.8,
              textAlign: "center",
              maxWidth: 800,
              mx: "auto",
              fontWeight: 500,
            }}
          >
            We're committed to creating the most thorough, accurate, and up-to-date tutorials for popular AI tools
            like ChatGPT, Midjourney, DALL-E, and Gemini AI. Our step-by-step approach ensures that beginners can
            get started quickly while also providing advanced techniques for experienced users.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
} 