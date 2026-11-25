import { getAllElementsAndShadowRoots } from "../src/index";

// Sibling hosts rather than nested ones: Jest's jsdom overflows its stack
// querying a tree nested a thousand levels deep.
function buildTree(hosts: number) {
  const outer = document.createElement("div");
  for (let i = 0; i < hosts; i++) {
    const host = document.createElement("div");
    host
      .attachShadow({ mode: "open" })
      .append(
        document.createElement("span"),
        document.createElement("span"),
        document.createElement("span"),
      );
    outer.append(host);
  }
  document.body.append(outer);
  return outer;
}

function timeCollection(tree: HTMLElement) {
  const start = performance.now();
  getAllElementsAndShadowRoots(tree);
  return performance.now() - start;
}

// Self-relative growth guard, so machine speed cancels out: with sixteen times
// the shadow roots, linear collection measures about 16x slower and quadratic
// collection 150x or more. The 64x bound sits between the two. The two sizes
// are timed in alternation and the fastest run of each kept, so a garbage
// collection or a busy machine slows both rather than one.
test("collecting shadow roots grows linearly with the tree", () => {
  const smallTree = buildTree(100);
  const largeTree = buildTree(1600);
  let small = Infinity;
  let large = Infinity;
  try {
    for (let run = 0; run < 6; run++) {
      small = Math.min(small, timeCollection(smallTree));
      large = Math.min(large, timeCollection(largeTree));
    }
  } finally {
    smallTree.remove();
    largeTree.remove();
  }
  small = Math.max(small, 0.5);
  const ratio = large / small;
  console.log(
    `collection: 100 roots=${small.toFixed(1)}ms 1600 roots=${large.toFixed(
      1,
    )}ms ratio=${ratio.toFixed(1)}x`,
  );
  expect(ratio).toBeLessThan(64);
});
