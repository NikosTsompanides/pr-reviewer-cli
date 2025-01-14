const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    outfile: "./dist/index.js",
    bundle: true,
    platform: "node",
    target: "node22",
    banner: { js: "#!/usr/bin/env node" },
    external: ["esbuild"],
    minify: true,
    sourcemap: true,
  })
  .then(() => console.log("Build completed successfully"))
  .catch((error) => {
    console.error("Build failed:", error);
    process.exit(1);
  });
