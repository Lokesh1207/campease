import React, { useState, useEffect } from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  CircularProgress,
  IconButton,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Send as SendIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import api from "../api/api";
import ReviewDetailsModal from "../components/ReviewDetailsModal";
import Swal from "sweetalert2";

const PlacementPage = () => {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [reviews, setReviews] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState([]);
  const [newReview, setNewReview] = useState({
    companyName: "",
    role: "",
    salaryPackage: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (review) => {
    setSelectedReview(review);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedReview(null);
  };

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

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/review/get?year=${year}`);
      setReviews(response.data.data);
    } catch (error) {
      console.error("Error fetching reviews", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [year]);

  const handleDelete = async (id) => {
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
        await api.post(`/review/delete/${id}`);
        fetchReviews();
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your review has been deleted.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error deleting review", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the review. Please try again.",
          icon: "error",
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your review is safe :)",
        icon: "error",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/review/save", newReview);
      setNewReview({
        companyName: "",
        role: "",
        salaryPackage: "",
        date: new Date().toISOString().split("T")[0],
        description: "",
      });
      fetchReviews();
    } catch (error) {
      console.error("Error saving review", error);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
        <Container>
          <Navbar.Brand href="/">CampEase - Placements</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link disabled>Welcome, {loggedInUser.fullName}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-15">
        {/* Year Selection */}
        <Row className="justify-content-center mb-4">
          <Col md={4} className="d-flex gap-2">
            <Select
              fullWidth
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <MenuItem
                  key={i}
                  value={(new Date().getFullYear() - i).toString()}
                >
                  {new Date().getFullYear() - i}
                </MenuItem>
              ))}
            </Select>
            <Button variant="contained" color="primary" onClick={fetchReviews}>
              <SearchIcon />
            </Button>
          </Col>
        </Row>

        {/* Review Form */}
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow">
              <CardContent>
                <Typography variant="h6" className="fw-semibold mb-3">
                  📝 Share Your Experience
                </Typography>
                <TextField
                  fullWidth
                  label="Company Name"
                  variant="outlined"
                  value={newReview.companyName}
                  onChange={(e) =>
                    setNewReview({ ...newReview, companyName: e.target.value })
                  }
                  className="mb-3"
                />
                <TextField
                  fullWidth
                  label="Role"
                  variant="outlined"
                  value={newReview.role}
                  onChange={(e) =>
                    setNewReview({ ...newReview, role: e.target.value })
                  }
                  className="mb-3"
                />
                <TextField
                  fullWidth
                  label="Salary Package"
                  variant="outlined"
                  value={newReview.salaryPackage}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      salaryPackage: e.target.value,
                    })
                  }
                  className="mb-3"
                />
                <TextField
                  fullWidth
                  label="Date of Placement"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={newReview.date}
                  onChange={(e) =>
                    setNewReview({ ...newReview, date: e.target.value })
                  }
                  className="mb-3"
                />
                <TextField
                  fullWidth
                  label="Describe your experience..."
                  variant="outlined"
                  multiline
                  rows={7}
                  value={newReview.description}
                  onChange={(e) =>
                    setNewReview({ ...newReview, description: e.target.value })
                  }
                  className="mb-3"
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                  endIcon={<SendIcon />}
                >
                  Submit Review
                </Button>
              </CardContent>
            </Card>
          </Col>
        </Row>

        {/* Reviews List */}
        <Row className="justify-content-center mt-4">
          <Col md={8}>
            {loading ? (
              <div className="text-center">
                <CircularProgress />
              </div>
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <Card key={review.id} className="shadow-sm mb-3">
                  <CardContent className="d-flex justify-content-between align-items-center">
                    <div>
                      <Typography variant="subtitle1" className="fw-semibold">
                        {review.companyName} - {review.role}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Salary: {review.salaryPackage}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Date: {review.date}
                      </Typography>
                      <Typography variant="body2">
                        {review.description.length > 150
                          ? `${review.description.substring(0, 150)}...`
                          : review.description}
                      </Typography>
                      {review.description.length > 150 && (
                        <IconButton
                          color="primary"
                          onClick={() => handleOpen(review)}
                        >
                          <VisibilityIcon /> {/* View Icon */}
                        </IconButton>
                      )}
                      {/* ✅ Show Delete Button Only If Logged-in User Matches Review Owner */}
                      {review.username === loggedInUser?.username && (
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(review.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body2" className="text-center text-muted">
                No reviews found for {year}.
              </Typography>
            )}
          </Col>
        </Row>

        {/* Full Review Modal */}
        <ReviewDetailsModal
          open={open}
          onClose={handleClose}
          review={selectedReview}
        />
      </Container>
      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p>&copy; {new Date().getFullYear()} CampEase - All Rights Reserved</p>
      </footer>
    </>
  );
};

export default PlacementPage;
