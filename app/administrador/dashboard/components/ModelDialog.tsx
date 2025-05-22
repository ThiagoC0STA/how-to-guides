import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";
import { Model } from "../../guides/types";

interface ModelDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (model: Partial<Model>) => void;
  model?: Model;
}

export default function ModelDialog({
  open,
  onClose,
  onSave,
  model,
}: ModelDialogProps) {
  const [formData, setFormData] = useState<Partial<Model>>({
    name: "",
    company: "",
    description: "",
    strengths: [],
    limitations: [],
    use_cases: [],
    pricing: { free: "", paid: "", api: "" },
    link: "",
  });
  const [newStrength, setNewStrength] = useState("");
  const [newLimitation, setNewLimitation] = useState("");
  const [newUseCase, setNewUseCase] = useState("");

  useEffect(() => {
    if (model) {
      setFormData({
        ...model,
        strengths: model.strengths || [],
        limitations: model.limitations || [],
        use_cases: model.use_cases || [],
        pricing: model.pricing || { free: "", paid: "", api: "" },
      });
    } else {
      setFormData({
        name: "",
        company: "",
        description: "",
        strengths: [],
        limitations: [],
        use_cases: [],
        pricing: { free: "", paid: "", api: "" },
        link: "",
      });
    }
    setNewStrength("");
    setNewLimitation("");
    setNewUseCase("");
  }, [model, open]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePricingChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      pricing: { ...prev.pricing, [field]: value },
    }));
  };

  const handleAddToList = (
    field: "strengths" | "limitations" | "use_cases",
    value: string
  ) => {
    if (!value.trim()) return;
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), value.trim()],
    }));
    if (field === "strengths") setNewStrength("");
    if (field === "limitations") setNewLimitation("");
    if (field === "use_cases") setNewUseCase("");
  };

  const handleRemoveFromList = (
    field: "strengths" | "limitations" | "use_cases",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] || []).filter((item: string) => item !== value),
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.company || !formData.description) {
      alert("Preencha os campos obrigatórios");
      return;
    }
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {model ? "Edit AI Model" : "Add New AI Model"}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Name"
            fullWidth
            required
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <TextField
            label="Company"
            fullWidth
            required
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            required
            multiline
            minRows={3}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <TextField
            label="Link (optional)"
            fullWidth
            value={formData.link}
            onChange={(e) => handleChange("link", e.target.value)}
          />

          {/* Strengths */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Strengths
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                fullWidth
                label="Add strength"
                value={newStrength}
                onChange={(e) => setNewStrength(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddToList("strengths", newStrength);
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={() => handleAddToList("strengths", newStrength)}
                startIcon={<AddIcon />}
                sx={{ borderRadius: 2 }}
              >
                Add
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {formData.strengths?.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  onDelete={() => handleRemoveFromList("strengths", item)}
                  sx={{
                    borderRadius: 2,
                    bgcolor: "success.50",
                    color: "success.main",
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Limitations */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Limitations
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                fullWidth
                label="Add limitation"
                value={newLimitation}
                onChange={(e) => setNewLimitation(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddToList("limitations", newLimitation);
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={() => handleAddToList("limitations", newLimitation)}
                startIcon={<AddIcon />}
                sx={{ borderRadius: 2 }}
              >
                Add
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {formData.limitations?.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  onDelete={() => handleRemoveFromList("limitations", item)}
                  sx={{
                    borderRadius: 2,
                    bgcolor: "warning.50",
                    color: "warning.main",
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Use Cases */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Use Cases
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                fullWidth
                label="Add use case"
                value={newUseCase}
                onChange={(e) => setNewUseCase(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddToList("use_cases", newUseCase);
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={() => handleAddToList("use_cases", newUseCase)}
                startIcon={<AddIcon />}
                sx={{ borderRadius: 2 }}
              >
                Add
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {formData.use_cases?.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  onDelete={() => handleRemoveFromList("use_cases", item)}
                  sx={{
                    borderRadius: 2,
                    bgcolor: "info.50",
                    color: "info.main",
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Pricing */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Pricing
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Free"
                fullWidth
                value={formData.pricing?.free || ""}
                onChange={(e) => handlePricingChange("free", e.target.value)}
              />
              <TextField
                label="Paid"
                fullWidth
                value={formData.pricing?.paid || ""}
                onChange={(e) => handlePricingChange("paid", e.target.value)}
              />
              <TextField
                label="API"
                fullWidth
                value={formData.pricing?.api || ""}
                onChange={(e) => handlePricingChange("api", e.target.value)}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          sx={{ textTransform: "none", px: 3, borderRadius: 2 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={
            !formData.name ||
            !formData.company ||
            !formData.description ||
            !formData.pricing?.free ||
            !formData.pricing?.paid ||
            !formData.pricing?.api
          }
          sx={{
            textTransform: "none",
            px: 4,
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
