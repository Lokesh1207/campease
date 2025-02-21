import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { TextField, IconButton, Typography } from "@mui/material";
import { CloudUpload, Download, Search, School } from "@mui/icons-material";
import api from "../api/api";
import { Nav, Navbar } from "react-bootstrap";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({
    subject: "",
    semester: "",
    department: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

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

  const fetchNotes = async () => {
    try {
      const response = await api.get("/api/notes/getAll");
      setNotes(response.data.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (
      !newNote.subject ||
      !newNote.semester ||
      !newNote.department ||
      !selectedFile
    ) {
      alert("Please fill all fields and select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("notes", JSON.stringify(newNote));
    formData.append("pdf", selectedFile);

    try {
      await api.post("/api/notes/save", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setModalOpen(false);
      fetchNotes();
    } catch (error) {
      console.error("Error uploading notes:", error);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* Navbar - Fixed at the top */}
      <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
        <Container>
          <Navbar.Brand href="/">CampEase - Notes Sharing</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link disabled>Welcome, {loggedInUser.fullName}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content - Flex-grow pushes the footer to the bottom */}
      <Container className="mt-5 pt-5 flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Typography variant="h4" fontWeight="bold" color="primary">
            📚 Notes Sharing
          </Typography>
          <Button
            color="primary"
            className="rounded-3"
            onClick={() => setModalOpen(true)}
          >
            <CloudUpload className="me-2" /> Upload Notes
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <TextField
            label="Search Notes"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <Search />
                </IconButton>
              ),
            }}
          />
        </div>

        {/* Notes Display */}
        <Row>
          {notes
            .filter((note) =>
              note.subject.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((note) => (
              <Col md={4} key={note.id} className="mb-4">
                <Card className="shadow border-0 rounded-4 hover-shadow">
                  <CardBody>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {note.subject}
                    </Typography>
                    <Typography variant="body2" className="text-muted">
                      <School fontSize="small" style={{ marginRight: 4 }} />
                      {note.department} - Semester {note.semester}
                    </Typography>
                    <Typography variant="body2" className="text-secondary">
                      Uploaded by: <strong>{note.fullName}</strong>
                    </Typography>
                    <Typography variant="body2" className="text-muted">
                      {new Date(note.uploadDate).toLocaleDateString()}
                    </Typography>
                    <Button
                      color="success"
                      size="sm"
                      className="mt-2"
                      onClick={() => window.open(note.fileUrl, "_blank")}
                    >
                      <Download className="me-1" /> Download
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
        </Row>

        {/* Upload Modal */}
        <Modal
          isOpen={modalOpen}
          toggle={() => setModalOpen(!modalOpen)}
          style={{ marginTop: "200px" }}
        >
          <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
            Upload Notes
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Subject</Label>
                <Input
                  type="text"
                  placeholder="Enter subject"
                  value={newNote.subject}
                  onChange={(e) =>
                    setNewNote({ ...newNote, subject: e.target.value })
                  }
                />
              </FormGroup>

              {/* Semester Dropdown */}
              <FormGroup>
                <Label>Semester</Label>
                <Input
                  type="select"
                  value={newNote.semester}
                  onChange={(e) =>
                    setNewNote({ ...newNote, semester: e.target.value })
                  }
                >
                  <option value="">Select Semester</option>
                  {[...Array(8)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </Input>
              </FormGroup>

              {/* Department Dropdown */}
              <FormGroup>
                <Label>Department</Label>
                <Input
                  type="select"
                  value={newNote.department}
                  onChange={(e) =>
                    setNewNote({ ...newNote, department: e.target.value })
                  }
                >
                  <option value="">Select Department</option>
                  {[
                    "CSE",
                    "IT",
                    "AI & DS",
                    "ECE",
                    "EEE",
                    "MECH",
                    "CIVIL",
                    "MECHATRONICS",
                    "AUTOMOBILE",
                  ].map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </Input>
              </FormGroup>

              <FormGroup>
                <Label>Upload PDF</Label>
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
              </FormGroup>

              <Button color="primary" onClick={handleUpload} block>
                Upload
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </Container>

      {/* Footer - Always at the bottom */}
      <footer className="bg-dark text-white text-center py-3">
        <p>&copy; {new Date().getFullYear()} CampEase - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Notes;
