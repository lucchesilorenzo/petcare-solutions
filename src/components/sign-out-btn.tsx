"use client";

import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { logOut } from "@/lib/actions";

export default function SignOutBtn() {
  const [isPending, startTransition] = useTransition();

  function handleLogOut() {
    startTransition(async () => await logOut());
  }

  return (
    <Button disabled={isPending} onClick={handleLogOut}>
      Sign out
    </Button>
  );
}
