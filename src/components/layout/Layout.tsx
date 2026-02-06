import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20 flex flex-col m-0 p-0">{children}</main>
      <Footer />
    </div>
  );
}
