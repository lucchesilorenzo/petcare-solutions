import React from "react";
import { Metadata } from "next";
import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import SignOutBtn from "@/components/sign-out-btn";
import { checkAuth } from "@/lib/server-utils";

export const metadata: Metadata = {
  title: "Account",
};

export default async function AccountPage() {
  const session = await checkAuth();

  return (
    <main>
      <H1 className="my-6 text-white">Your Account</H1>

      <ContentBlock className="flex h-[500px] flex-col items-center justify-center">
        <p className="mb-3">
          Logged in as <span className="font-medium">{session.user.email}</span>
        </p>
        <SignOutBtn />
      </ContentBlock>
    </main>
  );
}
