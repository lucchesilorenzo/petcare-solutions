"use client";

import { usePetContext } from "@/lib/hooks";
import React from "react";

export default function Stats() {
  const { numberOfPets } = usePetContext();

  return (
    <section className="text-center">
      <p className="text-xl font-semibold leading-6">{numberOfPets}</p>
      <p className="text-md opacity-80">current guests</p>
    </section>
  );
}
