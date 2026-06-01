import { BrowserRouter } from "react-router-dom";

import AppRouter from "@/app/AppRouter";

export function AppProviders() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
