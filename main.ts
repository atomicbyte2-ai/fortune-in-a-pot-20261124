// SPDX-License-Identifier: MIT
// Fortune in a Pot — one-line entry for make.fun.
// Prints a fortune-cookie-style fortune for the houseplant on the
// windowsill, validates it, and writes it to entry.txt.
// No network, no input, no dependencies: the line is fixed below.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Your roots are plotting an escape, but the sun talked them into one more summer on this sill.";

const MAX_CHARS = 120;

if (LINE.length < 1 || LINE.length > MAX_CHARS) {
  throw new Error(
    `fortune must be 1-${MAX_CHARS} characters, got ${LINE.length}`,
  );
}
if (/[\r\n]/.test(LINE) || LINE.trim() !== LINE) {
  throw new Error("fortune must be one clean line with no extra whitespace");
}
// The fortune has to be unmistakably about the plant on the windowsill:
// it must name the plant itself or its pot, roots, leaves, or sill.
if (!/\b(roots?|leaves?|leaf|pot|plant|sill|stem|soil)\b/i.test(LINE)) {
  throw new Error("fortune must be about the plant, its pot, or the sill");
}

// Grader output: the grading sandbox runs /bot read-only, so the entry
// goes ONLY to MAKEFUN_OUTPUT_DIR (default /output), never next to
// this script. main.ts writes no file in its own directory.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, LINE, "utf8");

console.log(`fortune (${LINE.length} chars): ${LINE}`);
console.log(`wrote entry.txt to ${entryPath}`);
