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

const EditLostItem = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [lostItem, setLostItem] = useState({
    itemName: "",
    description: "",
    location: "",
    category: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchLostItem = async () => {
      try {
        const response = await api.get(`/api/lostItem/get/${id}`);
        setLostItem(response.data.data);
      } catch (err) {
        console.log("Error fetching lost item:", err);
      }
    };
    fetchLostItem();
  }, [id]);

  const handleChange = (e) => {
    setLostItem({
      ...lostItem,
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
    formData.append("lostItemRequestDto", JSON.stringify(lostItem));
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const response = await api.post(`/api/lostItem/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Lost item updated successfully!");
      navigate("/lost-items"); // Redirect to the lost items list
    } catch (err) {
      console.log("Error updating lost item:", err);
      alert("Failed to update lost item. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Item Name"
            name="itemName"
            value={lostItem.itemName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={lostItem.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label="Location"
            name="location"
            value={lostItem.location}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            name="category"
            value={lostItem.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {/* <TextField
            label="Lost Date"
            name="lostDate"
            value={lostItem.lostDate}
            onChange={handleChange}
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          /> */}
          {/* Display Existing Image */}
          {lostItem.imageUrl && (
            <CardMedia
              component="img"
              image={lostItem.imageUrl}
              alt={lostItem.itemName}
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

export default EditLostItem;
