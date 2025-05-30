"use client";

import { useState, useEffect } from "react";
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
  TextField,
  InputAdornment,
  IconButton,
  TableSortLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Chip,
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon, FilterList as FilterListIcon } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface Column<T> {
  field: keyof T | string;
  headerName: string;
  width?: number;
  renderCell?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface Filter {
  field: string;
  value: any;
  operator: string;
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
  onSearch?: (searchTerm: string) => void;
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  showSearch?: boolean;
  searchPlaceholder?: string;
}

export default function DataTable<T>({
  data,
  columns,
  totalCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onSearch,
  onSort,
  showSearch = false,
  searchPlaceholder = "Search...",
}: DataTableProps<T>) {
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState<string>("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [openFilters, setOpenFilters] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [tempFilter, setTempFilter] = useState<Filter>({
    field: "",
      operator: "contains",
    value: "",
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange(0);
  };

  const handleSort = (field: string) => {
    const isAsc = orderBy === field && order === "asc";
    const newOrder = isAsc ? "desc" : "asc";
    setOrder(newOrder);
    setOrderBy(field);
    if (onSort) {
      onSort(field, newOrder);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    if (onSearch) {
      onSearch("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleAddFilter = () => {
    if (tempFilter.field && tempFilter.value) {
      setFilters([...filters, tempFilter]);
      setTempFilter({ field: "", value: "", operator: "contains" });
    }
  };

  const handleRemoveFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const handleApplyFilters = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
    setOpenFilters(false);
  };

  const handleClearFilters = () => {
    setFilters([]);
    if (onSearch) {
      onSearch("");
    }
  };

  const renderFilterDialog = () => (
    <Dialog open={openFilters} onClose={() => setOpenFilters(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Advanced Filters</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Field</InputLabel>
            <Select
              value={tempFilter.field}
              label="Field"
              onChange={(e) => setTempFilter({ ...tempFilter, field: e.target.value })}
            >
              {columns
                .filter((col) => col.sortable !== false)
                .map((col) => (
                  <MenuItem key={col.field.toString()} value={col.field.toString()}>
                    {col.headerName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Operator</InputLabel>
            <Select
              value={tempFilter.operator}
              label="Operator"
              onChange={(e) => setTempFilter({ ...tempFilter, operator: e.target.value })}
            >
              <MenuItem value="contains">Contains</MenuItem>
              <MenuItem value="equals">Equals</MenuItem>
              <MenuItem value="startsWith">Starts with</MenuItem>
              <MenuItem value="endsWith">Ends with</MenuItem>
              <MenuItem value="greaterThan">Greater than</MenuItem>
              <MenuItem value="lessThan">Less than</MenuItem>
            </Select>
          </FormControl>

          {tempFilter.field === "created_at" ? (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={tempFilter.value ? new Date(tempFilter.value) : null}
                onChange={(date) => setTempFilter({ ...tempFilter, value: date?.toISOString() || "" })}
              />
            </LocalizationProvider>
          ) : (
            <TextField
              label="Value"
              value={tempFilter.value}
              onChange={(e) => setTempFilter({ ...tempFilter, value: e.target.value })}
              fullWidth
            />
          )}

          <Button variant="outlined" onClick={handleAddFilter} fullWidth>
            Add Filter
          </Button>

          {filters.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Active Filters:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {filters.map((filter, index) => (
                  <Chip
                    key={index}
                    label={`${filter.field} ${filter.operator} ${filter.value}`}
                    onDelete={() => handleRemoveFilter(index)}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClearFilters}>Clear All</Button>
        <Button onClick={() => setOpenFilters(false)}>Cancel</Button>
        <Button onClick={handleApplyFilters} variant="contained">
          Apply Filters
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Paper elevation={0} sx={{ p: 0 }}>
      <Box 
        sx={{ 
          p: 2, 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper"
        }}
      >
        {showSearch && (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", flex: 1, maxWidth: 700 }}>
            <TextField
              fullWidth
              size="small" 
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton 
                      size="small" 
                      onClick={handleClearSearch}
                      sx={{ 
                        color: "text.secondary",
                        "&:hover": {
                          color: "primary.main"
                        }
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
                "& .MuiInputBase-input": {
                  marginTop: "7px !important",
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                minWidth: 100,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
                mt: '7px',
                height: '100%',
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              Search
            </Button>
          </Box>
        )}
      </Box>

      {renderFilterDialog()}

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
              Try adjusting your search or filters
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
                      sortDirection={orderBy === column.field.toString() ? order : false}
                    >
                      {column.sortable ? (
                        <TableSortLabel
                          active={orderBy === column.field.toString()}
                          direction={orderBy === column.field.toString() ? order : "asc"}
                          onClick={() => handleSort(column.field.toString())}
                        >
                          {column.headerName}
                        </TableSortLabel>
                      ) : (
                        column.headerName
                      )}
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
