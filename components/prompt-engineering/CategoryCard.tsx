"use client";

import { Box, Typography, Paper, List, ListItem, Button } from "@mui/material";
import Link from "next/link";
import { FaArrowRight, FaLock, FaQuestionCircle } from "react-icons/fa";
import iconMap from "../../data/iconMap";

interface Guide {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface CategoryCardProps {
  id: string;
  title: string;
  description: string;
  color: string;
  iconName: string;
  featured?: boolean;
  comingSoon?: boolean;
  guides: Guide[];
}

type IconName = keyof typeof iconMap;

export default function CategoryCard({
  title,
  description,
  iconName,
  color,
  featured,
  comingSoon,
  guides = [],
  id,
}: CategoryCardProps) {
  const Icon = iconMap[iconName as IconName] || FaQuestionCircle;
  const safeGuides = Array.isArray(guides) ? guides : [];

  return (
    <Paper
      elevation={0} 
      sx={{
        height: "100%",
        minHeight: 380,
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: comingSoon ? "divider" : "divider",
        opacity: comingSoon ? 0.7 : 1,
        transition: "all 0.3s ease",
        position: "relative",
        "&:hover": {
          transform: comingSoon ? "none" : "translateY(-8px)",
          boxShadow: comingSoon ? "none" : "0 12px 24px rgba(0,0,0,0.08)",
          borderColor: comingSoon ? "divider" : color,
          "& .guide-link": {
            color: color,
          },
          "& .view-button": {
            bgcolor: color,
            color: "white",
          },
        },
      }}
    >
      {featured && (
        <>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "0 70px 70px 0",
              borderColor: `transparent ${color} transparent transparent`,
              zIndex: 1,
            }}
          />
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: 18,
              right: 0,
              color: "white",
              fontWeight: 700,
              fontSize: "0.70rem",
              transform: "rotate(45deg)",
              zIndex: 2,
            }}
          >
            Featured
          </Typography>
        </>
      )}

      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          position: "relative",
          pb: 0,
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: comingSoon ? "action.hover" : `${color}15`,
            color: comingSoon ? "text.secondary" : color,
            flexShrink: 0,
            transition: "all 0.3s ease",
          }}
        >
          {comingSoon ? <FaLock size={20} /> : <Icon size={24} />}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "1.1rem",
              mb: 1,
              color: comingSoon ? "text.secondary" : "text.primary",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              lineHeight: 1.6,
              mb: 2,
            }}
          >
            {description}
          </Typography>

          {comingSoon ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "action.hover",
                p: 1.5,
                borderRadius: 2,
                mb: 1,
              }}
            >
              <FaLock size={14} color="#666" />
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                }}
              >
                Coming Soon
              </Typography>
            </Box>
          ) : (
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: "text.secondary",
                mb: 2,
                fontWeight: 500,
              }}
            >
              {safeGuides.length} {safeGuides.length === 1 ? "Guide" : "Guides"} Available
            </Typography>
          )}
        </Box>
      </Box>

      {!comingSoon && guides.length > 0 && (
        <>
          <Box
            sx={{
              px: 3,
              pb: 2,
              flexGrow: 1,
            }}
          >
            <List
              dense
              sx={{
                "& .MuiListItem-root": {
                  px: 0,
                  py: 0.5,
                },
              }}
            >
              {guides.map((guide) => (
                <ListItem key={guide.id}>
                  <Link href={`/guides/${guide.id}`} passHref className="guide-link">
                    <Typography
                      sx={{
                        color: "text.secondary",
                        textDecoration: "none",
                        fontSize: "0.875rem",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        transition: "color 0.2s ease",
                        "&:hover": {
                          color: color,
                        },
                      }}
                    >
                      <FaArrowRight size={12} />
                      {guide.title}
                    </Typography>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box
            sx={{
              p: 2,
              borderTop: "1px solid",
              borderColor: "divider",
              textAlign: "center",
            }}
          >
            <Link href={`/guides`} passHref>
              <Button
                variant="outlined"
                className="view-button"
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
                    borderColor: color,
                  },
                }}
              >
                View Category
              </Button>
            </Link>
          </Box>
        </>
      )}
    </Paper>
  );
}
