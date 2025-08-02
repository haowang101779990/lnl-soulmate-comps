import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import packageJson from "./package.json" assert { type: "json" };
import copy from 'rollup-plugin-copy';
import url from '@rollup/plugin-url'; // Add this plugin


const peerDependencies = Object.keys(packageJson.peerDependencies || {});



export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: 'dist', // in package.json main field
        format: "cjs",
        sourcemap: true,
        entryFileNames: "cjs/index.js",
        chunkFileNames: 'chunks/[name].js',
      },
      {
        dir: 'dist', // in package.json  module field
        format: "esm",
        sourcemap: true,
        entryFileNames: "esm/index.js",
        chunkFileNames: 'chunks/[name].js',
      },
    ],
    plugins: [ //bundling process
      resolve({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        skip: ["react", "react-dom"],
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        exclude: ["**/*.test.tsx", "**/*.test.ts", "**/*.stories.ts"],
      }),
      postcss({ extensions: [".css"], inject: true, extract: false }),
      copy({
      targets: [
        { src: 'asset/*', dest: 'dist/asset' },
      ],
      
  
    }),
    // url({
    //     // This will handle imports like 'import myImage from './asset/image.png''
    //     // and replace 'myImage' with the path to the file.
    //     // You can configure it to inline small files as base64.
    //     include: ['asset/*.png','asset/*.atlas','asset/*.json'],
    //     limit: 0, // 10kb
    //     fileName: 'asset/[name]-[hash][extname]',
    //   }),
    ],
    //This means Rollup will not bundle their code into your output.
    // Instead, it assumes that these modules will be available in the environment where your bundled code runs.
    external: ["react/jsx-runtime",...peerDependencies],
  },
  //the second configuration, not part of plugin!
  //Rollup will effectively perform two distinct bundling operations.
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
