"use client";

import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Paper,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { ReactNode, useState, ReactElement } from "react";

interface DataTableProps {
  title: string;
  items: any[];
  onAdd?: () => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  renderItem: (item: any) => {
    icon: ReactNode;
    primary: string;
    secondary: string;
    chips?: { icon: ReactElement; label: string; color: string }[];
  };
  searchPlaceholder?: string;
}

export default function DataTable({
  title,
  items,
  onAdd,
  onEdit,
  onDelete,
  renderItem,
  searchPlaceholder = "Search...",
}: DataTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter((item) => {
    const { primary, secondary } = renderItem(item);
    const searchLower = searchQuery.toLowerCase();
    return (
      primary.toLowerCase().includes(searchLower) ||
      secondary.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <CardHeader
        title={
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            {title}
          </Typography>
        }
        action={
          onAdd && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAdd}
              sx={{
                backgroundColor: "#1976d2",
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Add {title.slice(0, -1)}
            </Button>
          )
        }
        sx={{
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
          backgroundColor: "rgba(0, 0, 0, 0.02)",
        }}
      />
      <CardContent sx={{ flexGrow: 1, p: 0 }}>
        <Box sx={{ p: 2, pb: 0 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "white",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.2)",
                },
              },
            }}
          />
        </Box>
        <List sx={{ p: 0 }}>
          {filteredItems.map((item, index) => {
            const { icon, primary, secondary, chips } = renderItem(item);
            return (
              <ListItem
                key={index}
                sx={{
                  borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                  "&:last-child": {
                    borderBottom: "none",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                  },
                  transition: "background-color 0.2s",
                  px: 3,
                  py: 1.5,
                }}
                secondaryAction={
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {onEdit && (
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => onEdit(item)}
                        sx={{
                          color: "#1976d2",
                          "&:hover": {
                            backgroundColor: "rgba(25, 118, 210, 0.08)",
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    {onDelete && (
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onDelete(item)}
                        sx={{
                          color: "#d32f2f",
                          "&:hover": {
                            backgroundColor: "rgba(211, 47, 47, 0.08)",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                }
              >
                <ListItemIcon sx={{ minWidth: 40, color: "text.secondary" }}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.95rem",
                          color: "text.primary",
                        }}
                      >
                        {primary}
                      </Typography>
                      {chips?.map((chip, chipIndex) => (
                        <Chip
                          key={chipIndex}
                          icon={chip.icon}
                          label={chip.label}
                          color={chip.color as any}
                          size="small"
                          sx={{
                            borderRadius: 1,
                            "& .MuiChip-icon": {
                              color: "inherit",
                            },
                          }}
                        />
                      ))}
                    </Box>
                  }
                  secondary={
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        color: "text.secondary",
                        mt: 0.5,
                      }}
                    >
                      {secondary}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Paper>
  );
}
