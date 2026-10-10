import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Load each image from the file stored next to its .asset.json pointer so the repo runs anywhere.
const PREFIX = "\0local-asset:";
const localAssets = {
  name: "local-asset-pointers",
  enforce: "pre" as const,
  resolveId(source: string, importer: string | undefined) {
    if (!source.endsWith(".asset.json") || !importer) return null;
    const base = source.startsWith("@/")
      ? path.resolve(__dirname, "src", source.slice(2))
      : path.resolve(path.dirname(importer.split("?")[0] ?? importer), source);
    const binary = base.slice(0, -".asset.json".length);
    return fs.existsSync(binary) ? PREFIX + base + ".mjs" : null;
  },
  load(id: string) {
    if (!id.startsWith(PREFIX)) return null;
    const file = id.slice(PREFIX.length, -".mjs".length);
    const meta = JSON.parse(fs.readFileSync(file, "utf8"));
    const binary = file.slice(0, -".asset.json".length);
    return `import url from ${JSON.stringify(binary)};\nexport default { ...${JSON.stringify(meta)}, url };`;
  },
};

export default defineConfig({
  plugins: [localAssets],
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: { preset: "vercel" },
});
