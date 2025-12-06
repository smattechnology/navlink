import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // build from index.ts
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "next", "next/link", "next/navigation"],
});
