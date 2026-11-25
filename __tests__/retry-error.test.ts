import { waitFor } from "@testing-library/dom";
import { screen } from "../src/index";

test("a retry skips printing the DOM, the final error prints it", async () => {
  document.body.innerHTML = "<button>present</button>";
  const retryMessages: string[] = [];

  await expect(
    waitFor(
      () => {
        try {
          return screen.getByShadowRole("button", { name: "absent" });
        } catch (error) {
          retryMessages.push((error as Error).message);
          throw error;
        }
      },
      { timeout: 50, interval: 10 },
    ),
  ).rejects.toThrow(/<button>/);

  expect(retryMessages.length).toBeGreaterThan(0);
  for (const message of retryMessages) {
    expect(message).not.toMatch(/<button>/);
  }
});
