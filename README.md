# CSS-TEMPLATE-COMPONENTS

##### A simple CSS in JS library for client and server-side React Components

Github: [@adaup1/css-template-components](https://github.com/adaup1/css-template-components)

### INSTALLATION

**npm**  
`npm i css-template-components`

**yarn**
`yarn add css-template-components`

**pnpm**
_`pnpm add css-template-components`_

### SERVER-SIDE RENDERING SETUP _(SKIP IF CLIENT-SIDE ONLY)_

Using css-template-components with server-side rendering requires just a \*tiny bit of extra setup. If you are only using css-template components on the client-side you can skip this section. **_For this documention, we'll be using Next.js with App Router._**

**1.** Import the getServerStyles function from "css-template-components/server" into the root component of the project. In Next.js using App Router, this will the root layout.tsx.

```
import { getServerStyles } from "css-template-components/server";
```

**2.** Inside the RootLayout Component, call getServerStyles and assign it to a variable

```
const serverStyles = getServerStyles();
```

**3.** Add a _<style>_ tag inside the _<header>_ of your RootLayout with a child of _{ serverStyles }_ or whatever you named your variable. _Optionally, you can add an id._

**Here is an example full implementation:**

```
import { getServerStyles } from "css-template-components/server ";

export default function RootLayout({ children}) {
  const serverStyles = getServerStyles();

  return (
    <html>
      <head>
        <style>{serverStyles}</style>
      <head>
      <body>{children}</body>
    </html>
    );
}
```

## Using Styles

Css-template-components uses a function called _styled_ which returns a React Component with CSS styles.

No need to add a className since _styled_ automatically adds a unique className to the component. Under the hood, css-template-components generates style sheets with these classNames. This means you don't need to mannually create any style sheets.

If you are familiar with tagged template strings in [styled-components](https://www.npmjs.com/package/styled-components), you'll find using css-template-components very familiar, with only a few small differences.

Styled-components is an incredible library, but it uses React.context under the hood, which prevents it from being used in Next.js server components.

#### For server components

```
import { styled } from "css-template-components/server";
```

#### For client components

```
import { styled } from "css-template-components/client";
```

## From here on out, usage is the same!

The _styled_ function requires two arguments:
**First Argument:**

- A JSX element string _(keyof JSX.IntrinsicElements)_ **_(Example:_** `'div', 'p', 'a', 'ul', ..etc` **_)_**
- A React Components _(React.ComponentType<any>)_

**Second Argument:**

- A tagged template string **_(For static styles)_**
- An callback returning a tagged template string **_(For dynamic styles)_**

_Tagged template strings should contain valid CSS_

### Code Examples

##### Example 1

Create a <p> element with static styles inside a client component:

```
"use client";
import { styled } from "css-template-components/client";

export const MyComponent = () => {
  return (
      <StyledParagraph>
        My styles are static!
      <StyledParagraph>
  );
};

const StyledParagraph = styled(
  "p",
  `
  padding: 1rem;
  color: purple;
`
);

```

##### Example 2

Create a <div> element with dynamic styles inside a server component:

```
import { styled } from "css-template-components/server";

export const MyComponent = () => {
  return (
      <StyledDiv name='Frank'>
        My styles are dynamic based on my properties!
      </StyledParagraph>
  );
};

const StyledDiv = styled(
  "div",
  ({ name })=>  `
  background-color: ${name === "Frank" ? '#ff0000' : '#00ffff'};
`
);

```

##### Example 3

Style a child component inside the parent with static styles.

```
import { styled } from "css-template-components/server";

// Child component that will be styled in the parent
const ChildComponent = () => {
  return <>I'm the child!</>;
};

// The parent component that return the styled version of ChildComponent (see below for styles)
export const ParentComponent = () => {
  return <StyledChildComponent />;
};

// Styled ChildComponent with static styles for use inside ParentComponent
const StyledChildComponent = styled(
  ChildComponent,
  `
 background: #ff0000;
 color: white;
 padding: 1rem;
`
);
```

##### Example 4

This is the most complex example. We'll be creating a ChildComponent and ParentComponent. The ChildComponent will include a styled <div> with static styles. The ParentComponent will include a styled version of the ChildComponent with dynamic styles. We'll even add a touch of Typescript.

```
"use client"
import { styled } from "css-template-components/styled";

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
export const ParentComponent = () => {
  return (
    <>
      {people.map((person) => (
        <StyledChildComponent name={person.name} age={person.age} />
      ))}
    </>
  );
};

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
```

## Tips and Tricks

##### Callbacks still work for static styles, just don't pass in any props.

Example:

```
// Static styles with string for second argument
const StyledDiv = styled(
  "div",
  `
  padding: 1rem;
`
);

// Static styles with callback for second argument
const StyledDiv = styled(
  "div",
  () => `
  padding: 1rem;
`
);
```

## Thank you for choosing css-template-components!

## ENJOY!
