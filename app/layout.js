import localFont from "next/font/local";
import "./globals.css";
import { createConnection } from "@/lib/db";
import { startConnectionCleanup } from "@/lib/cleanup"; // <-- import cleanup

// font config
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// metadata
export const metadata = {
  title: "Sporty India",
  description: "Platform dedicated to storing and showcasing Athletes",
};

export default async function RootLayout({ children }) {
  const pool = await createConnection();
  startConnectionCleanup(pool);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
