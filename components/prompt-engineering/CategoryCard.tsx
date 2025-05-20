"use client";

import { Box, Typography, Paper, List, ListItem, Button } from "@mui/material";
import Link from "next/link";
import {
  FaBook,
  FaLightbulb,
  FaChartLine,
  FaPalette,
  FaCogs,
  FaArrowRight,
  FaLock,
  FaQuestionCircle,
} from "react-icons/fa";
import { Category } from "@/data/categories";
import { GUIDES } from "@/data/guides";

interface Guide {
  title: string;
  link: string;
}

interface CategoryCardProps extends Omit<Category, "iconName"> {
  iconName: string;
  count: number;
  featured?: boolean;
  comingSoon?: boolean;
  guides: string[];
}

const iconMap = {
  book: FaBook,
  lightbulb: FaLightbulb,
  "chart-line": FaChartLine,
  palette: FaPalette,
  cogs: FaCogs,
  "question-circle": FaQuestionCircle,
} as const;

type IconName = keyof typeof iconMap;

export default function CategoryCard({
  title,
  description,
  iconName,
  color,
  count,
  featured,
  comingSoon,
  guides,
}: CategoryCardProps) {
  const Icon = iconMap[iconName as IconName] || FaQuestionCircle;

  // Map guide IDs to their full data
  const guideData = guides.map(guideId => {
    const guide = GUIDES.find(g => g.id === guideId);
    if (!guide) return null;
    return {
      title: guide.title,
      link: `/guides/${guide.id}`
    };
  }).filter(Boolean) as Guide[];

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
              {count} {count === 1 ? "Guide" : "Guides"} Available
            </Typography>
          )}
        </Box>
      </Box>

      {!comingSoon && guideData.length > 0 && (
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
              {guideData.map((guide, index) => (
                <ListItem key={index}>
                  <Link href={guide.link} passHref className="guide-link">
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
            <Link href={guideData[0].link} passHref>
              <Button
                component="a"
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
                View {guideData.length === 1 ? "Guide" : "All Guides"}
              </Button>
            </Link>
          </Box>
        </>
      )}
    </Paper>
  );
}
