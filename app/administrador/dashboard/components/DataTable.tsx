"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

interface Column<T> {
  field: keyof T | string;
  headerName: string;
  width?: number;
  renderCell?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export default function DataTable<T>({
  title,
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  const handleAddClick = () => {
    if (title === "Guides") {
      router.push("/administrador/guides");
    } else if (onAdd) {
      onAdd();
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add {title.slice(0, -1)}
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field.toString()}
                  sx={{ width: column.width, fontWeight: 600 }}
                >
                  {column.headerName}
                </TableCell>
              ))}
              <TableCell align="right" sx={{ width: 100 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any, index: number) => (
              <TableRow
                key={index}
                hover
                selected={selectedRow === row}
                onClick={() => setSelectedRow(row)}
              >
                {columns.map((column) => (
                  <TableCell key={column.field.toString()}>
                    {column.renderCell
                      ? column.renderCell(row)
                      : column.field in row
                      ? (row[column.field as keyof T] as string)
                      : ""}
                  </TableCell>
                ))}
                <TableCell align="right">
                  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    {onEdit && (
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(row);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    {onDelete && (
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(row);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
