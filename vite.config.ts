import { defineConfig, loadEnv } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig(({ mode }) => {
  // Vite does NOT populate process.env from .env for code running inside this
  // config file itself (only for app code, via import.meta.env) — loadEnv is
  // the correct way to read it here. Empty 3rd arg = load every var, not just
  // VITE_-prefixed ones, since SUPABASE_URL/SUPABASE_PUBLISHABLE_KEY aren't.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tailwindcss(),
      tanstackStart({
        // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
        server: { entry: "server" },
      }),
      viteReact(),
      // Builds the deployable server bundle for Cloudflare Workers.
      // Change to "cloudflare-pages", "node-server", "vercel", etc. if deploying elsewhere.
      nitro({
        preset: "cloudflare-module",
        // Hashed JS/CSS files (e.g. index-B0-dJPsU.js) are safe to cache
        // forever — the filename itself changes whenever the content does.
        // The HTML document is NOT safe to cache long — it's what tells the
        // browser which hashed filenames to fetch, so a stale copy of it
        // points at files a new deploy has already replaced. Without an
        // explicit rule here, browsers apply their own default heuristic
        // caching to the document, which is exactly what causes "failed to
        // fetch dynamically imported module" errors after a fresh deploy.
        routeRules: {
          "/**": { headers: { "cache-control": "no-cache, must-revalidate" } },
          "/assets/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
        },
        // These become the Worker's live "Variables and Secrets" on every
        // deploy — sourced from .env at build time, so they're never lost to
        // `wrangler deploy` overwriting the dashboard's own manual entries,
        // and never require manually re-adding them there again.
        cloudflare: {
          wrangler: {
            name: "tantraya-app",
            vars: {
              SUPABASE_URL: env.SUPABASE_URL ?? "",
              SUPABASE_PUBLISHABLE_KEY: env.SUPABASE_PUBLISHABLE_KEY ?? "",
            },
          },
        },
      }),
    ],
    resolve: {
      // Avoid duplicate React/TanStack instances if a dependency bundles its own copy.
      dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"],
    },
  };
});
