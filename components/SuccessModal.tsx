"use client";

import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSuccessStore } from "@/store/successStore";

export default function SuccessModal() {
  const { isOpen, message, primaryButton, secondaryButton, hideSuccess } = useSuccessStore();

  const handleClose = () => {
    hideSuccess();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="success-modal-title"
      aria-describedby="success-modal-description"
      closeAfterTransition
      sx={{ zIndex: 1500 }}
    >
      <Fade in={isOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 360,
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: "0 8px 32px 0 rgba(0,0,0,0.16)",
            p: 0,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: 240,
          }}
        >
          <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", p: 1.5, pb: 0 }}>
            <IconButton onClick={handleClose} size="small" sx={{ color: "grey.500" }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ mt: -3, mb: 1.5, display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <Box
              sx={{
                bgcolor: "success.main",
                width: 44,
                height: 44,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px 0 rgba(76,175,80,0.12)",
                mb: 1.5,
              }}
            >
              <CheckCircleIcon sx={{ color: "#fff", fontSize: 28 }} />
            </Box>
            <Typography
              id="success-modal-title"
              variant="h5"
              component="h2"
              sx={{ fontWeight: 700, mb: 0.5, textAlign: "center" }}
            >
              Success!
            </Typography>
            <Typography
              id="success-modal-description"
              sx={{ color: "text.secondary", fontSize: "1rem", textAlign: "center", maxWidth: 300, mb: 1.5 }}
            >
              {message}
            </Typography>
          </Box>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", gap: 1.5, mt: "auto", mb: 2.5 }}>
            {secondaryButton && (
              <Button
                variant="outlined"
                onClick={() => {
                  secondaryButton.onClick();
                  handleClose();
                }}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  px: 2.5,
                  py: 0.75,
                  fontSize: "0.98rem",
                  fontWeight: 500,
                  minWidth: 120,
                }}
              >
                {secondaryButton.text}
              </Button>
            )}
            {primaryButton ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  primaryButton.onClick();
                  handleClose();
                }}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  px: 2.5,
                  py: 0.75,
                  fontSize: "0.98rem",
                  fontWeight: 600,
                  minWidth: 90,
                  boxShadow: "0 2px 6px 0 rgba(33,150,243,0.08)",
                }}
              >
                {primaryButton.text}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleClose}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  px: 2.5,
                  py: 0.75,
                  fontSize: "0.98rem",
                  fontWeight: 600,
                  minWidth: 90,
                  boxShadow: "0 2px 6px 0 rgba(33,150,243,0.08)",
                }}
              >
                OK
              </Button>
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
} 