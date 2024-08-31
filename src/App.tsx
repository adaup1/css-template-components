import React from "react";
import { styled } from "./styled";

// Component with props
const Name = ({ name }: { name: string }) => {
  return <div>{name}</div>;
};

// Styled React component
const StyledName = styled(
  Name,
  ({ name }) => `
  background: ${name === "Andy" ? "green" : "blue"};
  color: red;
`
);

// Styled HTML element
const StyledDiv = styled(
  "div",
  ({ name }) => `
  background: ${name === "Andy" ? "yellow" : "orange"};
  color: red;
`
);

function App() {
  return (
    <>
      <StyledName name="Frank" />
      <StyledName name="Andy" />
      <StyledDiv name="Frank">Frank</StyledDiv>
      <StyledDiv name="Andy">Andy</StyledDiv>
    </>
  );
}

export default App;
