import * as React from "react"
import { SlAvatar, SlButton, SlTextarea } from "@shoelace-style/shoelace/dist/react"

export function SimpleButton () {
  const [count, setCount] = React.useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}

export function Button() {
  const [count, setCount] = React.useState(0)

  return (
    <SlButton onClick={() => setCount(count + 1)}>
      {count}
    </SlButton>
  );
}

export const TextArea = () => <SlTextarea label="Comments" />
export const Avatar = ({...props}) => <SlAvatar label={props.label} {...props} />;
