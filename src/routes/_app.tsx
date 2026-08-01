import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/_app")({
  component: RequireAuth,
});

function RequireAuth() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please sign in to access this.");
      navigate({ to: "/login", replace: true });
    }
  }, [loading, user, navigate]);

  // While we're checking auth state, or right after redirecting an
  // unauthenticated visitor, don't flash the app shell at all.
  if (loading || !user) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-sm text-muted-foreground">
        {loading ? "Loading…" : "Redirecting to sign in…"}
      </div>
    );
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
