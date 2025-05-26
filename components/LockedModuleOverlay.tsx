import { useEffect } from 'react';
import { Box, Paper, Typography, List, ListItem, TextField, Button } from '@mui/material';
import { FaCheckCircle, FaLock } from 'react-icons/fa';
import React from 'react';

interface LockedModuleOverlayProps {
  moduleTitle: string;
  onUnlock: () => void;
  onBack: () => void;
  guideColor?: string;
  guideColorRgb?: string;
}

export default function LockedModuleOverlay({
  moduleTitle,
  onUnlock,
  onBack,
  guideColor = '#134CCD',
  guideColorRgb = '37,99,235',
}: LockedModuleOverlayProps) {

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      zIndex={1300}
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: 'rgba(245,247,255,0.7)',
        backdropFilter: 'blur(12px)',
        minHeight: '100vh',
        minWidth: '100vw',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 4,
          maxWidth: 540,
          width: '95vw',
          bgcolor: 'rgba(255,255,255,0.88)',
          boxShadow: '0 8px 32px 0 rgba(37,99,235,0.12)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${guideColor} 60%, #fff 100%)`,
            boxShadow: `0 2px 12px 0 rgba(${guideColorRgb}, 0.18)`
          }}
          mb={2}
        >
          <FaLock size={36} color="#fff" style={{ filter: 'drop-shadow(0 2px 6px rgba(37,99,235,0.18))' }} />
        </Box>
        <Typography variant="h4" fontWeight={800} mb={1} textAlign="center">
          {moduleTitle}
        </Typography>
        <Typography variant="h6" fontWeight={700} color={guideColor} mb={1} textAlign="center">
          This Module is Locked
        </Typography>
        <Typography variant="body1" mb={3} color="text.secondary" textAlign="center">
          To access the remaining modules and get the complete Kit, please enter your email below.
        </Typography>
        <List sx={{ mb: 3, width: '100%' }}>
          <ListItem sx={{ p: 0, mb: 1, color: 'success.main', fontWeight: 600, alignItems: 'center' }}>
            <FaCheckCircle style={{ marginRight: 10, minWidth: 22 }} /> Full PDF Guide
          </ListItem>
          <ListItem sx={{ p: 0, mb: 1, color: 'success.main', fontWeight: 600, alignItems: 'center' }}>
            <FaCheckCircle style={{ marginRight: 10, minWidth: 22 }} /> Prompts Cheat Sheet
          </ListItem>
          <ListItem sx={{ p: 0, mb: 1, color: 'success.main', fontWeight: 600, alignItems: 'center' }}>
            <FaCheckCircle style={{ marginRight: 10, minWidth: 22 }} /> Models Comparison Table
          </ListItem>
          <ListItem sx={{ p: 0, color: 'success.main', fontWeight: 600, alignItems: 'center' }}>
            <FaCheckCircle style={{ marginRight: 10, minWidth: 22 }} /> AI Terminology Glossary
          </ListItem>
        </List>
        <Box component="form" onSubmit={e => { e.preventDefault(); onUnlock(); }} width="100%" display="flex" flexDirection="column" gap={2}>
          <TextField
            type="email"
            required
            label="Your email address"
            size="medium"
            fullWidth
            sx={{ bgcolor: '#fff', borderRadius: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              fontWeight: 700,
              fontSize: 16,
              py: 1.5,
              borderRadius: 2,
              boxShadow: `0 2px 8px 0 rgba(${guideColorRgb}, 0.10)`,
              bgcolor: guideColor,
              '&:hover': {
                bgcolor: guideColor,
                filter: 'brightness(1.08)',
              },
            }}
            fullWidth
          >
            UNLOCK FULL GUIDE
          </Button>
        </Box>
        <Button
          variant="outlined"
          onClick={onBack}
          sx={{
            mt: 2,
            fontWeight: 700,
            borderRadius: 2,
            px: 3,
            borderColor: guideColor,
            color: guideColor,
            '&:hover': {
              borderColor: guideColor,
              color: guideColor,
              background: `rgba(${guideColorRgb}, 0.06)`
            },
          }}
          fullWidth
        >
          Return to Previous Module
        </Button>
      </Paper>
    </Box>
  );
} 