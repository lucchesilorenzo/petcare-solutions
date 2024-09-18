import "server-only";

import prisma from "./db";
import { auth } from "./auth";
import { redirect } from "next/navigation";
import { Pet } from "@prisma/client";
import { PetEssentials } from "./types";

export async function checkAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

export async function createPet(newPetData: PetEssentials, sessionId: string) {
  await prisma.pet.create({
    data: {
      ...newPetData,
      User: {
        connect: {
          id: sessionId,
        },
      },
    },
  });
}

export async function getPetsByUserId(userId: Pet["userId"]) {
  const pets = await prisma.pet.findMany({
    where: {
      userId,
    },
  });

  return pets;
}

export async function getPetById(petId: Pet["id"]) {
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
  });

  return pet;
}
