"use client";

import { usePetContext } from "@/lib/hooks";
import Image from "next/image";
import React from "react";
import { Pet } from "@prisma/client";
import PetButton from "./pet-button";

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="flex h-full w-full flex-col">
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <TopBar pet={selectedPet} />

          <OtherInfo pet={selectedPet} />

          <Notes pet={selectedPet} />
        </>
      )}
    </section>
  );
}

type SelectedPet = {
  pet: Pet;
};

function EmptyView() {
  return (
    <p className="flex h-full w-full items-center justify-center text-2xl">
      No pet selected
    </p>
  );
}

function TopBar({ pet }: SelectedPet) {
  const { handleDeletePet } = usePetContext();

  return (
    <div className="flex items-center gap-x-4 border-b border-black/5 bg-white px-6 py-4">
      <Image
        src={pet.imageUrl}
        alt={`${pet.name}'s image`}
        width={70}
        height={70}
        className="h-[70px] w-[70px] rounded-full object-cover"
      />

      <p className="text-3xl font-semibold">{pet.name}</p>

      <div className="ml-auto space-x-3">
        <PetButton actionType="edit">Edit</PetButton>
        <PetButton
          onClick={async () => await handleDeletePet(pet.id)}
          actionType="checkout"
        >
          Checkout
        </PetButton>
      </div>
    </div>
  );
}

function OtherInfo({ pet }: SelectedPet) {
  return (
    <div className="my-10 flex items-center justify-around text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner name
        </h3>
        <p className="mt-1 text-lg text-zinc-900">{pet.owner}</p>
      </div>

      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
        <p className="mt-1 text-lg text-zinc-900">{pet.age}</p>
      </div>
    </div>
  );
}

function Notes({ pet }: SelectedPet) {
  return (
    <section className="mx-10 mb-9 flex-1 rounded-sm border border-gray-200 bg-white px-6 py-4">
      <p>{pet.notes}</p>
    </section>
  );
}
