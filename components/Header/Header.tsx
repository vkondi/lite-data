'use client';

/**
 * Header component that displays the main header of the application.
 *
 * This component includes:
 * - A title "Rapid Data"
 * - A navigation section with a "Generator" link
 * - A settings icon
 *
 * @component
 * @example
 * return (
 *   <Header />
 * )
 */

import React from "react";
import { useTheme } from "@mui/material/styles";
import { IconButton, AppBar, Toolbar, Typography, useMediaQuery } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "@/context/ThemeContext";

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 4 } }}>
        <Typography
          variant={isMobile ? "h6" : "h5"}
          component="h1"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            letterSpacing: "-0.5px",
          }}
        >
          Lite Data
        </Typography>
        <IconButton 
          onClick={toggleColorMode} 
          color="inherit"
          sx={{ 
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            }
          }}
        >
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
