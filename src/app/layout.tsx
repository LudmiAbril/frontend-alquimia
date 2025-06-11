import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/general/Navbar";
import Footer from '@/components/general/Footer'
import { Roboto } from 'next/font/google'


const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '800'], 
  variable: '--font-roboto',
})


export const metadata: Metadata = {
  title: "Alquimia",
  description: "Plataforma para creación de perfumes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
    <head><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
</head>
    <body
      className={`${roboto.variable} ${roboto.variable} antialiased flex flex-col min-h-screen`}
    >
      {/* navbar */}
      <Navbar />

      {/* contenido que empuja el footer */}
      <main className="flex-grow">
        {children}
      </main>

      {/* footer fijo abajo */}
      <Footer />
    </body>
  </html>
  );
}
