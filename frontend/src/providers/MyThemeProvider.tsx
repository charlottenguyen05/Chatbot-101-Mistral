import { createTheme, ThemeProvider } from "@mui/material";
import { JSX, ReactNode } from "react";

const theme = createTheme({
  typography: {
    fontFamily: "Noto Sans",
    allVariants: { color: "white" },
  },
  palette: {
    primary: {
      main: "#05203b",
      dark: "#051f38",
      contrastText: "white"
    },
    secondary: {
      main: "#69f0ae",
      dark: "#00c853",
    },
  },
});

export default function MyThemeProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
