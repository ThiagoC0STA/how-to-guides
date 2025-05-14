import { Box, Typography, Paper, List, ListItem } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";

interface GuideOverviewProps {
  title: string;
  description: string;
  bullets: string[];
  guideColor: string;
  guideColorRgb: string;
}

export default function GuideOverview({
  title,
  description,
  bullets,
  guideColor,
  guideColorRgb,
}: GuideOverviewProps) {
  const half = Math.ceil(bullets.length / 2);
  const col1 = bullets.slice(0, half);
  const col2 = bullets.slice(half);

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        mb: 5,
        p: { xs: 3, md: 5 },
        borderRadius: 5,
        border: "1.5px solid",
        borderColor: "grey.100",
        bgcolor: "#fcfcfd",
        boxShadow: `0 2px 16px 0 rgba(${guideColorRgb},0.08)`,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 7,
          background: `linear-gradient(90deg, ${guideColor} 0%, rgba(${guideColorRgb},0.1) 100%)`,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      />
      {/* Ícone de destaque menor e mais sutil */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 1.5, mt: 0.5 }}>
        <FaCheckCircle
          size={28}
          color={guideColor}
          style={{ filter: `drop-shadow(0 2px 8px ${guideColor}22)` }}
        />
      </Box>
      <Typography
        variant="h4"
        fontWeight={800}
        mb={1.5}
        sx={{ textAlign: "center", letterSpacing: -1 }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        mb={2.5}
        sx={{ textAlign: "center", maxWidth: 700, mx: "auto", fontSize: 18 }}
      >
        {description}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 0, sm: 4 },
          width: "100%",
          px: 4,
          mt: 4,
        }}
      >
        {[col1, col2].map((col, colIdx) => (
          <List key={colIdx} sx={{ pl: 0, width: "100%" }}>
            {col.map((item, idx) => (
              <ListItem
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pl: 0,
                  py: 1.1,
                  gap: 1.5,
                  borderRadius: 2,
                  transition: "background 0.18s",
                  mb: 0.5,
                  "&:hover": {
                    background: `rgba(${guideColorRgb},0.07)`,
                  },
                }}
              >
                <Box sx={{ mt: 0.1, mr: 1 }}>
                  <FaCheckCircle
                    size={16}
                    color={guideColor}
                    style={{ minWidth: 16 }}
                  />
                </Box>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ fontSize: 16.5, lineHeight: 1.7 }}
                >
                  {item}
                </Typography>
              </ListItem>
            ))}
          </List>
        ))}
      </Box>
    </Paper>
  );
}
