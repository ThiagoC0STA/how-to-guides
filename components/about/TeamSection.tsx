import { Box, Typography, Paper, Avatar } from "@mui/material";

const teamMembers = [
  {
    name: "John Doe",
    title: "Founder & Lead Content Strategist",
    bio: "With over 10 years of experience in technology education, John founded How-ToGuides.com to help bridge the gap between powerful AI tools and everyday users.",
    initials: "JD",
    color: "#134CCD",
    image: "/p1.jpg",
  },
  {
    name: "Jane Smith",
    title: "AI Research Specialist",
    bio: "Jane brings her expertise in machine learning and natural language processing to ensure our guides are technically accurate and reflect best practices in AI usage.",
    initials: "JS",
    color: "#7c3aed",
    image: "/p2.jpeg",
  },
  {
    name: "Michael Johnson",
    title: "Content Editor & UX Specialist",
    bio: "Michael ensures our guides are clear, accessible, and user-friendly. His background in UX design helps us create tutorials that are easy to follow and visually engaging.",
    initials: "MJ",
    color: "#059669",
    image: "/p3.jpeg",
  },
];

export default function TeamSection() {
  return (
    <Box sx={{ mb: 8 }}>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: 28, md: 36 },
          fontWeight: 700,
          mb: 4,
          textAlign: "center",
          color: "var(--foreground)",
        }}
      >
        Our Team
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "var(--footer-text)",
          fontSize: { xs: 16, md: 18 },
          lineHeight: 1.8,
          textAlign: "center",
          mb: 4,
          maxWidth: 800,
          mx: "auto",
        }}
      >
        How-ToGuides.com is created by a team of AI enthusiasts, educators, and content specialists who are
        passionate about making technology accessible to everyone.
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {teamMembers.map((member, index) => (
          <Box key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: "100%",
                borderRadius: 4,
                background: `linear-gradient(135deg, ${member.color}08 0%, ${member.color}15 100%)`,
                border: "1px solid",
                borderColor: `${member.color}20`,
                textAlign: "center",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: `0 12px 40px 0 ${member.color}20`,
                  borderColor: `${member.color}40`,
                  "& .member-avatar": {
                    transform: "scale(1.05)",
                    boxShadow: `0 8px 32px 0 ${member.color}40`,
                  },
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: 4,
                  background: `linear-gradient(90deg, ${member.color} 0%, ${member.color}80 100%)`,
                },
              }}
            >
              <Avatar
                className="member-avatar"
                src={member.image}
                alt={member.name}
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: member.color,
                  fontSize: 40,
                  fontWeight: 700,
                  mx: "auto",
                  mb: 3,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: `0 4px 20px 0 ${member.color}30`,
                }}
              >
                {member.initials}
              </Avatar>
              <Typography
                variant="h6"
                sx={{
                  color: "var(--foreground)",
                  fontWeight: 800,
                  mb: 1,
                  fontSize: 20,
                }}
              >
                {member.name}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: member.color,
                  fontWeight: 600,
                  mb: 2,
                  fontSize: 14,
                }}
              >
                {member.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--footer-text)",
                  lineHeight: 1.7,
                  fontSize: 15,
                }}
              >
                {member.bio}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>
    </Box>
  );
} 