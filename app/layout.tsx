import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DataSelectorProvider } from "@/context/DataSelectorContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeWrapper from "./components/ThemeWrapper/ThemeWrapper";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lite Data",
  description:
    "Instantly create and export custom datasets with a fast, easy-to-use web app.",
  openGraph: {
    title: "Lite Data",
    description:
      "Instantly create and export custom datasets with a fast, easy-to-use web app.",
    type: "website",
    url: "https://lite-data.vercel.app/",
    images: [
      {
        url: "https://lite-data.vercel.app/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Lite Data",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lite Data",
    description:
      "Instantly create and export custom datasets with a fast, easy-to-use web app.",
    images: ["https://lite-data.vercel.app/android-chrome-512x512.png"],
  },
};

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

        {/* Cloudflare Web Analytics */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${token}"}`}
        ></script>
        {/* End Cloudflare Web Analytics */}
      </body>
    </html>
  );
}
