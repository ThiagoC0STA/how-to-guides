import { Box, Typography } from "@mui/material";

interface GuideHeroProps {
  title: string;
  description: string;
  lastUpdated?: string;
}

export default function GuideHero({
  title,
  description,
  lastUpdated,
}: GuideHeroProps) {
  return (
    <Box
      bgcolor="var(--background)"
      sx={{
        width: "100%",
        textAlign: "center",
        py: { xs: 5, md: 2 },
        px: { xs: 2, md: 0 },
        mt: 6,
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        <Typography
          variant="h2"
          fontWeight={800}
          sx={{
            fontSize: { xs: 32, md: 44 },
            color: "#23272f",
            mb: 2,
            lineHeight: 1.15,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{
            mb: 3,
            fontWeight: 400,
            maxWidth: 700,
            mx: "auto",
            fontSize: { xs: 16, md: 20 },
          }}
        >
          {description}
        </Typography>
        {lastUpdated && (
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, color: "#444", mt: 2 }}
          >
            Last Updated: <span style={{ fontWeight: 400 }}>{lastUpdated}</span>
          </Typography>
        )}
      </Box>
    </Box>
  );
}
