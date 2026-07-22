import React from "react";
import { render } from "@testing-library/react";
import { screen } from "../src/index";
import { Duplicates } from "../components";

// In its own file: the leak this guards against accumulates across tests in a
// file, which would poison the baseline measurement below.
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
