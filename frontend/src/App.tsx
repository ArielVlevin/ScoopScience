import "@/App.css";
import "@smastrom/react-rating/style.css";

import { AuthProvider } from "@/contexts/AuthContext.tsx";

import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import router from "@/config/router.tsx";
import queryClient from "@/config/query.ts";

import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
