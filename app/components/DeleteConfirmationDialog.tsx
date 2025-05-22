import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon, Warning as WarningIcon } from "@mui/icons-material";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  itemName: string;
}

export default function DeleteConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  itemName,
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        }
      }}
    >
      <DialogTitle sx={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        pb: 1
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningIcon sx={{ color: "error.main" }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        <IconButton 
          onClick={onClose} 
          size="small"
          sx={{ 
            color: "text.secondary",
            "&:hover": {
              color: "text.primary",
              bgcolor: "action.hover"
            }
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Typography variant="body1" color="text.secondary">
          Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          sx={{ 
            borderRadius: 1.5,
            textTransform: "none",
            px: 3
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          color="error" 
          variant="contained"
          sx={{ 
            borderRadius: 1.5,
            textTransform: "none",
            px: 3
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
