import { Button } from "@mui/material";

export default function ActionButton({
  icon,
  color = "blue",
  children,
  ...props
}: any) {
  const colors: any = {
    blue: {
      bg: "var(--primary-blue)",
      hover: "var(--primary-blue-dark)",
    },
    purple: {
      bg: "var(--primary-purple)",
      hover: "var(--primary-purple-dark)",
    },
    red: {
      bg: "var(--primary-red)",
      hover: "var(--primary-red-dark)",
    },
  };

  return (
    <Button
      variant="contained"
      startIcon={icon}
      sx={{
        bgcolor: colors[color].bg,
        textTransform: "none",
        borderRadius: 2,
        px: 3,
        py: 1,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          bgcolor: colors[color].hover,
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
