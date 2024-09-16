import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 py-4">
      <small className="opacity-50">
        &copy; {new Date().getFullYear()} Lorenzo Lucchesi. All rights reserved.
      </small>
    </footer>
  );
}
