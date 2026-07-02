import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "InternTrap AI — Don't fall for fake internships",
  description:
    "Paste any suspicious job offer or recruiter message. Our AI analyzes it across 5 specialized agents and gives you an instant scam risk score.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-bg text-white min-h-screen antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
