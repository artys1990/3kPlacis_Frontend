import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "../features/components/Header";
import Footer from "#/features/components/Footer.tsx";

export const Route = createFileRoute("/_public")({
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <div className="container">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
