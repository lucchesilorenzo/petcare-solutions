"use client";

import React, { createContext, useOptimistic, useState } from "react";
import { addPet, deletePet, editPet } from "@/lib/actions";
import { PetEssentials } from "@/lib/types";
import { Pet } from "@prisma/client";
import { toast } from "sonner";

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

type TPetContext = {
  pets: Pet[];
  numberOfPets: number;
  selectedPetId: Pet["id"] | null;
  selectedPet?: Pet;
  handleChangeSelectedPetId: (petId: Pet["id"]) => void;
  handleAddPet: (newPet: PetEssentials) => Promise<void>;
  handleEditPet: (petId: Pet["id"], newPetData: PetEssentials) => Promise<void>;
  handleDeletePet: (petId: Pet["id"]) => Promise<void>;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data,
}: PetContextProviderProps) {
  // state
  const [optmisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, { ...payload, id: Date.now() }];
        case "edit":
          return state.map((pet) =>
            pet.id === payload.petId ? { ...pet, ...payload.newPetData } : pet,
          );
        case "delete":
          return state.filter((pet) => pet.id !== payload);
        default:
          return state;
      }
    },
  );
  const [selectedPetId, setSelectedPetId] = useState<Pet["id"] | null>(null);

  // derived state
  const numberOfPets = optmisticPets.length;
  const selectedPet = optmisticPets.find((pet) => pet.id === selectedPetId);

  // handlers
  function handleChangeSelectedPetId(petId: Pet["id"]) {
    setSelectedPetId(petId);
  }

  async function handleAddPet(newPet: PetEssentials) {
    setOptimisticPets({ action: "add", payload: newPet });
    const result = await addPet(newPet);
    if (result) {
      toast.warning(result?.message);
    }
  }

  async function handleEditPet(petId: Pet["id"], newPetData: PetEssentials) {
    setOptimisticPets({ action: "edit", payload: { petId, newPetData } });
    const result = await editPet(petId, newPetData);
    if (result) {
      toast.warning(result?.message);
      return;
    }
  }

  async function handleDeletePet(petId: Pet["id"]) {
    setOptimisticPets({ action: "delete", payload: petId });
    const result = await deletePet(petId);
    if (result) {
      toast.warning(result?.message);
      return;
    }
  }

  return (
    <PetContext.Provider
      value={{
        pets: optmisticPets,
        numberOfPets,
        selectedPetId,
        selectedPet,
        handleChangeSelectedPetId,
        handleAddPet,
        handleEditPet,
        handleDeletePet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
