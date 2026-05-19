import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Přehled schůzek s klienty",
  description: "Danča – přehled stavu schůzek s klienty",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
