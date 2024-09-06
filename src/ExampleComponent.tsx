// EXAMPLE
import { styled } from "./client/styled";

// Child component that will be styled in the parent
const ChildComponent = ({ name, age }: { name: string; age: number }) => {
  return (
    <>
      <StyledFlexContainer>
        <p>{`name: ${name}`}</p>
        <p>{`age: ${age}`}</p>
      </StyledFlexContainer>
    </>
  );
};

// A styled div element with static styles for use inside ChildComponent
const StyledFlexContainer = styled(
  "div",
  `
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  width: 100%;
  color: black;
`
);

// Some data
const people = [
  { name: "Marissa", age: 28 },
  { name: "Dave", age: 34 },
  { name: "Ronald", age: 54 },
  { name: "Sarah", age: 47 },
];

// The parent component that will map over the data and return the styled version of ChildComponent (see below for styles)
const ExampleComponent = () => {
  return (
    <>
      {people.map((person) => (
        <StyledChildComponent name={person.name} age={person.age} />
      ))}
    </>
  );
};

export default ExampleComponent;

// Styled ChildComponent with dynamic styles based on props for use inside ParentComponent
const StyledChildComponent = styled(
  ChildComponent,
  ({ name, age }: { name: string; age: number }) => `
  background-color: ${name === "Ronald" ? "green" : "blue"};

  :hover {
    background-color: yellow;
  }
  
  > * {
    color: ${age === 34 && "red"};
  }
`
);
