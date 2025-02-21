import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardMedia,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import DeleteIcon from "@mui/icons-material/Delete";

const EditFoundItem = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [foundItem, setFoundItem] = useState({
    itemName: "",
    description: "",
    location: "",
    category: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchFoundItem = async () => {
      try {
        const response = await api.get(`/api/foundItem/get/${id}`);
        setFoundItem(response.data.data);
      } catch (err) {
        console.log("Error fetching found item:", err);
      }
    };
    fetchFoundItem();
  }, [id]);

  const handleChange = (e) => {
    setFoundItem({
      ...foundItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("foundItemRequestDto", JSON.stringify(foundItem));
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const response = await api.post(`/api/foundItem/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Found item updated successfully!");
      navigate("/found-items"); // Redirect to the found items list
    } catch (err) {
      console.log("Error updating found item:", err);
      alert("Failed to update found item. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Item Name"
            name="itemName"
            value={foundItem.itemName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={foundItem.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label="Location"
            name="location"
            value={foundItem.location}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            name="category"
            value={foundItem.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          
          {/* Display Existing Image */}
          {foundItem.imageUrl && (
            <CardMedia
              component="img"
              image={foundItem.imageUrl}
              alt={foundItem.itemName}
              sx={{
                mt: 2,
                mb: 2,
                width: "100%",
                height: "auto",
                objectFit: "contain",
                borderRadius: 1,
                boxShadow: 2,
              }}
            />
          )}
          {/* Upload New Image */}
          <div>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              id="upload-button"
              style={{ display: "none" }} 
            />
            <label htmlFor="upload-button">
              <Button
                variant="contained"
                component="span"
                sx={{
                  mt: 2,
                  bgcolor: "#1976D2",
                  color: "#fff", 
                  "&:hover": {
                    bgcolor: "#1565C0", 
                    color: "#fff", 
                  },
                }}
              >
                Upload New Image
              </Button>
            </label>
            {selectedFile && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" sx={{ ml: 2, color: "#444" }}>
                  {selectedFile.name}
                </Typography>
                <IconButton
                  onClick={handleRemoveFile}
                  sx={{ color: "#D32F2F" }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: "#1976D2",
              "&:hover": {
                bgcolor: "#1565C0",
              },
            }}
          >
            Update Item
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default EditFoundItem;
