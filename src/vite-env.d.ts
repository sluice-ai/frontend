/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY?: string;
}

declare module "lucide-react/dist/esm/icons/*" {
  import type { LucideIcon } from "lucide-react";

  const icon: LucideIcon;
  export default icon;
}
