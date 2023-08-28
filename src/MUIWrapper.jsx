import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState, useEffect } from "react";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

/**
    TypeScript and React inconvenience:
    These functions are in here purely for types! 
    They will be overwritten - it's just that
    createContext must have an initial value.
    Providing a type that could be 'null | something' 
    and initiating it with *null* would be uncomfortable :)
  */
export const MUIWrapperContext = createContext({
  toggleColorMode: () => {},
  changeDirection: (dir) => {},
});

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const emptyCache = createCache({
  key: "meaningless-key",
});

export default function MUIWrapper({ children }) {
  const [mode, setMode] = useState("light");
  const [direction, setDirection] = useState("ltr");
  const muiWrapperUtils = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      changeDirection: (dir) => {
        setDirection(dir);
      },
    }),
    []
  );

  useEffect(() => {
    document.dir = direction;
  }, [direction]);

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          h1: {
            fontFamily: "Cubano",
            letterSpacing: "0.15rem",
          },
          h2: {
            fontFamily: "Copse",
            fontSize: "3rem",
          },
          h3: {
            fontFamily: "Didact Gothic",
            fontSize: "2.5rem",
          },
          h4: {
            fontFamily: "Copse",
          },
          h5: {
            fontFamily: "Didact Gothic",
            fontWeight: "bold",
          },
          h6: {
            fontFamily: "Didact Gothic",
            fontWeight: "bold",
          },
          p: {
            fontFamily: "Didact Gothic",
            fontSize: "20px",
          },
        },
        palette: {
          mode,
          primary: {
            main: "#1565c0",
          },
          background: {
            alternate: "#eeeeee",
          },
          secondary: {
            main: "#c0ac15",
          },
          dark: {
            main: "#212121",
          },
        },
        direction,
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                fontFamily: "Didact Gothic",
                fontSize: "1.25rem",
                fontWeight: "bold",
                "&:hover": {
                  color: "white",
                },
              },
            },
          },
        },
      }),
    [mode, direction]
  );

  return (
    <CacheProvider value={direction === "rtl" ? cacheRtl : emptyCache}>
      <MUIWrapperContext.Provider value={muiWrapperUtils}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </MUIWrapperContext.Provider>
    </CacheProvider>
  );
}
