import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";

import router from "./routes";
import useAppStateContext, { AppContext } from "./states";
import ThemeProvider from "./components/ThemeProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [state, dispatch] = useAppStateContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ state, dispatch }}>
        <ThemeProvider theme={state.theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
