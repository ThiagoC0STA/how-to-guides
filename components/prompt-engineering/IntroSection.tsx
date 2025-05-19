import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

export default function IntroSection() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        mb: 6,
        borderRadius: 2,
        bgcolor: 'background.default',
      }}
    >
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h2" sx={{ mb: 3, fontSize: '1.8rem', fontWeight: 700 }}>
          What is Prompt Engineering?
        </Typography>
        <Typography paragraph>
          Prompt engineering is the art and science of crafting effective instructions for AI models to get the best possible results. 
          It's a crucial skill for anyone working with AI tools like ChatGPT, Midjourney, DALL-E, and Gemini AI.
        </Typography>
        <Typography paragraph>
          Our comprehensive prompt engineering guides will teach you how to:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Structure your prompts for maximum clarity and effectiveness" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Use specialized techniques for different AI models" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Troubleshoot common prompt issues" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Create consistent, high-quality outputs" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Master advanced prompt engineering methods" />
          </ListItem>
        </List>
      </Box>
    </Paper>
  );
} 