import { createTheme, type MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = createTheme({
  primaryColor: "blue",
  fontFamily: "Kanit, sans-serif",

  shadows: {
    md: "1px 1px 3px rgba(0, 0, 0, .25)",
    xl: "5px 5px 3px rgba(0, 0, 0, .25)",
  },

  defaultRadius: "0.5rem",
  activeClassName: "activeTheme",
  cursorType: "pointer",

  components: {
    Modal: {
      defaultProps: {
        // overlayProps: {
        //   backgroundOpacity: 0.55,
        //   blur: 1,
        // },
        centered: true,
        transitionProps: { transition: "pop" },
      },
    },
    Breadcrumbs: {
      defaultProps: {
        separator: "•",
      },
    },
  },
});
