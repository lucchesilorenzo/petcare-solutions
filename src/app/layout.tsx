import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Welcome / PetCare Solutions",
    template: "%s / PetCare Solutions",
  },
  description: "Take care of people's pets with ease, trust, and security.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-zinc-200 text-sm text-zinc-900 antialiased`}
      >
        {children}
      </body>

      <Toaster position="top-right" />
    </html>
  );
}
