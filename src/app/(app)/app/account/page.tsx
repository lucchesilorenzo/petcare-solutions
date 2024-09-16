import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Account",
};

export default function AccountPage() {
  return (
    <main>
      <H1 className="my-6 text-white">Your Account</H1>

      <ContentBlock className="flex h-[500px] flex-col items-center justify-center">
        <p>Logged in as ...</p>
      </ContentBlock>
    </main>
  );
}
