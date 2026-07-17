import { cpSync, existsSync, mkdirSync } from "node:fs";

// Yarn often hoists `postcss` out of `next/node_modules`, but `next/font` still
// requires `next/node_modules/postcss/lib/postcss.js`. Copy if missing.
const src = "node_modules/postcss";
const dest = "node_modules/next/node_modules/postcss";

if (!existsSync("node_modules/next") || !existsSync(src)) process.exit(0);
if (existsSync(`${dest}/lib/postcss.js`)) process.exit(0);

mkdirSync("node_modules/next/node_modules", { recursive: true });
cpSync(src, dest, { recursive: true });
console.log("ensure-next-postcss: nested postcss for next/font");
