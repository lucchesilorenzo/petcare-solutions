"use server";

import prisma from "./db";
import { PetFormSchema, PetIdSchema } from "./validations";
import { revalidatePath } from "next/cache";

export async function addPet(newPet: unknown) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const validatedPetSchema = PetFormSchema.safeParse(newPet);

  if (!validatedPetSchema.success) {
    return { message: "Failed to add pet." };
  }

  try {
    await prisma.pet.create({
      data: validatedPetSchema.data,
    });
  } catch (error) {
    return { message: "Failed to add pet." };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, newPetData: unknown) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const validatedPetId = PetIdSchema.safeParse(petId);
  const validatedPetData = PetFormSchema.safeParse(newPetData);

  if (!validatedPetId.success || !validatedPetData.success) {
    return { message: "Failed to edit pet." };
  }

  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPetData.data,
    });
  } catch (err) {
    return { message: "Failed to edit pet." };
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(petId: unknown) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const validatedPetId = PetIdSchema.safeParse(petId);

  if (!validatedPetId.success) {
    return { message: "Failed to delete pet." };
  }

  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
  } catch (err) {
    return { message: "Failed to delete pet." };
  }

  revalidatePath("/app", "layout");
}
