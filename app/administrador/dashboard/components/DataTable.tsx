"use client";

import { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from "@mui/material";

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
  totalCount: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

export default function DataTable<T>({
  data,
  columns,
  totalCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: DataTableProps<T>) {
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange(0);
  };

  return (
    <Paper elevation={0} sx={{ p: 0 }}>
      <TableContainer>
        {data.length === 0 ? (
          <Box
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              color: "text.secondary",
            }}
          >
            <Typography variant="h6">No data available</Typography>
            <Typography variant="body2">
              Click the button above to add a new item
            </Typography>
          </Box>
        ) : (
          <>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </TableContainer>
    </Paper>
  );
}
