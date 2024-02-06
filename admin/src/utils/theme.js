import { createTheme } from "@mui/material";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#1cacdc",
      },
      secondary: {
        main: "#f50000",
      },
    },
  });
