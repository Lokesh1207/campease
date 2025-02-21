import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

const ReviewDetailsModal = ({ open, onClose, review }) => {
  if (!review) return null; // Ensure we have a review before rendering

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {review.companyName} - {review.role}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary">
          Salary: {review.salaryPackage}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Date: {review.date}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {review.fullName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {review.username}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {review.contact}
        </Typography>
        <Typography variant="body1" className="mt-3">
          {review.description}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDetailsModal;
