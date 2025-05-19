"use client";

import { Box, Typography, Paper, Link } from '@mui/material';
import { FaBook, FaVideo, FaTools, FaUsers, FaArrowRight } from 'react-icons/fa';

interface Resource {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color: string;
}

const resources: Resource[] = [
  {
    title: 'Prompt Engineering Books',
    description: 'Comprehensive books on prompt engineering techniques and best practices',
    icon: <FaBook size={20} />,
    link: '/prompt-engineering/books',
    color: '#8e44ad'
  },
  {
    title: 'Video Tutorials',
    description: 'Step-by-step video guides for mastering prompt engineering',
    icon: <FaVideo size={20} />,
    link: '/prompt-engineering/videos',
    color: '#3498db'
  },
  {
    title: 'Prompt Engineering Tools',
    description: 'Essential tools and resources for prompt engineering',
    icon: <FaTools size={20} />,
    link: '/prompt-engineering/tools',
    color: '#2ecc71'
  },
  {
    title: 'Community Resources',
    description: 'Join our community of prompt engineering enthusiasts',
    icon: <FaUsers size={20} />,
    link: '/prompt-engineering/community',
    color: '#e74c3c'
  }
];

export default function ResourcesSection() {
  return (
    <Box sx={{ py: 8 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 } }}>
        <Typography
          variant="h2"
          sx={{
            mb: 1,
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            fontWeight: 800,
            textAlign: 'center',
            letterSpacing: -0.5,
          }}
        >
          Additional Resources
        </Typography>

        <Typography
          sx={{
            textAlign: 'center',
            mb: 6,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.1rem' },
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          Explore our curated collection of books, videos, tools, and community resources to enhance your prompt engineering skills.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 3,
          }}
        >
          {resources.map((resource, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                height: '100%',
                p: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
                  borderColor: resource.color,
                  '& .resource-link': {
                    color: resource.color,
                  },
                },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: `${resource.color}15`,
                  color: resource.color,
                  mb: 2,
                }}
              >
                {resource.icon}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  mb: 1,
                  color: 'text.primary',
                }}
              >
                {resource.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.6,
                  mb: 2,
                }}
              >
                {resource.description}
              </Typography>

              <Link
                href={resource.link}
                className="resource-link"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'text.secondary',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: resource.color,
                  },
                }}
              >
                Learn More
                <FaArrowRight size={12} />
              </Link>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
} 