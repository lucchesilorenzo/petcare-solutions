import PetContextProvider from "@/app/contexts/pet-context-provider";
import Background from "@/components/background";
import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";
import SearchContextProvider from "@/app/contexts/search-context-provider";
import { checkAuth, getPetsByUserId } from "@/lib/server-utils";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await checkAuth();
  const pets = await getPetsByUserId(session.user.id);

  return (
    <>
      <Background />

      <div className="mx-auto flex min-h-screen max-w-[1080px] flex-col px-4">
        <Header />

        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>

        <Footer />
      </div>
    </>
  );
}
