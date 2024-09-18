"use server";

import prisma from "./db";
import bcrypt from "bcryptjs";
import { authFormSchema, petFormSchema, petIdSchema } from "./validations";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { signIn, signOut } from "./auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { checkAuth, createPet, getPetById } from "./server-utils";

// --- user actions ---

export async function signUp(credentials: unknown) {
  // validation
  const validatedFormData = authFormSchema.safeParse(credentials);
  if (!validatedFormData.success) {
    return { message: "Invalid form data." };
  }

  const { email, password } = validatedFormData.data;

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return { message: "Email already exists." };
      }
      return { message: "Could not create user." };
    }
  }
  // login with the credentials we just created
  await signIn("credentials", validatedFormData.data);
}

export async function logIn(credentials: unknown) {
  // validation
  const validatedFormData = authFormSchema.safeParse(credentials);
  if (!validatedFormData.success) {
    return { message: "Invalid form data." };
  }

  // login
  try {
    await signIn("credentials", validatedFormData.data);
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { message: "Invalid email or password." };
        default:
          return { message: "Could not log in." };
      }
    }
  }
  // redirect to dashboard if there's no error
  redirect("/app/dashboard");
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

// --- pet actions ---

export async function addPet(newPet: unknown) {
  const session = await checkAuth();

  const validatedPet = petFormSchema.safeParse(newPet);
  if (!validatedPet.success) {
    return { message: "Failed to add pet." };
  }

  try {
    await createPet(validatedPet.data, session.user.id);
  } catch (error) {
    return { message: "Failed to add pet." };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, newPetData: unknown) {
  // authentication check
  const session = await checkAuth();

  // validation
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPetData = petFormSchema.safeParse(newPetData);

  if (!validatedPetId.success || !validatedPetData.success) {
    return { message: "Failed to edit pet." };
  }

  // authorization check
  const pet = await getPetById(validatedPetId.data);
  if (!pet) return { message: "Pet not found." };

  if (pet.userId !== session.user.id) {
    return { message: "Unauthorized." };
  }

  // data mutation
  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: {
        ...validatedPetData.data,
      },
    });
  } catch (err) {
    return { message: "Failed to edit pet." };
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(petId: unknown) {
  const session = await checkAuth();

  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return { message: "Failed to delete pet." };
  }

  const pet = await getPetById(validatedPetId.data);
  if (!pet) return { message: "Pet not found." };

  if (pet.userId !== session.user.id) {
    return { message: "Unauthorized." };
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
