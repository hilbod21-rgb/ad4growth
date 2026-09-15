import { defineConfig } from "vite";
import vinext from "vinext";


// Independent Cloudflare build: no Sites plugin, auth proxy or Work runtime.
export default defineConfig(async () => {
  process.env.WRANGLER_WRITE_LOGS = "false";
  process.env.WRANGLER_LOG_PATH = ".wrangler/logs";
  process.env.WRANGLER_SEND_METRICS = "false";
  const { cloudflare } = await import("@cloudflare/vite-plugin");
  return {
  plugins: [vinext(), cloudflare({
    configPath: "wrangler.production.jsonc",
    viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    inspectorPort: false,
  })],
};
});
