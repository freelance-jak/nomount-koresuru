import type { ReactNode } from "react";
import { Footer } from "src/components/footer";
import { Header } from "src/components/header";

export const Layout = (props: { children: ReactNode }) => {
  return (
    <>
      <div className="w-screen m-auto">
        <Header />
        <main className="h-screen others:py-10 bg-gray-100">{props.children}</main>
        <Footer />
      </div>
    </>
  );
};
