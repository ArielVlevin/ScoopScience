import { Outlet } from "../../node_modules1/react-router-dom/dist";
import Navbar from "./layouts/navbar/nabvar";
import Footer from "./layouts/footer";
import { ThemeProvider } from "./layouts/ThemeProvider";

function RootLayout() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Navbar />
        <div>
          <Outlet />
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}

export default RootLayout;
