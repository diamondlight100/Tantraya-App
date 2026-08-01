import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders `fallback` on the server and on the very first client render, then
 * swaps to the real children once mounted in the browser. Use this around
 * anything that imports a browser-only library (PDF viewers, canvas-based
 * widgets, etc.) so the server bundle never has to evaluate that import at
 * all, not just skip rendering it, but never touch the module.
 */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: () => ReactNode;
  fallback?: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <>{fallback}</>;
  return <>{children()}</>;
}
