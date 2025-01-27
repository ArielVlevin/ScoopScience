import { Outlet } from "react-router-dom";
import Navbar from "../../layouts/nabvar";
import Footer from "../../layouts/footer";
import { ThemeProvider } from "../../contexts/ThemeProvider";
import ScrollToTop from "@/contexts/ScrollToTop";

type LayoutProps = {
  plain?: boolean;
};

function Layout({ plain = false }: LayoutProps) {
  if (plain) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div>
          <ScrollToTop />
          <Outlet />
        </div>
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <div>
        <ScrollToTop />
        <Outlet />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default Layout;
