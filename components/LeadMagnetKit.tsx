import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  TextField,
  Button,
} from "@mui/material";
import {
  FaFilePdf,
  FaRegListAlt,
  FaChartBar,
  FaMagic,
  FaBolt,
} from "react-icons/fa";
import { useState } from "react";
import { useErrorStore } from "@/store/errorStore";
import emailjs from '@emailjs/browser';

const bonuses = [
  { icon: <FaFilePdf color="#e74c3c" size={19} />, text: "Full PDF Guide" },
  {
    icon: <FaRegListAlt color="#134CCD" size={19} />,
    text: "Longer Response Prompt Templates",
  },
  {
    icon: <FaChartBar color="#74aa9c" size={19} />,
    text: "ChatGPT Version Comparison Chart",
  },
  {
    icon: <FaMagic color="#a259e6" size={19} />,
    text: "Advanced Continuation Techniques",
  },
  {
    icon: <FaBolt color="#f7b731" size={19} />,
    text: "Token Optimization Cheat Sheet",
  },
];

export default function LeadMagnetKit() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { showError } = useErrorStore();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!email) {
      showError(
        "Email Required",
        "Please enter your email address to receive the free kit."
      );
      return;
    }

    if (!email.includes('@')) {
      showError(
        "Invalid Email",
        "Please enter a valid email address."
      );
      return;
    }

    setLoading(true);
    
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // Service ID do EmailJS
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // Template ID do EmailJS
        {
          to_email: email,
          attachment_url: 'https://www.how-toguides.com/chat.pdf',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSubmitted(true);
    } catch (emailjsError) {
      console.error('EmailJS error:', emailjsError);
      showError(
        "Error",
        "Failed to send the kit. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        mx: "auto",
        mt: 7,
        mb: 6,
        p: { xs: 2, md: 4 },
        borderRadius: 5,
        border: "1.5px solid",
        borderColor: "#f8d7da",
        bgcolor: "#fff",
        boxShadow: "0 4px 32px 0 rgba(37,99,235,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradiente decorativo vermelho no topo */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 12,
          background: "linear-gradient(90deg, #e74c3c 0%, #fff 100%)",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "stretch",
          justifyContent: "space-between",
          width: "100%",
          gap: { xs: 3, md: 4 },
        }}
      >
        {/* Esquerda: ícone PDF, título, subtítulo, input e botão */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ mt: 1, mb: 1, alignSelf: "center" }}>
            <FaFilePdf
              size={44}
              color="#e74c3c"
              style={{ filter: "drop-shadow(0 2px 12px #e74c3c33)" }}
            />
          </Box>
          <Typography
            variant="h5"
            fontWeight={900}
            sx={{
              letterSpacing: -1,
              color: "#23272f",
              textAlign: "center",
            }}
          >
            Download Complete ChatGPT Mastery Kit
          </Typography>
          <Typography
            variant="body1"
            color="#444"
            sx={{
              mb: 1.5,
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: -0.2,
              textAlign: "center",
            }}
          >
            Get the complete guide plus exclusive bonus materials:
          </Typography>
          {submitted ? (
            <Typography color="success.main" fontWeight={700} mt={2}>
              Thank you! Check your inbox for your free kit.
            </Typography>
          ) : (
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                width: "100%",
                maxWidth: 420,
                display: "flex",
                gap: 0,
                mt: 0.5,
                mb: 1,
                borderRadius: 2,
                bgcolor: "#fff",
              }}
            >
              <TextField
                fullWidth
                size="small"
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 0,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                  border: "1px solid #e0e0e0",
                  "& fieldset": { border: "none" },
                  fontSize: 15,
                  height: 44,
                }}
                inputProps={{
                  style: {
                    fontSize: 15,
                    height: 36,
                    padding: "0 12px",
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={loading || !email}
                sx={{
                  bgcolor: "var(--primary-red)",
                  color: "#fff",
                  fontWeight: 700,
                  px: 2.5,
                  borderRadius: 0,
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                  boxShadow: "0 2px 8px 0 rgba(231,76,60,0.10)",
                  textTransform: "none",
                  fontSize: 14,
                  minWidth: 150,
                  height: 44,
                  "&:hover": {
                    bgcolor: "var(--primary-red-dark)",
                  },
                  "&.Mui-disabled": {
                    bgcolor: "rgba(231, 76, 60, 0.5)",
                    color: "#fff",
                  },
                }}
              >
                {loading ? "Sending..." : "GET FREE KIT"}
              </Button>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 0,
            py: { xs: 2, md: 0 },
          }}
        >
          <List sx={{ pl: 0, width: "100%", maxWidth: 320 }}>
            {bonuses.map((item, idx) => (
              <ListItem
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pl: 0,
                  py: 0.5,
                  gap: 1.1,
                  borderRadius: 2,
                  transition: "background 0.18s",
                  mb: 1,
                  justifyContent: "flex-start",
                }}
              >
                <Box sx={{ mt: 0.1, mr: 1 }}>{item.icon}</Box>
                <Typography
                  variant="body1"
                  color="#23272f"
                  sx={{ fontSize: 15, lineHeight: 1.5 }}
                >
                  {item.text}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Paper>
  );
}
