// Reports uncaught errors from the root error boundary.
// No-op by default, wire this up to your error tracker of choice
// (e.g. Sentry, LogRocket) by replacing the console.error call below.

export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  console.error("[error-boundary]", error, {
    route: window.location.pathname,
    ...context,
  });
}
