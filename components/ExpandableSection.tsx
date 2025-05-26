import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactNode } from "react";

export default function ExpandableSection({
  title,
  children,
  guideColor,
}: {
  title: string;
  children: ReactNode;
  guideColor?: string;
}) {
  const color = guideColor || "var(--primary-blue, #134CCD)";
  return (
    <Accordion
      sx={{
        mb: 2,
        borderRadius: 2,
        boxShadow: "none",
        border: "1.5px solid var(--footer-border, #e5e7eb)",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color }} />}
        aria-controls="panel-content"
        id="panel-header"
        sx={{ bgcolor: "var(--footer-bg, #f2f3f5)", borderRadius: 2 }}
      >
        <Typography fontWeight={700} sx={{ color }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
