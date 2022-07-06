import * as React from "react"

import { render } from '@testing-library/react'
import { findByShadowLabelText, screen } from "../src/index"
import { TextArea } from "../components"

test('byShadowLabelText', async () => {
  const { container } = render(<TextArea />)

  // expect(await findByShadowLabelText(container, "Comments")).toBeInTheDocument()
  // const findContainerBtns = await screen.findAllByShadowLabelText("Comments")
  // expect(findContainerBtns.length).toBeGreaterThan(0)

  // const queryContainerBtn = screen.queryByShadowLabelText("Comments")
  // expect(queryContainerBtn).toBeInTheDocument()
  // const queryContainerBtns =  screen.queryAllByShadowLabelText("Comments")
  // expect(queryContainerBtns.length).toBeGreaterThan(0)

  // const getContainerBtn = screen.getByShadowLabelText("Comments")
  // expect(getContainerBtn).toBeInTheDocument()
  // const getContainerBtns = screen.getAllByShadowLabelText("Comments")
  // expect(getContainerBtns.length).toBeGreaterThan(0)

  // // Use await findByX to let things render then use other calls.
  const findBtn = await screen.findByText("Comments")
  expect(findBtn).toBeInTheDocument()
  // const findBtns = await screen.findAllByLabelText("Comments")
  // expect(findBtns.length).toBeGreaterThan(0)

  // const queryBtn = screen.queryByLabelText("Comments")
  // expect(queryBtn).toBeInTheDocument()
  // const queryBtns =  screen.queryAllByLabelText("Comments")
  // expect(queryBtns.length).toBeGreaterThan(0)

  // const getBtn = screen.getByLabelText("Comments")
  // expect(getBtn).toBeInTheDocument()
  // const getBtns = screen.getAllByLabelText("Comments")
  // expect(getBtns.length).toBeGreaterThan(0)
})

