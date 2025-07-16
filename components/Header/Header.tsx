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
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "@/context/ThemeContext";

const Header: React.FC = () => {
  const theme = useTheme();
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        width: '100vw',
        left: 0,
        top: 0,
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: 'none',
        m: 0,
        p: 0,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          width: '100%',
          minHeight: { xs: 56, sm: 64 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          m: 0,
          p: 0,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 1200,
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: { xs: 2, sm: 4 },
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              letterSpacing: "-0.5px",
              textAlign: 'left',
            }}
          >
            Lite Data
          </Typography>
          <IconButton
            onClick={toggleColorMode}
            color="inherit"
            sx={{
              color: theme.palette.text.primary,
              ml: 2,
            }}
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
