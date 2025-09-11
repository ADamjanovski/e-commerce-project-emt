import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getPaginatedProducts,
  getProductsByCategory,
  getAllCategories,
  DisplayCategoryDto,
} from "../api";
import {
  Grid,
  CircularProgress,
  Alert,
  Pagination,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import ProductCard from "../components/ProductCard";

const PAGE_SIZE = 9;

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  // Query for fetching categories for the sidebar
  const { data: categories } = useQuery<DisplayCategoryDto[]>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  // This is the key part: TanStack Query manages fetching based on dependencies.
  // The `queryKey` includes `selectedCategoryId` and `page`.
  // If either changes, TanStack Query will automatically re-fetch the data.
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", { category: selectedCategoryId, page }],
    queryFn: () => {
      const pageable = { page: page - 1, size: PAGE_SIZE, sort: ["name,asc"] };
      if (selectedCategoryId) {
        return getProductsByCategory(selectedCategoryId, pageable);
      }
      return getPaginatedProducts(pageable);
    },
    // keepPreviousData makes the UX smoother when changing pages
    keepPreviousData: true,
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategoryId(categoryId);
    setPage(1); // Reset to the first page when category changes
  };

  return (
    <Grid container spacing={4}>
      {/* Category Sidebar */}
      <Grid item xs={12} md={3}>
        <Paper elevation={1}>
          <Typography variant="h6" sx={{ p: 2 }}>
            Categories
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedCategoryId === null}
                onClick={() => handleCategorySelect(null)}
              >
                <ListItemText primary="All Products" />
              </ListItemButton>
            </ListItem>
            {categories?.map((category) => (
              <ListItem key={category.id} disablePadding>
                <ListItemButton
                  selected={selectedCategoryId === category.id}
                  onClick={() => handleCategorySelect(category.id!)}
                >
                  <ListItemText primary={category.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      {/* Products Grid */}
      <Grid item xs={12} md={9}>
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {isError && (
          <Alert severity="error">
            Error fetching products: {(error as Error).message}
          </Alert>
        )}

        {data && (
          <>
            <Grid container spacing={4}>
              {data.content?.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={data.total_pages || 0}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default HomePage;