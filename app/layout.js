import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import { cn } from "@/utils/cn";

import { AdlamDisplayRegular, FarroBold, FarroRegular, FarroMedium } from "@/utils/font";

export const metadata = {
  title: "PELITA",
  description: "Pendamping Lika-Liku TK Anak",

  icons: {
    icon: [
      {
        url: `/assets/favicon/android-chrome-192x192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: `/assets/favicon/android-chrome-512x512.png`,
        sizes: "512x512",
        type: "image/png",
      },
      { url: `/assets/favicon/favicon.ico` },
    ],
    apple: [
      {
        url: `/assets/favicon/apple-touch-icon.png`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: [{ url: `/assets/favicon/favicon.ico` }],
    other: [
      {
        rel: "android-chrome-192x192",
        url: `/assets/favicon/android-chrome-192x192.png`,
        sizes: "192x192",
      },
      {
        rel: "android-chrome-512x512",
        url: `/assets/favicon/android-chrome-512x512.png`,
        sizes: "512x512",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          AdlamDisplayRegular.variable,
          FarroBold.variable,
          FarroMedium.variable,
          FarroRegular.variable,
          "antialiased",
        )}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
