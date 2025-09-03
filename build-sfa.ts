import bunPluginTailwind from "bun-plugin-tailwind";

await Bun.build({
  plugins: [bunPluginTailwind],
  entrypoints: ["./src/index.tsx"],
  outdir: "./dist",
  compile: {
    target: "bun-linux-x64",
    outfile: "test",
  },
});
