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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FaSearch, FaCheck, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { modelData } from "@/data/models";

export default function ModelComparison() {
  const [activeTab, setActiveTab] = useState("text");
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = [
    { id: "text", name: "Text Generation Models" },
    { id: "image", name: "Image Generation Models" },
    { id: "multimodal", name: "Multimodal Models" },
  ];

  const filteredModels = useMemo(() => {
    return modelData[activeTab].filter(
      (model) =>
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activeTab, searchTerm]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: "center", mb: 8 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 42, md: 56 },
            fontWeight: 800,
            mb: 3,
            background:
              "linear-gradient(90deg, var(--primary-blue) 0%, var(--primary-red) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          AI Model Comparison
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "var(--footer-text)",
            fontWeight: 500,
            maxWidth: 800,
            mx: "auto",
            mb: 5,
            fontSize: { xs: 18, md: 20 },
            lineHeight: 1.6,
          }}
        >
          Side-by-side comparison of popular AI models and their capabilities
        </Typography>

        <TextField
          fullWidth
          placeholder="Search models..."
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

      {/* Intro Section */}
      <Paper
        elevation={0}
        sx={{
          p: 5,
          mb: 8,
          borderRadius: 3,
          bgcolor: "var(--card-bg)",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h2" sx={{ mb: 3, fontSize: 32, fontWeight: 700 }}>
          Understanding AI Model Capabilities
        </Typography>
        <Typography
          sx={{
            mb: 3,
            color: "var(--footer-text)",
            fontSize: 16,
            lineHeight: 1.8,
          }}
        >
          Different AI models excel at different tasks. This comparison helps
          you choose the right tool for your specific needs. We&apos;ve organized
          models by their primary function (text generation, image generation,
          or multimodal capabilities) and provided detailed information about
          their strengths, limitations, and use cases.
        </Typography>
        <Typography
          sx={{ color: "var(--footer-text)", fontSize: 16, lineHeight: 1.8 }}
        >
          This comparison is updated regularly to reflect the latest model
          versions and capabilities. Last updated: April 2025.
        </Typography>
      </Paper>

      {/* Models Section */}
      {filteredModels.length > 0 ? (
        <Box sx={{ mb: 6 }}>
          {filteredModels.map((model, index) => (
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
              <Box
                sx={{
                  mb: 3,
                  pb: 2,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: 28,
                    fontWeight: 700,
                    mb: 2,
                    color: "var(--foreground)",
                  }}
                >
                  {model.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "var(--footer-text)",
                      fontSize: 16,
                    }}
                  >
                    {model.company} • Released: {model.releaseDate}
                  </Typography>
                </Box>
              </Box>

              <Typography
                sx={{
                  mb: 5,
                  color: "var(--footer-text)",
                  lineHeight: 1.8,
                  fontSize: 16,
                }}
              >
                {model.description}
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, 1fr)",
                  },
                  gap: 6,
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      color: "var(--foreground)",
                      fontWeight: 600,
                      fontSize: 18,
                    }}
                  >
                    Strengths
                  </Typography>
                  <Box
                    component="ul"
                    sx={{
                      pl: 0,
                      mb: 0,
                      listStyle: "none",
                      "& li": {
                        color: "var(--footer-text)",
                        mb: 2,
                        lineHeight: 1.8,
                        fontSize: 14,
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        "&:last-child": {
                          mb: 0,
                        },
                      },
                    }}
                  >
                    {model.strengths.map((strength, i) => (
                      <Typography component="li" key={i}>
                        {strength}
                      </Typography>
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      color: "var(--foreground)",
                      fontWeight: 600,
                      fontSize: 18,
                    }}
                  >
                    Limitations
                  </Typography>
                  <Box
                    component="ul"
                    sx={{
                      pl: 0,
                      mb: 0,
                      listStyle: "none",
                      "& li": {
                        color: "var(--footer-text)",
                        mb: 2,
                        lineHeight: 1.8,
                        fontSize: 14,
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        "&:last-child": {
                          mb: 0,
                        },
                      },
                    }}
                  >
                    {model.limitations.map((limitation, i) => (
                      <Typography component="li" key={i}>
                        {limitation}
                      </Typography>
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      color: "var(--foreground)",
                      fontWeight: 600,
                      fontSize: 18,
                    }}
                  >
                    Use Cases
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      pl: 0,
                    }}
                  >
                    {model.useCases.map((useCase, i) => (
                      <Typography
                        key={i}
                        sx={{
                          color: "var(--primary-blue)",
                          fontSize: 14,
                          lineHeight: 1.8,
                        }}
                      >
                        {useCase}
                      </Typography>
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      color: "var(--foreground)",
                      fontWeight: 600,
                      fontSize: 18,
                    }}
                  >
                    Pricing
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "var(--footer-text)",
                          fontWeight: 500,
                          fontSize: 14,
                        }}
                      >
                        Free Tier:
                      </Typography>
                      <Typography
                        sx={{ color: "var(--footer-text)", fontSize: 14 }}
                      >
                        {model.pricing.free}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "var(--footer-text)",
                          fontWeight: 500,
                          fontSize: 14,
                        }}
                      >
                        Paid Plans:
                      </Typography>
                      <Typography
                        sx={{ color: "var(--footer-text)", fontSize: 14 }}
                      >
                        {model.pricing.paid}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "var(--footer-text)",
                          fontWeight: 500,
                          fontSize: 14,
                        }}
                      >
                        API Access:
                      </Typography>
                      <Typography
                        sx={{ color: "var(--footer-text)", fontSize: 14 }}
                      >
                        {model.pricing.api}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {model.link && (
                <Box
                  sx={{
                    mt: 4,
                    pt: 3,
                    borderTop: "1px solid",
                    borderColor: "divider",
                    textAlign: "center",
                  }}
                >
                  <Link href={model.link} passHref>
                    <Button
                      component="a"
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        px: 3,
                        py: 1,
                      }}
                    >
                      View Detailed Guide
                    </Button>
                  </Link>
                </Box>
              )}
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
            No models found
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

      {/* Comparison Table */}
      <Box sx={{ mb: 6 }}>
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
          Quick Comparison Table
        </Typography>

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "var(--card-bg)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Model</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Best For</TableCell>
                <TableCell>Free Option</TableCell>
                <TableCell>API Available</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {modelData[activeTab].map((model, index) => (
                <TableRow
                  key={index}
                  sx={{
                    display:
                      searchTerm && !filteredModels.includes(model)
                        ? "none"
                        : "table-row",
                  }}
                >
                  <TableCell>{model.name}</TableCell>
                  <TableCell>{model.company}</TableCell>
                  <TableCell>{model.useCases[0]}</TableCell>
                  <TableCell>
                    {model.pricing.free !== "No free tier" ? (
                      <FaCheck color="var(--primary-blue)" />
                    ) : (
                      <FaTimes color="var(--primary-red)" />
                    )}
                  </TableCell>
                  <TableCell>
                    {model.pricing.api !==
                    "No public API currently available" ? (
                      <FaCheck color="var(--primary-blue)" />
                    ) : (
                      <FaTimes color="var(--primary-red)" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

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
              Prompt Engineering Cheat Sheet
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
              Quick reference guide for crafting effective AI prompts
            </Typography>
            <Link href="/resources/prompt-cheat-sheet" passHref>
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
                View Cheat Sheet
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
              Step-by-step tutorials for popular AI tools
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
    </Container>
  );
}
