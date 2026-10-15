import ComTrade from "#/features/components/UI/ComTrade.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/com-trade")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ComTrade />;
}
