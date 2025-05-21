"use client";

import Link from "next/link";
import {
  Box,
  Container,
  Stack,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "AI Guides", href: "/guides" },
  { label: "Prompt Engineering", href: "/prompt-engineering" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box
      component="header"
      sx={{
        bgcolor: "var(--background)",
        // borderBottom: "1px solid var(--footer-border)",
        py: { xs: 2, md: 2 },
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        zIndex: 10,
      }}
    >
      <Container
        maxWidth={false}
        sx={{ maxWidth: "1440px", px: { xs: 2, md: 6 } }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: { xs: 60, md: 90 },
          }}
        >
          {/* Logo */}
          <Link href="/" passHref>
            <Box
              component="img"
              src="/images/logo/guides-logo.svg"
              alt="How-ToGuides.com"
              sx={{
                width: 190,
                height: 110,
                cursor: "pointer",
                display: "block",
                ml: -2,
              }}
            />
          </Link>

          {/* Desktop Menu */}
          <Stack
            direction="row"
            spacing={{ xs: 2, md: 6 }}
            alignItems="center"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Typography
                  sx={{
                    color: "var(--foreground)",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "var(--primary-blue)",
                    },
                  }}
                >
                  {item.label}
                </Typography>
              </Link>
            ))}
          </Stack>

          {/* Mobile Menu Icon */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "flex", md: "none" }, ml: 1 }}
          >
            <MenuIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Box>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          PaperProps={{ sx: { width: 260, pt: 2 } }}
        >
          <List>
            {navLinks.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  onClick={handleDrawerToggle}
                  sx={{
                    color: "var(--foreground)",
                    fontWeight: 500,
                    fontSize: 17,
                    textAlign: "left",
                    px: 3,
                    py: 1.5,
                    "&:hover": {
                      color: "var(--primary-blue)",
                    },
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Container>
    </Box>
  );
}
