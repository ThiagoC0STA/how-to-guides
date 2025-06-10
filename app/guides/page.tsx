import { Box, Typography } from "@mui/material";
import { Suspense } from "react";
import GuidesSection from "@/components/GuidesSection";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function GuidesPage() {
  return (
    <div style={{ paddingBottom: "60px" }}>
      <Box
        sx={{
          pt: { xs: 4, md: 8 },
          pb: { xs: 2, md: 12 },
          px: { xs: 2, md: 4 },
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 32, md: 48 },
            fontWeight: 800,
            mb: 2,
            background: "linear-gradient(90deg, #134CCD 0%, #4f46e5 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "black",
          }}
        >
          AI Guides & Tutorials
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: 18, md: 20 },
            color: "var(--footer-text)",
            maxWidth: 600,
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Explore our comprehensive collection of guides and tutorials to master
          AI tools and boost your productivity
        </Typography>
      </Box>

      <Suspense fallback={<LoadingOverlay />}>
        <GuidesSection isPopular={false} />
      </Suspense>
    </div>
  );
}
