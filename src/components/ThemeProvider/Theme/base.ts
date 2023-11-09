const rootElement = document.getElementById("root");

const baseComponent = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarWidth: "thin",
      },
    },
  },
  // this should be set to make tailwind work to the mui component
  MuiPopover: {
    defaultProps: {
      container: rootElement,
    },
  },
  MuiPopper: {
    defaultProps: {
      container: rootElement,
    },
  },
  MuiDialog: {
    defaultProps: {
      container: rootElement,
    },
  },
};

export default baseComponent;
