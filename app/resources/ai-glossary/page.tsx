"use client";

import { useState, useMemo } from "react";
import { Container, Box, Typography, TextField, InputAdornment, Button, Paper, Tabs, Tab } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { glossaryTerms, categories } from "@/data/glossary";
import Link from "next/link";

export default function AIGlossary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  // Filter terms based on search and category
  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(item => {
      const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeFilter === "all" || item.category === activeFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeFilter]);

  // Group terms alphabetically
  const groupedTerms = useMemo(() => {
    return filteredTerms.reduce((acc, term) => {
      const firstLetter = term.term.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(term);
      return acc;
    }, {} as Record<string, typeof filteredTerms>);
  }, [filteredTerms]);

  // Sort the keys alphabetically
  const sortedLetters = useMemo(() => {
    return Object.keys(groupedTerms).sort();
  }, [groupedTerms]);

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
            background: "linear-gradient(90deg, var(--primary-blue) 0%, var(--primary-red) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          AI Terminology Glossary
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
          Comprehensive definitions of key terms and concepts in artificial intelligence
        </Typography>

        <TextField
          fullWidth
          placeholder="Search terms and definitions..."
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
      <Box sx={{ mb: 1, display: "flex", justifyContent: "center" }}>
        <Tabs
          value={activeFilter}
          onChange={(_, newValue) => setActiveFilter(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTabs-indicator": {
              background: "linear-gradient(90deg, var(--primary-blue) 0%, var(--primary-red) 100%)",
            },
            "& .MuiTabs-flexContainer": {
              justifyContent: "center",
            },
          }}
        >
          {categories.map((category) => (
            <Tab
              key={category.id}
              value={category.id}
              label={category.name}
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

      {/* Glossary Terms */}
      {filteredTerms.length > 0 ? (
        <Box>
          {/* Alphabet Navigation */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 1,
              mb: 4,
              p: 2,
              bgcolor: "var(--card-bg)",
              borderRadius: 2,
            }}
          >
            {sortedLetters.map((letter) => (
              <Button
                key={letter}
                onClick={() => setSelectedLetter(letter === selectedLetter ? null : letter)}
                variant={selectedLetter === letter ? "contained" : "outlined"}
                size="small"
                sx={{
                  minWidth: 40,
                  height: 40,
                  borderRadius: 2,
                  borderColor: "divider",
                  color: selectedLetter === letter ? "white" : "text.secondary",
                  bgcolor: selectedLetter === letter ? "primary.main" : "transparent",
                  "&:hover": {
                    borderColor: "primary.main",
                    color: selectedLetter === letter ? "white" : "primary.main",
                    bgcolor: selectedLetter === letter ? "primary.main" : "primary.main08",
                  },
                }}
              >
                {letter}
              </Button>
            ))}
          </Box>

          {/* Terms by Letter */}
          {sortedLetters.map((letter) => (
            <Box
              key={letter}
              sx={{
                mb: 6,
                display: selectedLetter ? (selectedLetter === letter ? "block" : "none") : "block",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: 28, md: 36 },
                  fontWeight: 700,
                  mb: 3,
                  color: "var(--foreground)",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: 60,
                    height: 4,
                    background: "linear-gradient(90deg, var(--primary-blue) 0%, var(--primary-red) 100%)",
                    borderRadius: 2,
                  },
                }}
              >
                {letter}
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
                {groupedTerms[letter].map((item, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 3,
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
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: "var(--foreground)",
                      }}
                    >
                      {item.term}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "var(--footer-text)",
                        lineHeight: 1.7,
                        mb: 2,
                      }}
                    >
                      {item.definition}
                    </Typography>
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: `${item.category === "general" ? "var(--primary-blue)" :
                                 item.category === "technical" ? "var(--primary-purple)" :
                                 item.category === "models" ? "var(--primary-green)" :
                                 "var(--primary-red)"}15`,
                        color: `${item.category === "general" ? "var(--primary-blue)" :
                               item.category === "technical" ? "var(--primary-purple)" :
                               item.category === "models" ? "var(--primary-green)" :
                               "var(--primary-red)"}`,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        textTransform: "capitalize",
                      }}
                    >
                      {item.category}
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Box>
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
            No terms found
          </Typography>
          <Typography sx={{ mb: 3, color: "var(--footer-text)" }}>
            Try adjusting your search terms or filters to find what you're looking for.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              setSearchTerm("");
              setActiveFilter("all");
              setSelectedLetter(null);
            }}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              py: 1,
            }}
          >
            Reset Filters
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
                    borderColor: "var(--primary-blue)",
                    color: "var(--primary-blue)",
                    bgcolor: "var(--primary-blue)08",
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