import bunPluginTailwind from "bun-plugin-tailwind";

const targets = {
  windows: "bun-windows-x64",
  macos: "bun-darwin-x64",
  linux: "bun-linux-x64",
} satisfies Record<string, Bun.Build.Target>;

for (const [platform, target] of Object.entries(targets)) {
  await Bun.build({
    plugins: [bunPluginTailwind],
    entrypoints: ["./src/server.ts"],
    outdir: "./dist",
    compile: {
      target,
      outfile: `ndc-overlay-${platform}`,
    },
  });
}
