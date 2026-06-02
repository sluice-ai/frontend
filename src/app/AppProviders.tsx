import { BrowserRouter } from "react-router-dom";

import AppRouter from "@/app/AppRouter";
import { useTheme } from "@/shared/theme/useTheme";

export function AppProviders() {
  useTheme();

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
