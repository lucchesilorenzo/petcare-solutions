"use client";

import Image from "next/image";
import React from "react";
import { usePetContext, useSearchContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export default function PetList() {
  const { pets, handleChangeSelectedPetId, selectedPetId } = usePetContext();
  const { searchQuery } = useSearchContext();

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <ul className="border-b border-black/5">
      {filteredPets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handleChangeSelectedPetId(pet.id)}
            className={cn(
              "flex w-full items-center gap-x-3 bg-white px-6 py-3 text-base transition hover:bg-gray-100",
              {
                "bg-gray-100": pet.id === selectedPetId,
              },
            )}
          >
            <Image
              src={pet.imageUrl}
              alt={`${pet.name}'s image`}
              width={45}
              height={45}
              className="h-[45px] w-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
