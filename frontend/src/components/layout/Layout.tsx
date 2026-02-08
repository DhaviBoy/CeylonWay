import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20 flex flex-col m-0 p-0">{children}</main>
      <Footer />
    </div>
  );
}
