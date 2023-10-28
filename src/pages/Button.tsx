import { ButtonHTMLAttributes, PropsWithChildren, forwardRef } from "react";

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
>(function Button(props, ref) {
  return (
    <button ref={ref} {...props}>
      {props.children}
    </button>
  );
});


