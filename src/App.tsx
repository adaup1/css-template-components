import { styled } from "./styled";

const Name = ({ name }: { name: string }) => {
  return <div>{name}</div>;
};

const App = () => {
  return (
    <>
      <StyledComponent name="Frank" />
      <StyledComponent name="Andy" />
      <StyledDiv>Frank</StyledDiv>
      <StyledDiv>Andy</StyledDiv>
    </>
  );
};

export default App;

// Styled React component
const StyledComponent = styled(
  Name,
  ({ name }) => `
  background: ${name === "Andy" ? "green" : "blue"};
  color: red;
`
);

// Styled HTML element with static styles
const StyledDiv = styled(
  "div",
  `
  color: purple;
`
);
