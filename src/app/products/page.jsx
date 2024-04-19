"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, Modal, MenuItem, Select, Rating } from "@mui/material";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [ratingFilter, setRatingFilter] = useState(null);

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
  };

  const handleRatingChange = (event) => {
    setRatingFilter(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const titleMatch = product.title
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    const ratingMatch =
      ratingFilter === null || product.rating.rate >= ratingFilter;
    return titleMatch && ratingMatch;
  });

  // For modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    e.preventDefault(); // Prevent default form submission
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <>
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
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Filter by Rating
              </Typography>
              <Select
                value={ratingFilter}
                onChange={handleRatingChange}
                displayEmpty
                inputProps={{ "aria-label": "rating" }}
                style={{ marginTop: "10px" }}
              >
                <MenuItem value={null}>All Ratings</MenuItem>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <MenuItem key={rating} value={rating}>
                    Rating {rating} and above
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Modal>
        </div>
      </form>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          margin: "10px",
        }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id}>
              <Card
                key={product.id}
                className="card"
                sx={{
                  maxWidth: 345,
                  borderRadius: "10px",
                  margin: "20px 10px",
                  minHeight: "400px",
                }}
              >
                <CardMedia
                  className="product-card"
                  component="img"
                  alt={product.title}
                  height="140"
                  src={product.image}
                  sx={{
                    objectFit: "contain",
                    height: "150px",
                    padding: "10px",
                  }}
                />

                <CardContent>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      gap: "1rem",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      {product.title.slice(0, 10)}...
                      <Rating
                        name="read-only"
                        value={product.rating.rate}
                        readOnly
                        precision={0.5}
                        sx={{
                          marginLeft: "20px",
                        }}
                      />
                    </Typography>
                  </div>
                  <Typography
                    style={{
                      fontSize: "20px",
                      fontWeight: "800",
                      marginBottom: "5px",
                    }}
                  >
                    {product.price}$
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description.slice(0, 100)}...
                  </Typography>
                </CardContent>
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <button className="explore-button">Explore</button>
                </CardActions>
              </Card>
            </div>
          ))
        ) : (
          <h1>No products found</h1>
        )}
      </div>
    </>
  );
};

export default Home;
