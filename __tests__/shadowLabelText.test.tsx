import * as React from "react"

import { render } from '@testing-library/react'
import { findByShadowLabelText, screen } from "../src/index"
import { TextArea } from "../components"

test('byShadowLabelText', async () => {
  const { container } = render(<TextArea />)


  const findContainerLabel = await findByShadowLabelText(container, /omments/, {exact: false})
  expect(findContainerLabel).toBeInTheDocument()
  const findContainerLabels = await screen.findAllByShadowLabelText("Comments")
  expect(findContainerLabels.length).toBeGreaterThan(0)

  const queryContainerLabel = screen.queryByShadowLabelText("Comments")
  expect(queryContainerLabel).toBeInTheDocument()
  const queryContainerLabels =  screen.queryAllByShadowLabelText("Comments")
  expect(queryContainerLabels.length).toBeGreaterThan(0)

  const getContainerLabel = screen.getByShadowLabelText("Comments")
  expect(getContainerLabel).toBeInTheDocument()
  const getContainerLabels = screen.getAllByShadowLabelText("Comments")
  expect(getContainerLabels.length).toBeGreaterThan(0)

  // // Use await findByX to let things render then use other calls.
  const findLabel = await screen.findByShadowLabelText("Comments")
  expect(findLabel).toBeInTheDocument()
  const findLabels = await screen.findAllByShadowLabelText(/mments/, {exact: false})
  expect(findLabels.length).toBeGreaterThan(0)

  const queryLabel = screen.queryByShadowLabelText("Comments")
  expect(queryLabel).toBeInTheDocument()
  const queryLabels =  screen.queryAllByShadowLabelText("Comments")
  expect(queryLabels.length).toBeGreaterThan(0)

  const getLabel = screen.getByShadowLabelText("Comments")
  expect(getLabel).toBeInTheDocument()
  const getLabels = screen.getAllByShadowLabelText("Comments")
  expect(getLabels.length).toBeGreaterThan(0)
})

