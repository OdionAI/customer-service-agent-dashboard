import { defineConfig } from "@chakra-ui/react";

export const theme = defineConfig({
  theme: {
    textStyles: {
      fonts: {
        body: "Neue Montreal, sans-serif", // Match the EXACT font name from your font file
        heading: "Neue Montreal, sans-serif",
      },
    },
    tokens: {
      colors: {},
    },
  },
});
