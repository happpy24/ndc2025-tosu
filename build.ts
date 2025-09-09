import { $ } from "bun";
import bunPluginTailwind from "bun-plugin-tailwind";

const targets: Record<string, Bun.Build.Target> = {
  windows: "bun-windows-x64",
  macos: "bun-darwin-x64",
  linux: "bun-linux-x64",
};

const version = await $`git describe --tags --always`.text();
const buildTime = new Date().toISOString();
const gitCommit = await $`git rev-parse HEAD`.text();

const define = (config: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(config).map(([key, value]) => [key, JSON.stringify(value)]),
  );

for (const [platform, target] of Object.entries(targets)) {
  await Bun.build({
    // plugins: [bunPluginTailwind],
    entrypoints: ["./src/server.ts"],
    outdir: "./dist",
    env: "PUBLIC_*",
    define: define({
      "process.env.NODE_ENV": "production",
      BUILD_VERSION: version.trim(),
      BUILD_TIME: buildTime,
      GIT_COMMIT: gitCommit.trim(),
    }),
    compile: {
      target,
      outfile: `ndc-overlay-${platform}`,
    },
    minify: true,
    sourcemap: true,
  });
}

console.log("Build successful :3");
