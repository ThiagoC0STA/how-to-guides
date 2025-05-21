import { Box, Typography } from "@mui/material";
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
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: 300,
        overflow: "hidden",
        borderRadius: 2,
        mb: 4,
      }}
    >
      <Image
        src={typeof image === 'string' ? image : URL.createObjectURL(image)}
        alt={title}
        fill
        style={{ objectFit: "cover" }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: 4,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
        }}
      >
        <Typography variant="h3" color="white" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="white" sx={{ mb: 2 }}>
          {description}
        </Typography>
        {lastUpdated && (
          <Typography variant="caption" color="white">
            Last updated: {lastUpdated}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
