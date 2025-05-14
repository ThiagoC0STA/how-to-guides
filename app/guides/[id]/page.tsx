"use client";

import { notFound } from "next/navigation";
import { GUIDES } from "@/data/guides";
import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  Button,
  Chip,
  LinearProgress,
  Divider,
  TextField,
} from "@mui/material";

export default function GuidePage({ params }: { params: { id: string } }) {
  const guide = GUIDES.find((g) => g.id === params.id);
  const [currentModule, setCurrentModule] = useState(0);
  const [unlocked, setUnlocked] = useState(false);

  if (!guide) return notFound();

  const modules = guide.modules || [];
  const isLocked = modules[currentModule]?.locked && !unlocked;
  const progress = Math.floor((currentModule / (modules.length - 1)) * 100);

  // Conteúdo de exemplo para o primeiro módulo (Introduction)
  const moduleContents = [
    // Introduction
    <Box key="intro">
      <Typography variant="h3" fontWeight={800} mb={2}>Introduction</Typography>
      <Typography variant="h5" fontWeight={700} mt={4} mb={1.5}>What is ChatGPT?</Typography>
      <Typography variant="body1" mb={2}>
        ChatGPT is an AI language model developed by OpenAI that can understand and generate human-like text based on the prompts you give it. It's designed to have conversations, answer questions, write content, and assist with various tasks.
      </Typography>
      <Typography variant="h5" fontWeight={700} mt={4} mb={1.5}>Why learn ChatGPT in 2025?</Typography>
      <Typography variant="body1" mb={1}>
        In 2025, ChatGPT has become an essential productivity tool used by millions of people worldwide. Learning to use ChatGPT effectively can help you:
      </Typography>
      <List sx={{ pl: 3, mb: 2 }}>
        <ListItem sx={{ display: 'list-item', pl: 0 }}>Save time on research and content creation</ListItem>
        <ListItem sx={{ display: 'list-item', pl: 0 }}>Get help with coding and technical problems</ListItem>
        <ListItem sx={{ display: 'list-item', pl: 0 }}>Learn new concepts through interactive explanations</ListItem>
        <ListItem sx={{ display: 'list-item', pl: 0 }}>Brainstorm ideas for creative projects</ListItem>
        <ListItem sx={{ display: 'list-item', pl: 0 }}>Automate repetitive writing tasks</ListItem>
      </List>
      <Paper variant="outlined" sx={{ bgcolor: 'grey.50', borderRadius: 2, p: 2, mb: 3 }}>
        <Typography fontWeight={700}>ChatGPT vs. Other AI Tools</Typography>
        <Typography variant="body2" mt={1}>
          While there are many AI tools available in 2025, ChatGPT remains one of the most versatile and user-friendly options. Compared to alternatives like Gemini AI, Claude, or specialized AI tools, ChatGPT offers:
        </Typography>
        <List sx={{ pl: 3, mt: 1 }}>
          <ListItem sx={{ display: 'list-item', pl: 0 }}>A more intuitive interface for beginners</ListItem>
          <ListItem sx={{ display: 'list-item', pl: 0 }}>Strong capabilities across a wide range of tasks</ListItem>
          <ListItem sx={{ display: 'list-item', pl: 0 }}>Regular updates and improvements</ListItem>
          <ListItem sx={{ display: 'list-item', pl: 0 }}>A large community of users sharing tips and techniques</ListItem>
        </List>
      </Paper>
      <Typography variant="h5" fontWeight={700} mt={4} mb={1.5}>What you'll learn in this guide</Typography>
      <Typography variant="body1" mb={2}>
        This comprehensive guide will take you from complete beginner to confident ChatGPT user. We'll cover everything from creating your account to advanced techniques for getting the best results.
      </Typography>
      <Paper variant="outlined" sx={{ bgcolor: 'grey.50', borderRadius: 2, p: 2, mb: 3 }}>
        <Typography fontWeight={700}>Knowledge Check</Typography>
        <Typography variant="body2" mt={1} mb={1}>What is the primary purpose of ChatGPT?</Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disableGutters><input type="radio" disabled style={{ marginRight: 8 }} />To create images and visual content</ListItem>
          <ListItem disableGutters><input type="radio" disabled style={{ marginRight: 8 }} /><b>To understand and generate human-like text</b></ListItem>
          <ListItem disableGutters><input type="radio" disabled style={{ marginRight: 8 }} />To analyze data and create spreadsheets</ListItem>
          <ListItem disableGutters><input type="radio" disabled style={{ marginRight: 8 }} />To edit and enhance videos</ListItem>
        </List>
      </Paper>
    </Box>,
    // Placeholder para outros módulos
    ...modules.slice(1).map((mod, idx) => (
      <Box key={mod.title}>
        <Typography variant="h5" fontWeight={700} mb={2}>{mod.title}</Typography>
        <Typography variant="body1">Conteúdo do módulo aqui...</Typography>
      </Box>
    ))
  ];

  return (
    <Box display="flex" gap={4} alignItems="flex-start" maxWidth={1300} mx="auto" my={6} px={2}>
      {/* Sidebar */}
      <Paper elevation={2} sx={{ width: 320, borderRadius: 3, p: 3, border: '1.5px solid', borderColor: 'grey.200', bgcolor: '#fff', minWidth: 260 }}>
        <Typography variant="h5" fontWeight={800} mb={3}>Guide Modules</Typography>
        <Box mb={3}>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Your Progress: {progress}%</Typography>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4, bgcolor: 'grey.200' }} />
        </Box>
        <List sx={{ p: 0 }}>
          {modules.map((mod, idx) => (
            <ListItem key={mod.title} disableGutters sx={{ mb: 1, p: 0 }}>
              <Button
                onClick={() => !mod.locked || unlocked ? setCurrentModule(idx) : null}
                disabled={mod.locked && !unlocked}
                fullWidth
                variant="text"
                sx={{
                  justifyContent: 'space-between',
                  textTransform: 'none',
                  fontWeight: idx === currentModule ? 700 : 500,
                  fontSize: 16,
                  borderRadius: 2,
                  color: idx === currentModule ? 'primary.dark' : 'text.primary',
                  backgroundColor: idx === currentModule ? 'primary.50' : 'transparent',
                  boxShadow: 'none',
                  border: 'none',
                  px: 2,
                  py: 1.5,
                  minHeight: 48,
                  opacity: mod.locked && !unlocked ? 0.5 : 1,
                  '&:hover': {
                    backgroundColor: idx === currentModule ? 'primary.100' : 'grey.100',
                  },
                  alignItems: 'center',
                  transition: 'background 0.18s',
                }}
              >
                <span style={{ flex: 1, textAlign: 'left' }}>{idx + 1}. {mod.title}</span>
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
      {/* Conteúdo do módulo */}
      <Paper elevation={2} sx={{ flex: 1, borderRadius: 3, p: 5, border: '1.5px solid', borderColor: 'grey.200', bgcolor: '#fff', minHeight: 600 }}>
        {isLocked ? (
          <Box>
            <Typography variant="h5" fontWeight={700} mb={2}>Este módulo está bloqueado</Typography>
            <Typography variant="body1" mb={2}>Para acessar todos os módulos, insira seu e-mail abaixo:</Typography>
            <Box component="form"
              onSubmit={e => {
                e.preventDefault();
                setUnlocked(true);
              }}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 320 }}
            >
              <TextField type="email" required label="Seu e-mail" size="medium" />
              <Button type="submit" variant="contained" color="primary" sx={{ fontWeight: 700, fontSize: 16, py: 1.5 }}>Desbloquear módulos</Button>
            </Box>
          </Box>
        ) : (
          moduleContents[currentModule]
        )}
      </Paper>
    </Box>
  );
}
