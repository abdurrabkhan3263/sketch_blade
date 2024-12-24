import AuthProtection from "./components/AuthProtection";
import Nav from "./components/Nav.tsx";
import AppSection from "./components/AppSection.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProtection>
        <div
          className={
            "size-screen flex flex-col items-center bg-primary text-quaternary"
          }
        >
          <Nav />
          <AppSection />
        </div>
      </AuthProtection>
    </QueryClientProvider>
  );
}

export default App;
