import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import json from "@rollup/plugin-json";
import scss from "rollup-plugin-scss";
import typescript from "@rollup/plugin-typescript";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.ts",
  output: {
    file: "public/bundle.js",
    format: "iife", // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true,
  },
  plugins: [
    typescript({
      sourceMap: !production,
      inlineSources: !production,
      resolveJsonModule: true,
      compilerOptions: {
        lib: ["es5", "es6", "dom"],
        target: "es5",
        moduleResolution: "node",
      },
    }),
    serve({
      opne: true,
      port: 3030,
      contentBase: ["public"],
    }),
    json(),
    resolve(), // tells Rollup how to find date-fns in node_modules
    commonjs(), // converts date-fns to ES modules
    production && terser(), // minify, but only in production
    livereload({
      port: 3030,
    }),
    scss({
      output: "public/style.css",
      watch: "src/style.scss",
    }),
  ],
};
