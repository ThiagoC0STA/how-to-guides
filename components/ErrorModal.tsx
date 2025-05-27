"use client";

import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningIcon from "@mui/icons-material/Warning";
import { useErrorStore } from "@/store/errorStore";

export default function ErrorModal() {
  const { isOpen, message, title, hideError } = useErrorStore();

  const messageLines = message.split("\n");

  return (
    <Modal
      open={isOpen}
      onClose={hideError}
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          outline: "none",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <ErrorOutlineIcon color="error" sx={{ fontSize: 28, mr: 1 }} />
          <Typography
            id="error-modal-title"
            variant="h6"
            component="h2"
            sx={{ flex: 1 }}
          >
            {title}
          </Typography>
          <IconButton onClick={hideError} size="small" sx={{ ml: 1 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box id="error-modal-description" sx={{ mt: 2, mb: 3 }}>
          {messageLines[0] && (
            <Typography sx={{ color: "text.secondary", mb: 2 }}>
              {messageLines[0]}
            </Typography>
          )}

          {messageLines.length > 1 && (
            <List sx={{ py: 0 }}>
              {messageLines.slice(1).filter(line => line.trim() !== "").map((line, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <WarningIcon color="warning" sx={{ fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText primary={line} />
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={hideError}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 3,
            }}
          >
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
