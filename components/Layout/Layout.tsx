'use client';

import React from "react";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={styles.layout}>
      <div 
        className={styles.content}
        style={{
          padding: isMobile ? theme.spacing(2) : theme.spacing(4),
          maxWidth: isMobile ? "100%" : "1200px",
          margin: "0 auto",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;