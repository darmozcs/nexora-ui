import { RouterProvider } from "@tanstack/react-router";
import { AppProviders } from "@/modules/providers";
import { router } from "@/router";

export const App = () => {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
};
