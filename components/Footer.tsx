"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
} from "@mui/material";

const popularGuides = [
  { label: "How to Use ChatGPT", href: "/guides/how-to-use-chatgpt" },
  { label: "How to Use Midjourney", href: "/guides/how-to-use-midjourney" },
  {
    label: "How to Write Effective AI Prompts",
    href: "/guides/how-to-write-effective-ai-prompts",
  },
  { label: "How to Use Gemini AI", href: "/guides/how-to-use-gemini-ai" },
];

const resources = [
  { label: "AI Terminology Glossary", href: "/resources/ai-glossary" },
  {
    label: "Prompt Engineering Cheat Sheet",
    href: "/resources/prompt-cheat-sheet",
  },
  { label: "AI Model Comparison", href: "/resources/model-comparison" },
];

export default function Footer() {
  const pathname = usePathname();
  const isAdminRoute =
    pathname?.startsWith("/administrador") &&
    pathname !== "/administrador/login";

  // Não exibe o footer nas rotas administrativas
  if (isAdminRoute) {
    return null;
  }

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "var(--footer-bg)",
        pt: 8,
        pb: 4,
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        bottom: 0,
      }}
    >
      <Container
        maxWidth={false}
        sx={{ maxWidth: "1440px", px: { xs: 2, md: 6 } }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 0 }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "stretch" }}
          sx={{ mb: 4 }}
        >
          <Box pr={12} sx={{ minWidth: 220, flex: 1, mb: { xs: 2, md: 0 } }}>
            <Box mb={2}>
              <Box
                component="img"
                src="/images/logo/guides-logo.svg"
                alt="How-ToGuides.com"
                sx={{ width: 160, height: 80, marginLeft: "-10px" }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{ color: "var(--footer-text)", marginTop: "-12px" }}
            >
              Master AI tools with step-by-step guides and tutorials.
            </Typography>
          </Box>

          {/* Popular Guides */}
          <Box sx={{ minWidth: 180, flex: 1, mb: { xs: 2, md: 0 } }}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              gutterBottom
              sx={{ color: "var(--foreground)", fontSize: 20 }}
            >
              Popular Guides
            </Typography>
            <Stack spacing={1}>
              {popularGuides.map((item) => (
                <Link key={item.href} href={item.href} passHref>
                  <Typography
                    sx={{
                      color: "var(--foreground)",
                      textDecoration: "none",
                      fontWeight: 500,
                      transition: "color 0.2s",
                      fontSize: 15,
                      "&:hover": {
                        color: "var(--primary-blue)",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {item.label}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Box>

          {/* Resources */}
          <Box sx={{ minWidth: 180, flex: 1, mb: { xs: 2, md: 0 } }}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              gutterBottom
              sx={{ color: "var(--foreground)", fontSize: 20 }}
            >
              Resources
            </Typography>
            <Stack spacing={1}>
              {resources.map((item) => (
                <Link key={item.href} href={item.href} passHref>
                  <Typography
                    sx={{
                      color: "var(--foreground)",
                      textDecoration: "none",
                      fontWeight: 500,
                      transition: "color 0.2s",
                      fontSize: 15,
                      "&:hover": {
                        color: "var(--primary-blue)",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {item.label}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Box>

          {/* Newsletter */}
          <Box sx={{ minWidth: 260, maxWidth: 320, flex: 1 }}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              gutterBottom
              sx={{ color: "var(--foreground)", fontSize: 20 }}
            >
              Newsletter
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "var(--footer-text)", mb: 1, fontSize: 15 }}
            >
              Stay updated with the latest AI tools and techniques.
            </Typography>
            <Stack direction="column" spacing={1} component="form">
              <TextField
                size="small"
                placeholder="Your email address"
                variant="outlined"
                sx={{
                  bgcolor: "transparent",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    fontSize: 15,
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    "& fieldset": {
                      borderColor: "var(--footer-border)",
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--primary-blue)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--primary-blue)",
                    },
                  },
                  "& input::placeholder": {
                    color: "#8ca2c0",
                    opacity: 1,
                  },
                  "&:hover input::placeholder, & .Mui-focused input::placeholder":
                    {
                      color: "#5a6b85",
                    },
                }}
                InputProps={{ sx: { borderRadius: 2 } }}
              />
              <Button
                variant="contained"
                sx={{
                  borderRadius: 2,
                  px: 3,
                  alignSelf: "flex-start",
                  bgcolor: "var(--primary-blue)",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: 13,
                  boxShadow: "0 2px 8px 0 rgba(37,99,235,0.10)",
                  transition: "all 0.2s cubic-bezier(.4,0,.2,1)",
                  "&:hover": {
                    bgcolor: "var(--primary-blue-dark)",
                    transform: "translateY(-2px) scale(1.03)",
                  },
                }}
              >
                Subscribe
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
      <Divider
        sx={{
          my: 4,
          borderColor: "var(--footer-border)",
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
        }}
      />
      <Box textAlign="center">
        <Typography variant="caption" sx={{ color: "var(--footer-text)" }}>
          © {new Date().getFullYear()} How-ToGuides.com. All rights reserved.
        </Typography>
      </Box>

      <Container
        maxWidth={false}
        sx={{ maxWidth: "1440px", px: { xs: 2, md: 6 }, mt: 4, mb: 1 }}
      >
        <Typography
          sx={{
            fontSize: 12,
            color: "var(--footer-text)",
            mb: 1,
            lineHeight: 1.6,
            textAlign: "left",
          }}
        >
          <strong>DISCLAIMER</strong>
          <br />
          This website provides informational content only, and all access is
          completely free. Our only revenue comes from advertisements clearly
          labeled as &quot;Advertisement.&quot; We never request payment for any
          services. If you encounter such requests, please contact us
          immediately.
          <br />
          How-ToGuides.com may contain affiliate links. When you make purchases
          through these links, we may receive a commission at no additional cost
          to you. All affiliate relationships are transparently disclosed.
          <br />
          All content and materials on this website are copyright protected.
          Unauthorized reproduction or distribution is prohibited without prior
          written permission.
          <br />
          While we strive for accuracy in our AI tool guides, we cannot
          guarantee identical results for all users. AI technologies frequently
          update their features and interfaces, which may cause variations in
          user experience compared to our guides.
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
            color: "var(--footer-text)",
            lineHeight: 1.6,
            marginTop: 5,
            textAlign: "left",
          }}
        >
          <strong>EDITORIAL NOTE</strong>
          <br />
          We are committed to keeping all information on How-ToGuides.com as
          current as possible. However, due to the rapid evolution of AI
          technologies, information may occasionally differ from official
          websites. We cannot guarantee the accuracy or timeliness of all
          content presented.
          <br />
          AI tools frequently update their features, interfaces, and
          capabilities. While we thoroughly test the techniques in our guides,
          results may vary based on tool updates, regional differences, and
          account-specific limitations. We recommend consulting official
          documentation for the most current information about specific AI
          tools.
          <br />
          Our guides include both factual instructions and expert
          recommendations based on our experience. We encourage readers to adapt
          our guidance to their specific needs and use cases.
          <br />
        </Typography>
      </Container>
    </Box>
  );
}
