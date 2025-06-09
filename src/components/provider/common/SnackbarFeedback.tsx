"use client";

import { Snackbar, Alert } from "@mui/material";

export type FeedbackSeverity = "success" | "error" | "info" | "warning";

export interface SnackbarFeedbackProps {
  open: boolean;
  message: string;
  severity?: FeedbackSeverity;
  onClose: () => void;
}

export default function SnackbarFeedback({
  open,
  message,
  severity = "success",
  onClose,
}: SnackbarFeedbackProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
