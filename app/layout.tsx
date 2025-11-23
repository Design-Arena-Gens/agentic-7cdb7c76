import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Client Reactivation Outreach Builder",
  description:
    "Generate empathetic outreach messages focused on client reactivation and optimization."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-sand text-midnight antialiased">{children}</body>
    </html>
  );
}
