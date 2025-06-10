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
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Image container */}
      <Box
        sx={{
          width: { xs: 400, md: 500 },
          height: { xs: 200, md: 320 },
          borderRadius: 3,
          overflow: "hidden",
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={typeof image === "string" ? image : URL.createObjectURL(image)}
          alt={title}
          width={200}
          height={200}
          quality={100}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
          priority
        />
      </Box>

      {/* Text content */}
      <Box
        sx={{
          textAlign: "center",
          maxWidth: 800,
          mx: "auto",
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h3"}
          sx={{
            mb: 2,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            fontWeight: 700,
            color: "var(--foreground)",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            fontSize: { xs: "1rem", sm: "1.1rem" },
            color: "var(--footer-text)",
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>
        {lastUpdated && (
          <Typography
            variant="caption"
            sx={{
              color: "var(--footer-text)",
              opacity: 0.8,
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            Last updated: {lastUpdated}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
