import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Log In",
};

export default function LogInPage() {
  return (
    <main>
      <H1 className="my-6 text-center">Log In</H1>

      <AuthForm page="login" />

      <p className="mt-5 text-muted-foreground">
        No account yet?{" "}
        <Link href="/signup" className="font-medium">
          Sign up
        </Link>
      </p>
    </main>
  );
}
