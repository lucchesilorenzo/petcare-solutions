import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <main>
      <H1 className="my-6 text-center">Sign Up</H1>

      <AuthForm page="signup" />

      <p className="mt-5 text-muted-foreground">
        Already have an account? {""}
        <Link href="/login" className="font-medium">
          Log in
        </Link>
      </p>
    </main>
  );
}
