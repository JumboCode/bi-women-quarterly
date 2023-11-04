## Basic Style Guide

### TypeScript

-   Always use `interface` for public API's definition when exporting from module.
-   Use `type` when you need specific features.
-   Use `.tsx` file extension for React components.
-   Use strict mode for TypeScript.
-   Use named exports instead of default exports.
-   Always specify return type of functions.

### React

-   Functional components should be the primary method for creating components. Class components should be avoided.
-   Use React hooks.
-   Ensure all components are typed using TypeScript.

    Example of function component with props:

    ```tsx
    interface Props {
        className?: string;
    }

    const MyComponent = props => {
        //...
    };
    ```

### General

-   Use 4 spaces indentation.
-   Use semicolons at the end of statements.
-   Trailing commas should be also be included in multi-line statements.
-   Each line should be at most 80 characters long.
