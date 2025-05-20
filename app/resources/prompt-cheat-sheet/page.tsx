"use client";

import { useState, useMemo } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { FaSearch, FaCopy } from "react-icons/fa";
import Link from "next/link";
import { promptTemplates } from "@/data/prompts";

export default function PromptCheatSheet() {
  const [activeTab, setActiveTab] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");
  const [copyNotification, setCopyNotification] = useState(false);

  const tabs = [
    { id: "general", name: "General Techniques" },
    { id: "chatgpt", name: "ChatGPT" },
    { id: "gemini", name: "Gemini AI" },
    { id: "midjourney", name: "Midjourney" },
    { id: "dalle", name: "DALL-E" },
  ];

  const filteredPrompts = useMemo(() => {
    return promptTemplates[activeTab].filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.template.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.example.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activeTab, searchTerm]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyNotification(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 36, md: 48 },
            fontWeight: 800,
            mb: 2,
            background:
              "linear-gradient(90deg, var(--primary-blue) 0%, var(--primary-red) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Prompt Engineering Cheat Sheet
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "var(--footer-text)",
            fontWeight: 500,
            maxWidth: 800,
            mx: "auto",
            mb: 4,
          }}
        >
          Quick reference guide for crafting effective prompts across different
          AI tools
        </Typography>

        <TextField
          fullWidth
          placeholder="Search prompt templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch color="#666" />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: 600,
            mx: "auto",
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              bgcolor: "background.paper",
              "& fieldset": {
                borderColor: "divider",
              },
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
        />
      </Box>

      {/* Filter Tabs */}
      <Box sx={{ mb: 6, display: "flex", justifyContent: "center" }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTabs-indicator": {
              background:
                "linear-gradient(90deg, var(--primary-blue) 0%, var(--primary-red) 100%)",
            },
            "& .MuiTabs-flexContainer": {
              justifyContent: "center",
            },
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              value={tab.id}
              label={tab.name}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
                color: "text.secondary",
                "&.Mui-selected": {
                  color: "text.primary",
                },
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Prompts Section */}
      {filteredPrompts.length > 0 ? (
        <Box sx={{ mb: 6 }}>
          {filteredPrompts.map((prompt, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 4,
                mb: 4,
                borderRadius: 3,
                bgcolor: "var(--card-bg)",
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                  borderColor: "primary.main",
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: "var(--foreground)",
                }}
              >
                {prompt.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "var(--footer-text)",
                  mb: 3,
                  lineHeight: 1.7,
                }}
              >
                {prompt.description}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    color: "var(--foreground)",
                  }}
                >
                  Template:
                </Typography>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: "var(--card-bg)",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ position: "relative", pr: 4 }}>
                    <Typography
                      component="pre"
                      sx={{
                        fontFamily: "monospace",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        mb: 0,
                      }}
                    >
                      {prompt.template}
                    </Typography>
                    <IconButton
                      onClick={() => handleCopy(prompt.template)}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        right: 0,
                        transform: "translateY(-50%)",
                        color: "text.secondary",
                        "&:hover": {
                          color: "primary.main",
                        },
                      }}
                    >
                      <FaCopy />
                    </IconButton>
                  </Box>
                </Paper>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    color: "var(--foreground)",
                  }}
                >
                  Example:
                </Typography>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: "var(--card-bg)",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ position: "relative", pr: 4 }}>
                    <Typography
                      component="pre"
                      sx={{
                        fontFamily: "monospace",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        mb: 0,
                      }}
                    >
                      {prompt.example}
                    </Typography>
                    <IconButton
                      onClick={() => handleCopy(prompt.example)}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        right: 0,
                        transform: "translateY(-50%)",
                        color: "text.secondary",
                        "&:hover": {
                          color: "primary.main",
                        },
                      }}
                    >
                      <FaCopy />
                    </IconButton>
                  </Box>
                </Paper>
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    color: "var(--foreground)",
                  }}
                >
                  Tips:
                </Typography>
                <Box
                  component="ul"
                  sx={{
                    pl: 2,
                    mb: 0,
                    "& li": {
                      color: "var(--footer-text)",
                      mb: 1,
                      lineHeight: 1.7,
                    },
                  }}
                >
                  {prompt.tips.map((tip, i) => (
                    <Typography component="li" key={i}>
                      {tip}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            bgcolor: "var(--card-bg)",
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: "var(--foreground)" }}>
            No prompt templates found
          </Typography>
          <Typography sx={{ mb: 3, color: "var(--footer-text)" }}>
            Try adjusting your search terms or filters to find what you&apos;re
            looking for.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setSearchTerm("")}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              py: 1,
            }}
          >
            Reset Search
          </Button>
        </Box>
      )}

      {/* Related Resources */}
      <Box sx={{ mt: 8 }}>
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
          Related Resources
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
            <Typography
              variant="h6"
              sx={{
                color: "var(--foreground)",
                fontWeight: 700,
                mb: 2,
                fontSize: 20,
              }}
            >
              AI Terminology Glossary
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
              Comprehensive definitions of key AI terms and concepts
            </Typography>
            <Link href="/resources/ai-glossary" passHref>
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
                View Glossary
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
            <Typography
              variant="h6"
              sx={{
                color: "var(--foreground)",
                fontWeight: 700,
                mb: 2,
                fontSize: 20,
              }}
            >
              AI Model Comparison
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
              Compare different AI models and their capabilities
            </Typography>
            <Link href="/resources/model-comparison" passHref>
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
                View Comparison
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
            <Typography
              variant="h6"
              sx={{
                color: "var(--foreground)",
                fontWeight: 700,
                mb: 2,
                fontSize: 20,
              }}
            >
              Prompt Engineering Guides
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
              In-depth guides for mastering prompt engineering
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
                    borderColor: "var(--primary-purple)",
                    color: "var(--primary-purple)",
                    bgcolor: "var(--primary-purple)08",
                  },
                }}
              >
                Browse Guides
              </Button>
            </Link>
          </Paper>
        </Box>
      </Box>

      {/* Copy Notification */}
      <Snackbar
        open={copyNotification}
        autoHideDuration={3000}
        onClose={() => setCopyNotification(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setCopyNotification(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </Container>
  );
}
 