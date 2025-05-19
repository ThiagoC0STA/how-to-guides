import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  Button,
  Chip,
} from "@mui/material";
import Link from "next/link";

interface Guide {
  title: string;
  link: string;
}

interface CategoryCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  count: number;
  featured?: boolean;
  comingSoon?: boolean;
  guides: Guide[];
}

export default function CategoryCard({
  title,
  description,
  icon,
  color,
  count,
  featured,
  comingSoon,
  guides,
}: CategoryCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        border: "2px solid",
        borderColor: color,
        opacity: comingSoon ? 0.8 : 1,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 15px rgba(0,0,0,0.1)",
        },
      }}
    >
      {featured && (
        <Chip
          label="Featured"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor: "#f39c12",
            color: "white",
            fontWeight: 700,
          }}
        />
      )}
      <Box
        sx={{
          p: 3,
          bgcolor: color,
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        {icon}
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
          {description}
        </Typography>
        {comingSoon ? (
          <Chip
            label="Coming Soon"
            sx={{
              bgcolor: "#95a5a6",
              color: "white",
              fontWeight: 500,
            }}
          />
        ) : (
          <>
            <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
              {count} {count === 1 ? "Guide" : "Guides"}
            </Typography>
            <List dense>
              {guides.map((guide, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <Link href={guide.link} passHref>
                    <Typography
                      component="a"
                      sx={{
                        color: "primary.main",
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {guide.title}
                    </Typography>
                  </Link>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>
      {!comingSoon && guides.length > 0 && (
        <Box
          sx={{
            p: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <Link href={guides[0].link} passHref>
            <Button
              component="a"
              variant="contained"
              sx={{
                bgcolor: color,
                "&:hover": {
                  bgcolor: color,
                  opacity: 0.9,
                },
              }}
            >
              View {guides.length === 1 ? "Guide" : "Guides"}
            </Button>
          </Link>
        </Box>
      )}
    </Paper>
  );
}
