// app/layout.tsx

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "İkinciElKitapAlSat",
  description: "İkinci el kitap alım satım platformu.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* React Query Provider'ı ile sarmalayın */}
        <ToastContainer />
          <Navbar />
          {children}
       
      </body>
    </html>
  );
}
