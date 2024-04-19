import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card
      className="card"
      sx={{
        maxWidth: 345,
        borderRadius: "10px",
        margin: "20px 10px",
        minHeight: "400px",
      }}
    >
      <CardMedia
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
          {product.description.slice(0, 120)}...
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
