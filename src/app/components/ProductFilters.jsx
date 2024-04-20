import React from "react";
import { Button, MenuItem, Select, Typography } from "@mui/material";

const ProductFilters = ({
  ratingFilter,
  handleRatingChange,
  categoryFilter,
  handleCategoryChange,
  sortOrder,
  handleSortOrderChange,
  handleClose,
  getUniqueCategories,
}) => {
  return (
    <>
      <Typography variant="h6" component="h2">
        Filter by Rating
      </Typography>
      <Select
        value={ratingFilter}
        onChange={handleRatingChange}
        displayEmpty
        inputProps={{ "aria-label": "rating" }}
        style={{ marginTop: "10px", width: "100%" }}
      >
        <MenuItem value={null}>All Ratings</MenuItem>
        {[1, 2, 3, 4, 5].map((rating) => (
          <MenuItem key={rating} value={rating}>
            {rating <= 4 ? `Rating ${rating} and above` : `Rating ${rating}`}
          </MenuItem>
        ))}
      </Select>
      <Typography variant="h6" component="h2" style={{ marginTop: "10px" }}>
        Filter by categories
      </Typography>
      <Select
        value={categoryFilter}
        onChange={handleCategoryChange}
        displayEmpty
        inputProps={{ "aria-label": "category" }}
        style={{ marginTop: "10px", width: "100%" }}
      >
        <MenuItem value="">All Categories</MenuItem>
        {getUniqueCategories().map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
      <Typography variant="h6" component="h2" style={{ marginTop: "10px" }}>
        Filter by price
      </Typography>
      <Select
        value={sortOrder || "Price"}
        onChange={handleSortOrderChange}
        displayEmpty
        inputProps={{ "aria-label": "sort-order" }}
        style={{ marginTop: "10px", width: "100%" }}
      >
        <MenuItem value="Price">Prices</MenuItem>
        <MenuItem value="asc">Price: Low to High</MenuItem>
        <MenuItem value="desc">Price: High to Low</MenuItem>
      </Select>
      <Button
        variant="contained"
        className=" bg-blue-700 "
        style={{ marginTop: "20px" }}
        onClick={handleClose}
      >
        Done
      </Button>
    </>
  );
};

export default ProductFilters;
