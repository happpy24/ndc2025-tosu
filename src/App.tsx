import "./static/style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TosuProvider } from "./state/tosu";
import { DashboardSettingsProvider } from "./state/dashboard";
import { Screens } from "./Screens";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      experimental_prefetchInRender: true,
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 10,
      throwOnError: true,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardSettingsProvider>
        <TosuProvider>
          <Screens />
        </TosuProvider>
      </DashboardSettingsProvider>
    </QueryClientProvider>
  );
}
