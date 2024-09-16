import PetContextProvider from "@/app/contexts/pet-context-provider";
import Background from "@/components/background";
import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";
import prisma from "@/lib/db";
import SearchContextProvider from "@/app/contexts/search-context-provider";
import { Toaster } from "sonner";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pets = await prisma.pet.findMany();

  return (
    <>
      <Background />

      <div className="mx-auto flex min-h-screen max-w-[1080px] flex-col px-8">
        <Header />

        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>

        <Footer />
      </div>

      <Toaster position="top-right" />
    </>
  );
}
