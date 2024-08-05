import { Outlet } from "react-router-dom";
import Navbar from "../../layouts/nabvar";
import Footer from "../../layouts/footer";
import { ThemeProvider } from "../../layouts/ThemeProvider";

type LayoutProps = {
  plain?: boolean;
};
function Layout({ plain = false }: LayoutProps) {
  if (plain) {
    return (
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <div>
          <Outlet />
        </div>
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <div>
        <Outlet />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default Layout;
