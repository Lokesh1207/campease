import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

const FoundItems = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  // Fetch Logged-In User
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await api.get("/home/getUser");
        setLoggedInUser(response.data);
      } catch (err) {
        console.log("Error fetching logged-in user", err);
      }
    };
    fetchLoggedInUser();
  }, []);

  // Fetch All Found Items
  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/foundItem/getAll");
        setFoundItems(response.data.data);
      } catch (err) {
        console.log("Error fetching found items ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoundItems();
  }, []);

  // Search Items with Debouncing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 500); // 500ms debounce time

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Search API Call
  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/foundItem/search", {
        params: { itemName: searchTerm },
      });
      setSearchResults(response.data);
    } catch (err) {
      console.log("Error fetching found items ", err);
    } finally {
      setLoading(false);
    }
  };

  // Navigation Functions
  const handleMoreInfo = (itemId) => {
    navigate(`/foundItem/${itemId}`);
  };

  const handleEdit = (itemId) => {
    navigate(`/editFoundItem/${itemId}`);
  };

  const handleDelete = async (itemId) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger me-3",
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        // Send DELETE request
        await api.post(`/api/foundItem/delete/${itemId}`);

        // Update State
        setFoundItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
        setSearchResults((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your item has been deleted.",
          icon: "success",
        });
      } catch (err) {
        console.error("Error deleting item: ", err);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the item. Please try again.",
          icon: "error",
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your item is safe :)",
        icon: "error",
      });
    }
  };

  // Get Display Items: Either Search Results or All Found Items
  const displayItems = searchTerm ? searchResults : foundItems;

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      {/* Search Field */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search found items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          mb: 3,
          bgcolor: "white",
          borderRadius: 1,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#1976D2",
            },
            "&:hover fieldset": {
              borderColor: "#1565C0",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1565C0",
            },
          },
        }}
      />

      {loading && <CircularProgress />}

      <Grid container spacing={3}>
        {!loading && displayItems.length > 0
          ? displayItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  sx={{
                    p: 2,
                    bgcolor: "#E3F2FD",
                    boxShadow: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: 0,
                    border: "1px solid #BBDEFB",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={item.imageUrl}
                    alt={item.itemName}
                    sx={{
                      mb: 2,
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <CardContent sx={{ textAlign: "center", width: "100%" }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="primary"
                      gutterBottom
                    >
                      {item.itemName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mb: 1 }}
                    >
                      {item.description}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      display="block"
                    >
                      <b>Location:</b> {item.location}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      display="block"
                    >
                      <b>Category:</b> {item.category}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      display="block"
                    >
                      <b>Found Date:</b>{" "}
                      {new Date(item.foundDate).toLocaleDateString()}
                    </Typography>
                  </CardContent>

                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      bgcolor: "#1976D2",
                      color: "#fff",
                      "&:hover": {
                        bgcolor: "#1565C0",
                        transform: "scale(1.05)",
                        transition: "0.2s ease-in-out",
                      },
                    }}
                    onClick={() => handleMoreInfo(item.id)}
                  >
                    More Info
                  </Button>

                  {item.userName === loggedInUser?.username && (
                    <Button
                      variant="outlined"
                      sx={{ mt: 1, color: "#1565C0" }}
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </Button>
                  )}

                  {item.userName === loggedInUser?.username && (
                    <Button
                      variant="outlined"
                      sx={{ mt: 1, color: "#1565C0" }}
                      onClick={() => handleDelete(item.id)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  )}
                </Card>
              </Grid>
            ))
          : !loading && (
              <Typography
                variant="h6"
                sx={{ textAlign: "center", width: "100%" }}
              >
                No found items found.
              </Typography>
            )}
      </Grid>
    </Container>
  );
};

export default FoundItems;
