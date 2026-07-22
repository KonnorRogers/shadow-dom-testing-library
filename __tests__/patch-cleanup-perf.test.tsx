import React from "react";
import { render } from "@testing-library/react";
import { screen } from "../src/index";
import { Duplicates } from "../components";

// Self-relative perf guard for the childNodes wrapper leak: it measures the
// same 500 plain childNodes accesses before and after 200 queries in one
// process, so machine speed cancels out and only growth-with-query-count can
// fail it. Correct disposal measures ~1x; the leak measures ~300x (0.7ms ->
// ~200ms), so the generous 25x bound cannot flake in CI yet always catches a
// regression.
//
// To see it fail on an unfixed tree, this file is self-contained on purpose —
// copy it alone onto main (or cherry-pick its test-only commit) and run it:
//
//   git checkout <this-branch> -- __tests__/patch-cleanup-perf.test.tsx
//   npx vitest run __tests__/patch-cleanup-perf.test.tsx
//
// It lives in its own file because the leak accumulates across tests within a
// file, which would poison the "before" baseline; vitest and jest both give
// each file a fresh environment.
test("childNodes access cost stays flat as query count grows", () => {
  render(<Duplicates />);
  const body = document.body;

  const measure = () => {
    const start = performance.now();
    for (let i = 0; i < 500; i++) {
      void body.childNodes.length;
    }
    return performance.now() - start;
  };

  // Warm up, then baseline with a pristine prototype.
  measure();
  const before = measure();

  for (let i = 0; i < 200; i++) {
    screen.queryAllByShadowRole("button");
  }

  const after = measure();
  console.log(
    `childNodes x500: before=${before.toFixed(2)}ms after=${after.toFixed(
      2,
    )}ms ratio=${(after / Math.max(before, 0.01)).toFixed(1)}x`,
  );

  // With patches disposed correctly this is ~1x; the leaked wrapper chain on
  // unfixed code makes it hundreds of times slower. 25x leaves huge margin
  // for CI timer noise without ever tolerating the leak.
  expect(after).toBeLessThan(Math.max(before, 0.05) * 25);
});
