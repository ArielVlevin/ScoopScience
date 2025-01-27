import "@/App.css";

//import "@smastrom/react-rating/style.css";

import { AuthProvider } from "@/contexts/AuthContext.tsx";

import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import router from "@/config/router.tsx";
import queryClient from "@/config/query.ts";

import { Toaster } from "./components/ui/toaster";
import { IsMobileProvider } from "./contexts/IsMobileContext";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <IsMobileProvider>
          <RouterProvider router={router} />
          <Toaster />
        </IsMobileProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
