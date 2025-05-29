import Navbar from "@/components/navbar";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />

      <Outlet />
    </>
  ),
});
