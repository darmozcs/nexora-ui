import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "indigo",
  defaultRadius: "md",
  components: {
    Table: {
      defaultProps: {
        highlightOnHover: true,
        verticalSpacing: "sm",
        withTableBorder: true,
      },
    },
  },
});
