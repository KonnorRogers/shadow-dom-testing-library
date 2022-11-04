import { prettyShadowDOM } from "../src/index";

test("Should strip style and script tags", () => {
  const div = document.createElement("div");
  div.innerHTML = `
		<!-- Comment -->
		<style>style {}</style>
		<script>const script = null</script>
		<div>Hi</div>
	`;
  const str = prettyShadowDOM(div) as string;

  expect(str.includes("Comment")).toBe(false);
  expect(str.includes("style")).toBe(false);
  expect(str.includes("script")).toBe(false);
  expect(str.includes("Hi")).toBe(true);
});
