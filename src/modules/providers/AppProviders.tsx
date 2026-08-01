import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";
import { i18n } from "@/libs/i18n";
import { queryClient } from "@/libs/query";
import { AuthProvider } from "@/modules/user/contexts";
import { theme } from "@/theme";

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>{children}</AuthProvider>
        </I18nextProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};
