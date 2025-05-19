import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { FaBook, FaVideo, FaTools, FaUsers } from 'react-icons/fa';

interface Resource {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const resources: Resource[] = [
  {
    title: 'Prompt Engineering Books',
    description: 'Comprehensive books on prompt engineering techniques and best practices',
    icon: <FaBook size={20} />,
    link: '/prompt-engineering/books'
  },
  {
    title: 'Video Tutorials',
    description: 'Step-by-step video guides for mastering prompt engineering',
    icon: <FaVideo size={20} />,
    link: '/prompt-engineering/videos'
  },
  {
    title: 'Prompt Engineering Tools',
    description: 'Essential tools and resources for prompt engineering',
    icon: <FaTools size={20} />,
    link: '/prompt-engineering/tools'
  },
  {
    title: 'Community Resources',
    description: 'Join our community of prompt engineering enthusiasts',
    icon: <FaUsers size={20} />,
    link: '/prompt-engineering/community'
  }
];

export default function ResourcesSection() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 2,
        bgcolor: 'background.default',
      }}
    >
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Typography
          variant="h2"
          sx={{
            mb: 3,
            fontSize: '1.8rem',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          Additional Resources
        </Typography>
        <List>
          {resources.map((resource, index) => (
            <ListItem
              key={index}
              sx={{
                py: 2,
                borderBottom: index < resources.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
              }}
            >
              <ListItemIcon sx={{ color: 'primary.main' }}>
                {resource.icon}
              </ListItemIcon>
              <ListItemText
                primary={resource.title}
                secondary={resource.description}
                primaryTypographyProps={{
                  fontWeight: 600,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
} 