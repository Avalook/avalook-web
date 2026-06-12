// Standard TanStack Start config, targeting Vercel (no Cloudflare).
//
// nitro() auto-detects the deploy provider: on Vercel it emits .vercel/output
// (Vercel auto-detects TanStack Start and wires the build); locally it builds a
// node-server output. This replaces @lovable.dev/vite-tanstack-config so the
// app is no longer pinned to the Cloudflare nitro preset.
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: { port: 8090 },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    // src/server.ts is our SSR error wrapper — keep it as the server entry.
    tanstackStart({ server: { entry: "server" } }),
    nitro(),
    viteReact(),
  ],
});
