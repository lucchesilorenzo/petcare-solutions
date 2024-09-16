import { cn } from "@/lib/utils";
import React from "react";

type ContentBlockProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContentBlock({
  children,
  className,
}: ContentBlockProps) {
  return (
    <div
      className={cn(
        "h-full w-full overflow-hidden rounded-sm bg-slate-50 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
