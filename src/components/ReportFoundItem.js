// ReportFoundItemPage.js
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import api from "../api/api";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

const ReportFoundItem = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    location: "",
    category: "",
    foundDate: "",
  });
  const [file, setFile] = useState(null);

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (
  //     !formData.itemName ||
  //     !formData.description ||
  //     !formData.location ||
  //     !formData.category ||
  //     !formData.foundDate
  //   ) {
  //     console.log("Required fields");
  //     return;
  //   }

  //   const formDataToSend = new FormData();
  //   formDataToSend.append("foundItemRequestDto", JSON.stringify(formData));
  //   if (file) {
  //     formDataToSend.append("file", file);
  //   }

  //   try {
  //     const response = await api.post("api/foundItem/save", formDataToSend, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     console.log(response);

  //     setFormData({
  //       itemName: "",
  //       description: "",
  //       location: "",
  //       category: "",
  //       foundDate: "",
  //     });
  //     setFile(null);
  //   } catch (error) {
  //     console.log("Failed to report found item.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.itemName ||
      !formData.description ||
      !formData.location ||
      !formData.category ||
      !formData.foundDate
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("foundItemRequestDto", JSON.stringify(formData));
    if (file) {
      formDataToSend.append("file", file);
    }

    try {
      await api.post("api/foundItem/save", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Found item has been reported successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      setFormData({
        itemName: "",
        description: "",
        location: "",
        category: "",
        foundDate: "",
      });
      setFile(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong, please try again.",
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Report a Found Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Item Name"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
          required
        />
        <TextField
          fullWidth
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          margin="normal"
          required
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Select Date & Time"
            value={formData.foundDate ? dayjs(formData.foundDate) : null}
            onChange={(newValue) => {
              if (newValue) {
                setFormData({
                  ...formData,
                  foundDate: dayjs(newValue).format("YYYY-MM-DDTHH:mm:ss"),
                });
              }
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
                margin: "normal",
              },
            }}
          />
        </LocalizationProvider>

        {/* File Upload Input */}
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
          {file && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body2" sx={{ ml: 2, color: "#444" }}>
                {file.name}
              </Typography>
              <IconButton onClick={handleRemoveFile} sx={{ color: "#D32F2F" }}>
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
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ReportFoundItem;
