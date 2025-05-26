"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  Autocomplete,
} from "@mui/material";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { publicRequest } from "@/utils/apiClient";

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [guides, setGuides] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const { data } = await publicRequest.get("/guides");
        if (data.guides) {
          setGuides(
            data.guides.map((g: any) => ({
              id: g.id,
              title: g.title,
            }))
          );
        }
      } catch (error) {
        // Trate o erro se quiser
      }
    };
    fetchGuides();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        pt: { xs: 4, sm: 6, md: 10 },
        pb: { xs: 6, sm: 8, md: 12 },
        width: "100%",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          background: "linear-gradient(135deg, #f6f9fc 0%, #eef2f7 100%)",
          zIndex: -1,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: { xs: 200, sm: 300 },
          height: { xs: 200, sm: 300 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0) 70%)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: { xs: 250, sm: 400 },
          height: { xs: 250, sm: 400 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(156,39,176,0.1) 0%, rgba(156,39,176,0) 70%)",
          zIndex: 0,
        }}
      />

      <Box>
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 4, md: 6 },
            position: "relative",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
              fontWeight: 800,
              mb: { xs: 1.5, md: 2 },
              letterSpacing: -0.5,
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              px: { xs: 2, sm: 0 },
            }}
          >
            Prompt Engineering Guides
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "text.secondary",
              mb: { xs: 3, md: 4 },
              maxWidth: 800,
              mx: "auto",
              fontWeight: 500,
              lineHeight: 1.6,
              fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
              px: { xs: 2, sm: 0 },
            }}
          >
            Master the art of crafting effective prompts to get better results
            from AI tools
          </Typography>

          <Paper
            elevation={0}
            sx={{
              width: "100%",
              mt: { xs: 6, sm: 8 },
              p: { xs: 1, sm: 1.5 },
              borderRadius: { xs: 2, sm: 3 },
              bgcolor: "white",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid",
              borderColor: "divider",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 2 },
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Autocomplete
                freeSolo
                options={guides}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.title
                }
                value={searchTerm}
                onChange={(_, newValue) => {
                  if (typeof newValue === "object" && newValue?.id) {
                    router.push(`/guides/${newValue.id}`);
                  } else if (typeof newValue === "string") {
                    setSearchTerm(newValue);
                  }
                }}
                onInputChange={(_, newInputValue) =>
                  setSearchTerm(newInputValue)
                }
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    placeholder="Search prompt engineering guides..."
                    variant="standard"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <FaSearch
                          size={20}
                          color="#666"
                          style={{ marginRight: 8 }}
                        />
                      ),
                    }}
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-root": {
                        fontSize: { xs: "1rem", sm: "1.1rem" },
                      },
                      "& .MuiInput-underline:before": {
                        display: "none",
                      },
                      "& .MuiInput-underline:hover:before": {
                        display: "none",
                      },
                      "& .MuiInput-underline:after": {
                        display: "none",
                      },
                      "& .MuiInputBase-input": {
                        padding: "8px 0",
                        marginBottom: "10px",
                      },
                    }}
                  />
                )}
              />
              <Button
                variant="contained"
                endIcon={<FaArrowRight />}
                sx={{
                  px: { xs: 2, sm: 3 },
                  py: { xs: 1.5, sm: 1.8 },
                  width: { xs: "100%", sm: "auto" },
                  height: { xs: "auto", sm: "100% !important" },
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  bgcolor: "primary.main",
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                Search
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
