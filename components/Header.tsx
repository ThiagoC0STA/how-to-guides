"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  ListItemIcon,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  FaHome,
  FaBook,
  FaRobot,
  FaDatabase,
  FaInfoCircle,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

const publicNavLinks = [
  { label: "Home", href: "/", icon: <FaHome /> },
  { label: "AI Guides", href: "/guides", icon: <FaBook /> },
  {
    label: "Prompt Engineering",
    href: "/prompt-engineering",
    icon: <FaRobot />,
  },
  { label: "Resources", href: "/resources", icon: <FaDatabase /> },
  { label: "About", href: "/about", icon: <FaInfoCircle /> },
];

const adminNavLinks = [
  {
    label: "Dashboard",
    href: "/administrador/dashboard",
    icon: <FaChartBar />,
  },
  { label: "Home", href: "/", icon: <FaHome /> },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isAdminRoute =
    pathname?.startsWith("/administrador") &&
    pathname !== "/administrador/login";

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      await supabase.auth.signOut();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      router.push("/administrador/login");
      router.refresh();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const navLinks = isAdminRoute ? adminNavLinks : publicNavLinks;

  return (
    <Box
      component="header"
      sx={{
        bgcolor: isAdminRoute ? "white" : "var(--background)",
        borderBottom: "1px solid #e2e8f0",
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
          <Link href={isAdminRoute ? "/administrador/dashboard" : "/"} passHref>
            <Box
              component="img"
              src="/images/logo/guides-logo.svg"
              alt="How-ToGuides.com"
              sx={{
                width: isAdminRoute ? 150 : 190,
                height: isAdminRoute ? 80 : 110,
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
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    "&:hover": {
                      color: "var(--primary-blue)",
                    },
                  }}
                >
                  {item.icon}
                  {item.label}
                </Typography>
              </Link>
            ))}
            {isAdminRoute && (
              <>
                <IconButton
                  color="primary"
                  onClick={handleLogout}
                  sx={{ ml: 1, color: "var(--foreground)" }}
                >
                  <FaSignOutAlt />
                </IconButton>
              </>
            )}
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
                  <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
            {isAdminRoute && (
              <>
                <Divider sx={{ my: 2 }} />
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      handleLogout();
                      handleDrawerToggle();
                    }}
                    sx={{
                      color: "error.main",
                      fontWeight: 500,
                      fontSize: 17,
                      px: 3,
                      py: 1.5,
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                      <FaSignOutAlt />
                    </ListItemIcon>
                    <ListItemText primary="Sair" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
      </Container>
    </Box>
  );
}
