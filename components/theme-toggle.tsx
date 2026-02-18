"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggle} className="w-9 h-9">
      {dark ? "☀️" : "🌙"}
    </Button>
  );
}
