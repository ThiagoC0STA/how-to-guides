"use client";

import { useState } from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import {
  Book as BookIcon,
  Category as CategoryIcon,
  SmartToy as SmartToyIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { categories } from "@/data/categories";
import { GUIDES } from "@/data/guides";
import { modelData } from "@/data/models";
import StatCard from "./components/StatCard";
import DataTable from "./components/DataTable";
import NavigationTabs from "./components/NavigationTabs";

export default function Dashboard() {
  const [selectedSection, setSelectedSection] = useState("overview");
  const theme = useTheme();

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "guides", label: "Guides" },
    { id: "categories", label: "Categories" },
    { id: "models", label: "Models" },
  ];

  const stats = {
    totalGuides: GUIDES.length,
    totalCategories: categories.length,
    totalModels: Object.values(modelData).flat().length,
    featuredGuides: GUIDES.filter((guide) => guide.featured).length,
  };

  const renderOverview = () => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 3,
        mb: 4,
      }}
    >
      <StatCard
        title="Total Guides"
        value={stats.totalGuides}
        icon={<BookIcon />}
        color={theme.palette.primary.main}
      />
      <StatCard
        title="Categories"
        value={stats.totalCategories}
        icon={<CategoryIcon />}
        color={theme.palette.success.main}
      />
      <StatCard
        title="AI Models"
        value={stats.totalModels}
        icon={<SmartToyIcon />}
        color={theme.palette.warning.main}
      />
      <StatCard
        title="Featured Guides"
        value={stats.featuredGuides}
        icon={<TrendingUpIcon />}
        color={theme.palette.secondary.main}
      />
    </Box>
  );

  const renderGuides = () => (
    <DataTable
      title="Guides"
      items={GUIDES}
      onAdd={() => {
        /* TODO: Implement add guide */
      }}
      onEdit={(guide) => {
        /* TODO: Implement edit guide */
      }}
      onDelete={(guide) => {
        /* TODO: Implement delete guide */
      }}
      renderItem={(guide) => ({
        icon: <BookIcon />,
        primary: guide.title,
        secondary: `Last updated: ${guide.lastUpdated}`,
        chips: guide.featured
          ? [
              {
                icon: <TrendingUpIcon />,
                label: "Featured",
                color: "primary",
              },
            ]
          : undefined,
      })}
      searchPlaceholder="Search guides..."
    />
  );

  const renderCategories = () => (
    <DataTable
      title="Categories"
      items={categories}
      onAdd={() => {
        /* TODO: Implement add category */
      }}
      onEdit={(category) => {
        /* TODO: Implement edit category */
      }}
      onDelete={(category) => {
        /* TODO: Implement delete category */
      }}
      renderItem={(category) => ({
        icon: <CategoryIcon />,
        primary: category.title,
        secondary: `${category.guides.length} guides`,
        chips: category.featured
          ? [
              {
                icon: <TrendingUpIcon />,
                label: "Featured",
                color: "primary",
              },
            ]
          : undefined,
      })}
      searchPlaceholder="Search categories..."
    />
  );

  const renderModels = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {Object.entries(modelData).map(([type, models]) => (
        <DataTable
          key={type}
          title={`${type.charAt(0).toUpperCase() + type.slice(1)} Models`}
          items={models}
          onAdd={() => {
            /* TODO: Implement add model */
          }}
          onEdit={(model) => {
            /* TODO: Implement edit model */
          }}
          onDelete={(model) => {
            /* TODO: Implement delete model */
          }}
          renderItem={(model) => ({
            icon: <SmartToyIcon />,
            primary: model.name,
            secondary: `${model.company} • Released: ${model.releaseDate}`,
          })}
          searchPlaceholder={`Search ${type} models...`}
        />
      ))}
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            letterSpacing: "-0.5px",
          }}
        >
          Dashboard
        </Typography>
        <NavigationTabs
          sections={sections}
          selectedSection={selectedSection}
          onSectionChange={setSelectedSection}
        />
      </Box>

      {selectedSection === "overview" && renderOverview()}
      {selectedSection === "guides" && renderGuides()}
      {selectedSection === "categories" && renderCategories()}
      {selectedSection === "models" && renderModels()}
    </Container>
  );
}
