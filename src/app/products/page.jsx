"use client";
import { Box, Button, Modal } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [ratingFilter, setRatingFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionValue, setSuggestionValue] = useState("");
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    setSuggestionValue(event.target.value);
    setShowSuggestions(
      event.target.value.trim().length > 0 && autocompleteSuggestions.length > 0
    );
  };

  const handleRatingChange = (event) => {
    setRatingFilter(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const titleMatch = product.title
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    const ratingMatch =
      ratingFilter === null || product.rating.rate >= ratingFilter;
    const categoryMatch =
      categoryFilter === "" || product.category === categoryFilter;
    return titleMatch && ratingMatch && categoryMatch;
  });

  // For modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    e.preventDefault(); // Prevent default form submission
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // clearing filter
  const clearFilters = () => {
    setSearchValue("");
    setRatingFilter(null);
    setCategoryFilter("");
  };
  //for categories
  const getUniqueCategories = () => {
    const categories = products.map((product) => product.category);
    return [...new Set(categories)];
  };
  // Autocomplete suggestions based on product titles
  const autocompleteSuggestions = products
    .map((product) => product.title)
    .filter((title) => title.toLowerCase().includes(searchValue.toLowerCase()));

  // for sorting prod acc to price
  let sortedProducts = [...filteredProducts];

  if (sortOrder === "asc") {
    sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <form className="max-w-md mx-auto mt-5" onChange={handleInputChange}>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>

              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search products"
                value={searchValue}
                style={{ overflow: "hidden" }}
              />

              <button
                onClick={handleOpen}
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Filter
              </button>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                    display: "flex",
                    justifyContent: "center",
                    // alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <ProductFilters
                    ratingFilter={ratingFilter}
                    handleRatingChange={handleRatingChange}
                    categoryFilter={categoryFilter}
                    handleCategoryChange={handleCategoryChange}
                    sortOrder={sortOrder}
                    handleSortOrderChange={(e) => setSortOrder(e.target.value)}
                    handleClose={handleClose}
                    getUniqueCategories={getUniqueCategories}
                  />
                </Box>
              </Modal>
            </div>
          </form>
          {searchValue && (
            <Button
              variant="contained"
              color="error"
              onClick={() => setSearchValue("")}
            >
              Clear
            </Button>
          )}
        </div>
        {searchValue && autocompleteSuggestions.length > 0 && (
          <>
            <h2>Suggestions</h2>
            {autocompleteSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="autocomplete-suggestion"
                style={{
                  backgroundColor: "#f9f9f9",
                  padding: "10px",
                  cursor: "pointer",
                  width: "50%",
                  marginTop: "10px",
                  overflow: "hidden",
                  borderRadius: "5px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  setSearchValue(suggestion);
                  setSuggestionValue(suggestion);
                  setShowSuggestions(false);
                }}
              >
                {suggestion.slice(0, 100)}...
              </div>
            ))}
          </>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          margin: "10px",
        }}
      >
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1>No products found</h1>
            <Button
              variant="contained"
              style={{ marginTop: "20px" }}
              onClick={clearFilters}
            >
              {" "}
              Clear Filter{" "}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
