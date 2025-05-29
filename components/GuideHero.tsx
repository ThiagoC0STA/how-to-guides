import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";

interface GuideHeroProps {
  title: string;
  description: string;
  lastUpdated?: string;
  image: File | string;
}

export default function GuideHero({
  title,
  description,
  lastUpdated,
  image,
}: GuideHeroProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 200, sm: 250, md: 300 },
        overflow: "hidden",
        borderRadius: { xs: 2, sm: 2 },
        mb: { xs: "-30px", sm: 3, md: 4 },
        mt: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Image
        src={typeof image === "string" ? image : URL.createObjectURL(image)}
        alt={title}
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: { xs: 2, sm: 3, md: 4 },
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0) 100%)",
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h3"}
          color="white"
          sx={{
            mb: 1,
            fontSize: { xs: "1.3rem", sm: "2rem", md: "2.5rem" },
            fontWeight: 700,
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="white"
          sx={{
            mb: 2,
            fontSize: { xs: "0.85rem", sm: "1rem" },
            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: { xs: "95%", sm: "100%" },
          }}
        >
          {description}
        </Typography>
        {lastUpdated && (
          <Typography
            variant="caption"
            color="white"
            sx={{
              opacity: 0.9,
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            Last updated: {lastUpdated}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
