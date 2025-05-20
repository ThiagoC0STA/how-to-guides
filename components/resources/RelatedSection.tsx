import { Box, Typography, Button, Paper } from "@mui/material";
import Link from "next/link";
import { FaRocket, FaBook, FaLightbulb } from "react-icons/fa";

export default function RelatedSection() {
  return (
    <Box sx={{ mb: 8, py: { xs: 2, md: 4 } }}>
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
        Related Content
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            bgcolor: "var(--card-bg)",
            border: "1px solid",
            borderColor: "var(--primary-blue)15",
            textAlign: "center",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
              borderColor: "var(--primary-blue)",
            },
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-blue-dark) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
              boxShadow: "0 4px 20px 0 rgba(37,99,235,0.2)",
            }}
          >
            <FaRocket size={28} color="#fff" />
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
            AI Guides
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "var(--footer-text)",
              lineHeight: 1.7,
              mb: 3,
              fontSize: 15,
            }}
          >
            Step-by-step tutorials for popular AI tools like ChatGPT, Midjourney, and DALL-E
          </Typography>
          <Link href="/guides" passHref>
            <Button
              component="a"
              variant="outlined"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                py: 1,
                borderColor: "divider",
                color: "text.secondary",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "var(--primary-blue)",
                  color: "var(--primary-blue)",
                  bgcolor: "var(--primary-blue)08",
                },
              }}
            >
              Browse AI Guides
            </Button>
          </Link>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            bgcolor: "var(--card-bg)",
            border: "1px solid",
            borderColor: "var(--primary-red)15",
            textAlign: "center",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
              borderColor: "var(--primary-red)",
            },
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--primary-red) 0%, var(--primary-red-dark) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
              boxShadow: "0 4px 20px 0 rgba(220,38,38,0.2)",
            }}
          >
            <FaLightbulb size={28} color="#fff" />
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
            Prompt Engineering
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "var(--footer-text)",
              lineHeight: 1.7,
              mb: 3,
              fontSize: 15,
            }}
          >
            Learn how to craft effective prompts for different AI models and use cases
          </Typography>
          <Link href="/prompt-engineering" passHref>
            <Button
              component="a"
              variant="outlined"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                py: 1,
                borderColor: "divider",
                color: "text.secondary",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "var(--primary-red)",
                  color: "var(--primary-red)",
                  bgcolor: "var(--primary-red)08",
                },
              }}
            >
              Explore Prompt Engineering
            </Button>
          </Link>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            bgcolor: "var(--card-bg)",
            border: "1px solid",
            borderColor: "var(--primary-purple)15",
            textAlign: "center",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
              borderColor: "var(--primary-purple)",
            },
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-purple-dark) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
              boxShadow: "0 4px 20px 0 rgba(124,58,237,0.2)",
            }}
          >
            <FaBook size={28} color="#fff" />
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
            About How-ToGuides.com
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "var(--footer-text)",
              lineHeight: 1.7,
              mb: 3,
              fontSize: 15,
            }}
          >
            Learn more about our mission to make AI accessible through comprehensive guides
          </Typography>
          <Link href="/about" passHref>
            <Button
              component="a"
              variant="outlined"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                py: 1,
                borderColor: "divider",
                color: "text.secondary",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "var(--primary-purple)",
                  color: "var(--primary-purple)",
                  bgcolor: "var(--primary-purple)08",
                },
              }}
            >
              About Us
            </Button>
          </Link>
        </Paper>
      </Box>
    </Box>
  );
} 