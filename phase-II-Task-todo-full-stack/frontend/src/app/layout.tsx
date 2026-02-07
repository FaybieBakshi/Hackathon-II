import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./auth-provider";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "TaskFlow - Organize Your Life, Achieve Your Goals",
  description: "The modern task management platform designed for productive teams. Beautiful, intuitive, and powerful.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-900 antialiased">
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
