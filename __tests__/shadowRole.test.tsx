import * as React from "react";

import { render, fireEvent, findAllByRole } from "@testing-library/react";
import { findByShadowRole, screen } from "../src/index";
import { Button, SimpleButton } from "../components";

describe("ShadowRole()", () => {
  it("should work with all queries", async () => {
    const { container } = render(<Button />);

    expect(await findByShadowRole(container, "button")).toBeInTheDocument();
    const findContainerBtns = await screen.findAllByShadowRole("button");
    expect(findContainerBtns.length).toBeGreaterThan(0);

    const queryContainerBtn = screen.queryByShadowRole("button");
    expect(queryContainerBtn).toBeInTheDocument();
    const queryContainerBtns = screen.queryAllByShadowRole("button");
    expect(queryContainerBtns.length).toBeGreaterThan(0);

    const getContainerBtn = screen.getByShadowRole("button");
    expect(getContainerBtn).toBeInTheDocument();
    const getContainerBtns = screen.getAllByShadowRole("button");
    expect(getContainerBtns.length).toBeGreaterThan(0);

    // Use await findByX to let things render then use other calls.
    const findBtn = await screen.findByShadowRole("button");
    expect(findBtn).toBeInTheDocument();
    const findBtns = await screen.findAllByShadowRole("button");
    expect(findBtns.length).toBeGreaterThan(0);

    const queryBtn = screen.queryByShadowRole("button");
    expect(queryBtn).toBeInTheDocument();
    const queryBtns = screen.queryAllByShadowRole("button");
    expect(queryBtns.length).toBeGreaterThan(0);

    const getBtn = screen.getByShadowRole("button");
    expect(getBtn).toBeInTheDocument();
    const getBtns = screen.getAllByShadowRole("button");
    expect(getBtns.length).toBeGreaterThan(0);

    // Check that we can actually click
    fireEvent.click(screen.getByShadowRole("button") as HTMLElement);

    // Wait for page to update with query text
    const el = await screen.findByText(/1/);
    // const els = await screen.findAllByShadowText(/1/)
    expect(el).toBeInTheDocument();
  });

  it("should also work with shadow query", async () => {
    render(<SimpleButton />);
    fireEvent.click((await screen.findByRole("button")) as HTMLElement);

    const el = await screen.findByRole("button", { name: /1/i });
    expect(el).toBeInTheDocument();
  });
});
