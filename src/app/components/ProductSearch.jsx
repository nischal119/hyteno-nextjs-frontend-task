import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

const ProductSearch = ({
  searchValue,
  handleInputChange,
  suggestionValue,
  handleOpen,
  handleClose,
  showSuggestions,
  autocompleteSuggestions,
  setSearchValue,
  setSuggestionValue,
  setShowSuggestions,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
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
            value={suggestionValue}
            style={{ overflow: "hidden" }}
          />

          <button
            onClick={handleOpen}
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Filter
          </button>
          <Modal
            open={showSuggestions}
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
                flexDirection: "column",
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{ justifySelf: "flex-start" }}
              >
                Suggestions
              </Typography>

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
                    height: "30px",
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
            </Box>
          </Modal>
        </div>
      </form>
    </div>
  );
};

export default ProductSearch;
