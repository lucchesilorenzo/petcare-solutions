import Link from "next/link";
import Image from "next/image";
import preview from "/public/preview.jpg";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-emerald-300 p-4 xl:flex-row">
      <Image
        src={preview}
        alt="Preview of PetCare Solutions"
        className="rounded-sm"
      />

      <div>
        <Logo />
        <h1 className="my-6 max-w-[500px] text-5xl font-semibold">
          Manage your <span className="font-extrabold">pet daycare</span> with
          ease
        </h1>
        <p className="max-w-[600px] text-2xl font-medium">
          Use PetCare Solutions to easily keep track of pets under your care.
        </p>

        <div className="my-10 space-x-4">
          <Button asChild>
            <Link href="/signup">Get started</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
