"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DataSelectorProvider } from "@/context/DataSelectorContext";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@/context/ThemeContext";
import { useThemeContext } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeContext();

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#3c6e71",
        light: "#4d8a8d",
        dark: "#2a4d4f",
      },
      secondary: {
        main: "#284b63",
        light: "#3a6b85",
        dark: "#1c3547",
      },
      background: {
        default: mode === "light" ? "#ffffff" : "#353535",
        paper: mode === "light" ? "#f5f5f5" : "#424242",
      },
      text: {
        primary: mode === "light" ? "#353535" : "#ffffff",
        secondary: mode === "light" ? "#284b63" : "#d9d9d9",
      },
      divider: mode === "light" ? "#d9d9d9" : "#424242",
    },
    typography: {
      fontFamily: "var(--font-geist-sans)",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor:
              mode === "light" ? "#d9d9d9 #f5f5f5" : "#424242 #353535",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor: mode === "light" ? "#f5f5f5" : "#353535",
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: mode === "light" ? "#d9d9d9" : "#424242",
              minHeight: 24,
              border: "3px solid",
              borderColor: mode === "light" ? "#f5f5f5" : "#353535",
            },
          },
        },
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = process.env.CLOUDFLARE_WEB_ANALYTICS_TOKEN;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <ThemeWrapper>
            <DataSelectorProvider>{children}</DataSelectorProvider>
          </ThemeWrapper>
        </ThemeProvider>
      </body>

      {/* Cloudflare Web Analytics */}
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon={`{"token": "${token}"}`}
      ></script>
      {/* End Cloudflare Web Analytics */}
    </html>
  );
}
