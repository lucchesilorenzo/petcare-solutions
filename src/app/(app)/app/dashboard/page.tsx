import { Metadata } from "next";
import React from "react";
import Branding from "@/components/branding";
import ContentBlock from "@/components/content-block";
import PetButton from "@/components/pet-button";
import PetDetails from "@/components/pet-details";
import PetList from "@/components/pet-list";
import SearchPetForm from "@/components/search-pet-form";
import Stats from "@/components/stats";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <main>
      <div className="flex items-center justify-between py-6 text-white">
        <Branding />

        <Stats />
      </div>

      <div className="grid h-[600px] grid-cols-3 grid-rows-[45px_1fr] gap-4">
        <div className="raw-span-1 col-span-1 col-start-1 row-start-1">
          <SearchPetForm />
        </div>

        <div className="relative col-span-1 col-start-1 row-span-full row-start-2">
          <ContentBlock>
            <PetList />

            <div className="absolute bottom-4 right-4">
              <PetButton actionType="add" />
            </div>
          </ContentBlock>
        </div>

        <div className="col-span-full col-start-2 row-span-full row-start-1">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
