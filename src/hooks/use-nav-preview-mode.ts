"use client";

// True when this document is loaded as a nav hover iframe (`?nav-preview=1`).
// Used to strip preloader / transition / nav so the miniature stays light.
import { useEffect, useState } from "react";
import { readNavPreviewFlag } from "@/utils/nav-preview";

export const useNavPreviewMode = () => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(readNavPreviewFlag());
  }, []);
  return active;
};
