"use client";

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema, TAuthFormSchema } from "@/lib/validations";
import { logIn, signUp } from "@/lib/actions";
import { toast } from "sonner";

type AuthFormProps = {
  page: "signup" | "login";
};

export default function AuthForm({ page }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TAuthFormSchema>({
    resolver: zodResolver(authFormSchema),
  });

  async function onSubmit(data: TAuthFormSchema) {
    const result = page === "signup" ? await signUp(data) : await logIn(data);
    if (result?.message) {
      toast.warning(result?.message);
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="example@gmail.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-[0.8rem] font-medium text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" {...register("password")} />
        {errors.password && (
          <p className="text-[0.8rem] font-medium text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="mr-auto">
        {page === "login" ? "Log in" : "Sign up"}
      </Button>
    </form>
  );
}
