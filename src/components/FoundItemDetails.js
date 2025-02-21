import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import api from "../api/api";

const FoundItemDetails = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await api.get(`/api/foundItem/get/${id}`);
        setItem(response.data.data);
      } catch (err) {
        setError("Error fetching item details.");
      } finally {
        setLoading(false);
      }
    };
    fetchItemDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container maxWidth="sm" sx={{ mt: 15 }}>
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <CardMedia
          component="img"
          image={item.imageUrl}
          alt={item.itemName}
          sx={{
            width: "100%", 
            height: "auto", 
            objectFit: "contain",
          }}
        />
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            {item.itemName}
          </Typography>
          <Typography variant="body1">{item.description}</Typography>
          <Typography variant="body2">
            <b>Location:</b> {item.location}
          </Typography>
          <Typography variant="body2">
            <b>Category:</b> {item.category}
          </Typography>
          <Typography variant="body2">
            <b>Found Date:</b> {new Date(item.foundDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2">
            <b>Reported By:</b> {item.fullName}
          </Typography>
          <Typography variant="body2">
            <b>Contact:</b> {item.phoneNo}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FoundItemDetails;
