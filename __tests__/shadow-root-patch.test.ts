test("does not throw when the library is evaluated again in the same window", async () => {
  await import("../src/index");

  jest.resetModules();

  await expect(import("../src/index")).resolves.toBeDefined();
});
