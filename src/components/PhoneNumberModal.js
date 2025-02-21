import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../api/api";
import "bootstrap/dist/css/bootstrap.min.css";

const PhoneNumberModal = ({ open, onClose }) => {
  const [phoneNo, setPhoneNo] = useState("");
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!phoneNo.match(/^\d{10}$/)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    } 
    try {
      await api.post("/home/profile", null, { params: { phoneNo } });
      onClose();
    } catch (err) {
      console.error("Error saving phone number:", err);
      setError("Failed to save phone number.");
    }
  };
  return (
    <Modal show={open} onHide={onClose} centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Before Continuing...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted">Please enter your phone number to proceed.</p>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter 10-digit number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              isInvalid={!!error}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" className="w-100" onClick={handleSave}>
            Save & Continue
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PhoneNumberModal;