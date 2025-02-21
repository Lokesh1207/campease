import React, { useEffect, useState } from "react";
import { Container, Button, Card, CardBody, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { AccountCircle, Person, Logout } from "@mui/icons-material";
import PhoneNumberModal from "../components/PhoneNumberModal";

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get("/home/getUser");
        setUsername(response.data.fullName);

        if (!response.data.phoneNo) {
          setShowPhoneModal(true);
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div>
      {/* MUI Navbar */}
      <AppBar
        position="fixed"
        color="default"
        sx={{ boxShadow: 3, backgroundColor: "dark" }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CampEase
          </Typography>

          {/* Account Circle Icon */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle sx={{ color: "#555" }} />
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            sx={{ mt: 1 }}
            PaperProps={{
              sx: {
                boxShadow: 3,
                borderRadius: 2,
              },
            }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              sx={{
                "&:hover": {
                  bgcolor: "#FFEBEE", // Light red background on hover
                },
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <section
        className="text-light text-center d-flex align-items-center position-relative"
        style={{
          background:
            "url('https://content.jdmagicbox.com/v2/comp/chennai/29/044p7025029/catalogue/kcg-college-of-technology-karapakkam-chennai-engineering-colleges-57h6cqslpe.jpg?fit=around%7C350:350&crop=350:350;*,*') no-repeat center center/cover",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Overlay for Reduced Opacity */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        ></div>

        <Container style={{ zIndex: 2 }}>
          <h1 className="display-3 fw-bold">Welcome to CampEase 🚀</h1>
          <h2 className="lead">Making College Life Easier, Together!</h2>
          <h3 className="mt-3">Hello, {username}</h3>
          <Button
            color="primary"
            size="lg"
            className="mt-4"
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              });
            }}
          >
            Explore Now
          </Button>
        </Container>
      </section>

      {/* Feature Cards */}
      <Container className="my-5">
        <Row className="text-center">
          <Col md={6} className="mb-4">
            <Card className="h-100 shadow border-0 rounded-4 hover-shadow">
              <CardBody>
                <Typography variant="h5" className="fw-bold">
                  Find My Stuff
                </Typography>
                <p className="text-muted">
                  Report lost items and find what you’ve lost.
                </p>
                <Button
                  color="primary"
                  onClick={() => navigate("/findMyThing")}
                >
                  Explore
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="h-100 shadow border-0 rounded-4 hover-shadow">
              <CardBody>
                <Typography variant="h5" className="fw-bold">
                  Ride Sharing
                </Typography>
                <p className="text-muted">
                  Share and find rides within your college campus.
                </p>
                <Button
                  color="primary"
                  onClick={() => navigate("/ride-sharing")}
                >
                  Explore
                </Button>
              </CardBody>
            </Card>
          </Col>

          {/* Placement Reviews Card */}
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow border-0 rounded-4 hover-shadow">
              <CardBody>
                <Typography variant="h5" className="fw-bold">
                  Placement Reviews
                </Typography>
                <p className="text-muted">
                  Read and share your placement experiences.
                </p>
                <Button color="success" onClick={() => navigate("/placements")}>
                  Explore
                </Button>
              </CardBody>
            </Card>
          </Col>

          {/* Notes Upload & Download Card */}
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow border-0 rounded-4 hover-shadow">
              <CardBody>
                <Typography variant="h5" className="fw-bold">
                  Notes Sharing
                </Typography>
                <p className="text-muted">
                  Upload and download subject notes for easy access.
                </p>
                <Button color="success" onClick={() => navigate("/notes")}>
                  Explore
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Phone Number Modal */}
      <PhoneNumberModal
        open={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
      />

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p>&copy; {new Date().getFullYear()} CampEase - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Home;
