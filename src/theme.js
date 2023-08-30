import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";

const theme = extendTheme({
  fonts: {
    body: `'Open Sans', sans-serif`,
  },
});

export default theme;
