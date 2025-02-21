import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Button,
  Card,
  Carousel,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../FindMyThing.css";

const FindMyStuff = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [recentFoundItems, setRecentFoundItems] = useState([]);
  const [recentLostItems, setRecentLostItems] = useState([]);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await api.get("/home/");
        setUsername(response.data);
      } catch (err) {
        console.error("Error fetching username:", err);
      }
    };
    fetchUsername();
  }, []);

  useEffect(() => {
    const fetchRecentFoundItems = async () => {
      try {
        const response = await api.get("api/foundItem/getRecentFoundItems");
        setRecentFoundItems(response.data);
      } catch (err) {
        console.error("Error fetching recent found items:", err);
      }
    };
    fetchRecentFoundItems();
  }, []);

  // Fetch Recent Lost Items
  useEffect(() => {
    const fetchRecentLostItems = async () => {
      try {
        const response = await api.get("api/lostItem/getRecent");
        setRecentLostItems(response.data);
      } catch (err) {
        console.error("Error fetching recent lost items:", err);
      }
    };
    fetchRecentLostItems();
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
        <Container>
          <Navbar.Brand href="/">CampEase - Find My Stuff</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link disabled>Welcome, {username}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section
        style={{
          backgroundImage:
            "linear-gradient(135deg, #74ebd5 0%,rgb(149, 165, 233) 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          color: "white",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
        className="text-white"
      >
        <Container>
          <h1 className="display-4 fw-bold">
            Lost Something? Found Something?
          </h1>
          <p className="lead">
            Connect with others and reunite with your belongings at CampEase.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="mb-2"
            onClick={() => navigate("/report-lost-item")}
          >
            Report Lost Item
          </Button>{" "}
          <Button
            variant="success"
            size="lg"
            className="mb-2"
            onClick={() => navigate("/report-found-item")}
          >
            Report Found Item
          </Button>
        </Container>
      </section>

      {/* Why Use Find My Stuff Section */}
      <Container className="py-5">
        <h2 className="text-center mb-4">Why Use Find My Stuff?</h2>
        <Row>
          <Col md={3} className="mb-4">
            <Card className="shadow-sm text-center">
              <Card.Body>
                <Card.Title>
                  <i className="fas fa-search-plus fa-3x"></i>
                </Card.Title>
                <Card.Text>
                  <h4>Report Lost Item</h4> Quickly report any lost items and
                  help others find their belongings.
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => navigate("/report-lost-item")}
                >
                  Report Lost Item
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="shadow-sm text-center">
              <Card.Body>
                <Card.Title>
                  <i className="fas fa-check-circle fa-3x"></i>
                </Card.Title>
                <Card.Text>
                  <h4>Report Found Item</h4> If you find something, you can
                  report it here to help someone reconnect with their property.
                </Card.Text>
                <Button
                  variant="success"
                  onClick={() => navigate("/report-found-item")}
                >
                  Report Found Item
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="shadow-sm text-center">
              <Card.Body>
                <Card.Title>
                  <i className="fas fa-search fa-3x"></i>
                </Card.Title>
                <Card.Text>
                  <h4>View Lost Items</h4> Browse through all reported lost
                  items and see if you’ve lost something.
                </Card.Text>
                <Button
                  variant="danger"
                  onClick={() => navigate("/lost-items")}
                >
                  View Lost Items
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="shadow-sm text-center">
              <Card.Body>
                <Card.Title>
                  <i className="fas fa-box-open fa-3x"></i>
                </Card.Title>
                <Card.Text>
                  <h4>View Found Items</h4> Browse through the found items and
                  claim what’s yours!
                </Card.Text>
                <Button variant="info" onClick={() => navigate("/found-items")}>
                  View Found Items
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Recently Found Items Carousel */}
      <Container className="py-5">
        <h2 className="text-center mb-4">Recently Found Items</h2>
        <Carousel
          interval={2000}
          pause="hover"
          indicators={false}
          prevIcon={
            <span
              className="carousel-control-prev-icon"
              style={{ backgroundColor: "black", borderRadius: "50%" }}
            />
          }
          nextIcon={
            <span
              className="carousel-control-next-icon"
              style={{ backgroundColor: "black", borderRadius: "50%" }}
            />
          }
        >
          {recentFoundItems.map((item, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={item.imageUrl}
                alt={item.itemName}
                height="250"
                style={{ objectFit: "contain" }}
              />
              <Carousel.Caption>
                <h5>{item.itemName}</h5>
                <p>{item.location}</p>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/foundItem/${item.id}`)}
                >
                  View Details
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      {/* Recently Lost Items Carousel */}
      <Container className="pb-5">
        <h2 className="text-center mb-4">Recently Lost Items</h2>
        <Carousel
          interval={2000}
          pause="hover"
          indicators={false}
          prevIcon={
            <span
              className="carousel-control-prev-icon"
              style={{ backgroundColor: "black", borderRadius: "50%" }}
            />
          }
          nextIcon={
            <span
              className="carousel-control-next-icon"
              style={{ backgroundColor: "black", borderRadius: "50%" }}
            />
          }
        >
          {recentLostItems.map((item, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={item.imageUrl}
                alt={item.itemName}
                height="250"
                style={{ objectFit: "contain" }}
              />
              <Carousel.Caption>
                <h5>{item.itemName}</h5>
                <p>{item.location}</p>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/lostItem/${item.id}`)}
                >
                  View Details
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p>&copy; {new Date().getFullYear()} CampEase - All Rights Reserved</p>
      </footer>
    </>
  );
};

export default FindMyStuff;
