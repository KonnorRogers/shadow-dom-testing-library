import * as React from "react";
import { AnimatedImage } from "../components";
import { render } from "@testing-library/react";
import { findByShadowAltText, screen } from "../src/index";

describe("ShadowAltText()", () => {
  it("should work with all queries", async () => {
    const { container } = render(<AnimatedImage />);

    const findContainerAlt = await findByShadowAltText(container, /untied/, {
      exact: false,
    });
    expect(findContainerAlt).toBeInTheDocument();
    const findContainerAlts = await screen.findAllByShadowAltText(
      "Animation of untied shoes walking on pavement"
    );
    expect(findContainerAlts.length).toBeGreaterThan(0);

    const queryContainerAlt = screen.queryByShadowAltText(
      "Animation of untied shoes walking on pavement"
    );
    expect(queryContainerAlt).toBeInTheDocument();
    const queryContainerAlts = screen.queryAllByShadowAltText(
      "Animation of untied shoes walking on pavement"
    );
    expect(queryContainerAlts.length).toBeGreaterThan(0);

    const getContainerAlt = screen.getByShadowAltText(
      "Animation of untied shoes walking on pavement"
    );
    expect(getContainerAlt).toBeInTheDocument();
    const getContainerAlts = screen.getAllByShadowAltText(
      "Animation of untied shoes walking on pavement"
    );
    expect(getContainerAlts.length).toBeGreaterThan(0);

    // // Use await findByX to let things render then use other calls.
    const findAlt = await screen.findByShadowAltText(
      "Animation of untied shoes walking on pavement"
    );
    expect(findAlt).toBeInTheDocument();
    const findAlts = await screen.findAllByShadowAltText(/shoes/, {
      exact: false,
    });
    expect(findAlts.length).toBeGreaterThan(0);

    const queryAlt = screen.queryByShadowAltText(
      "Animation of untied shoes walking on pavement"
    );
    expect(queryAlt).toBeInTheDocument();
    const queryAlts = screen.queryAllByShadowAltText(
      "Animation of untied shoes walking on pavement"
    );
    expect(queryAlts.length).toBeGreaterThan(0);

    const getAlt = screen.getByShadowAltText(
      "Animation of untied shoes walking on pavement"
    );
    expect(getAlt).toBeInTheDocument();
    const getAlts = screen.getAllByShadowAltText(
      "Animation of untied shoes walking on pavement"
    );
    expect(getAlts.length).toBeGreaterThan(0);
  });
});
