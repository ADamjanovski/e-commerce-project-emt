// import { useState } from "react";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import {
//   getPaginatedProducts,
//   getProductsByCategory,
//   getAllCategories,
//   type DisplayCategoryDto,
//   type PageDisplayProductDto,
// } from "../api";
// import {
//   Grid, // This import is crucial
//   CircularProgress,
//   Alert,
//   Pagination,
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Paper,
// } from "@mui/material";
// import ProductCard from "../components/ProductCard";

// const PAGE_SIZE = 9;

// const HomePage = () => {
//   const [page, setPage] = useState(1);
//   const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
//     null,
//   );

//   const { data: categories } = useQuery<DisplayCategoryDto[]>({
//     queryKey: ["categories"],
//     queryFn: getAllCategories,
//   });

//   const { data, isLoading, isError, error } = useQuery<PageDisplayProductDto>({
//     queryKey: ["products", { category: selectedCategoryId, page }],
//     queryFn: () => {
//       const pageable = { page: page - 1, size: PAGE_SIZE, sort: ["name,asc"] };
//       if (selectedCategoryId) {
//         return getProductsByCategory(selectedCategoryId, pageable);
//       }
//       return getPaginatedProducts(pageable);
//     },
//     placeholderData: keepPreviousData,
//   });

//   const handlePageChange = (
//     _event: React.ChangeEvent<unknown>,
//     value: number,
//   ) => {
//     setPage(value);
//   };

//   const handleCategorySelect = (categoryId: number | null) => {
//     setSelectedCategoryId(categoryId);
//     setPage(1);
//   };

//   return (
//     // This is a Grid container
//     <Grid container spacing={4}>
//       {/* This is a Grid item */}
//       <Grid item xs={12} md={3}>
//         <Paper elevation={1}>
//           <Typography variant="h6" sx={{ p: 2 }}>
//             Categories
//           </Typography>
//           <List>
//             <ListItem disablePadding>
//               <ListItemButton
//                 selected={selectedCategoryId === null}
//                 onClick={() => handleCategorySelect(null)}
//               >
//                 <ListItemText primary="All Products" />
//               </ListItemButton>
//             </ListItem>
//             {categories?.map((category) => (
//               <ListItem key={category.id} disablePadding>
//                 <ListItemButton
//                   selected={selectedCategoryId === category.id}
//                   onClick={() => handleCategorySelect(category.id!)}
//                 >
//                   <ListItemText primary={category.name} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>
//         </Paper>
//       </Grid>

//       {/* This is another Grid item */}
//       <Grid item xs={12} md={9}>
//         {isLoading && (
//           <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//             <CircularProgress />
//           </Box>
//         )}
//         {isError && (
//           <Alert severity="error">
//             Error fetching products: {(error as Error).message}
//           </Alert>
//         )}

//         {data && (
//           <>
//             {/* This is a nested Grid container */}
//             <Grid container spacing={4}>
//               {data.content?.map((product) => (
//                 // And these are its Grid items. The 'item' prop is correct.
//                 <Grid item key={product.id} xs={12} sm={6} md={4}>
//                   <ProductCard product={product} />
//                 </Grid>
//               ))}
//             </Grid>

//             <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//               <Pagination
//                 count={data.total_pages || 0}
//                 page={page}
//                 onChange={handlePageChange}
//                 color="primary"
//               />
//             </Box>
//           </>
//         )}
//       </Grid>
//     </Grid>
//   );
// };

// export default HomePage;