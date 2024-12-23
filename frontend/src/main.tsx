import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { createRoutesFromElements, Route, RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import Sign_In from "./pages/auth/Sign_In.tsx";
import Sign_Up from "./pages/auth/Sign_Up.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { All, Recent, CreatedByMe, Folder } from "./pages/Home/index";
import { Toaster } from "@/components/ui/toaster";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/home" element={<App />}>
        <Route path={""} element={<All />} />
        <Route path={"folder"} element={<Folder />} />
        <Route path={"recent"} element={<Recent />} />
        <Route path={"created-by-me"} element={<CreatedByMe />} />
        <Route path={"file/:id"} element={<>File with id</>} />
      </Route>
      <Route path="/sign-in" element={<Sign_In />} />
      <Route path="/sign-up" element={<Sign_Up />} />
    </>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/sign-in"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInForceRedirectUrl={"/home"}
      signUpForceRedirectUrl={"/home"}
    >
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster />
      </Provider>
    </ClerkProvider>
  </StrictMode>,
);
