const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["./src/apps/cli/index.ts", "./src/apps/mcp-server/index.ts"],
    outdir: "dist",
    bundle: true,
    platform: "node",
    target: "node22",
    banner: { js: "#!/usr/bin/env node" },
    external: ["esbuild"],
    sourcemap: true,
  })
  .then(() => console.log("Build completed successfully"))
  .catch((error) => {
    console.error("Build failed:", error);
    process.exit(1);
  });
