"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { petFormSchema, TPetFormSchema } from "@/lib/validations";
import { usePetContext } from "@/lib/hooks";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmit: () => void;
};

export default function PetForm({ actionType, onFormSubmit }: PetFormProps) {
  const { handleAddPet, handleEditPet, selectedPet, selectedPetId } =
    usePetContext();

  const form = useForm<TPetFormSchema>({
    resolver: zodResolver(petFormSchema),
    defaultValues:
      actionType === "edit"
        ? {
            name: selectedPet?.name,
            owner: selectedPet?.owner,
            imageUrl: selectedPet?.imageUrl,
            age: selectedPet?.age,
            notes: selectedPet?.notes,
          }
        : {
            name: "",
            owner: "",
            imageUrl: "",
            age: undefined,
            notes: "",
          },
  });

  async function onSubmit(data: TPetFormSchema) {
    if (actionType === "add") {
      await handleAddPet(data);
    } else if (actionType === "edit") {
      await handleEditPet(selectedPetId!, data);
    }

    onFormSubmit();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input id="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="owner">Owner name</FormLabel>
              <FormControl>
                <Input id="owner" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="imageUrl">Image URL</FormLabel>
              <FormControl>
                <Input id="imageUrl" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="age">Age</FormLabel>
              <FormControl>
                <Input id="age" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="notes">Notes</FormLabel>
              <FormControl>
                <Textarea id="notes" rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="ml-auto"
        >
          {actionType === "add" ? "Add pet" : "Edit pet"}
        </Button>
      </form>
    </Form>
  );
}
