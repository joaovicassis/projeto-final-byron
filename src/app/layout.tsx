import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import { AuthProvider } from "../app/lib/AuthContext";
import Header from "../components/Header";

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Bibliotech",
  description: "Sistema de biblioteca pratico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}


