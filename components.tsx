import * as React from "react"
import { SlTextarea, SlButton } from "@shoelace-style/shoelace/dist/react"

export function Button() {
  const [count, setCount] = React.useState(0)

  return (
    <SlButton onClick={() => setCount(count + 1)}>
      {count}
    </SlButton>
  );
}

export function TextArea () {
  return <SlTextarea label="Comments" />
}
