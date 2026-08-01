import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/pathways/buddhist/deities")({
  component: () => <Outlet />,
});
