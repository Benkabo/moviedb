import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, ...props }, ref) => {
    return (
      <>
        <button ref={ref} {...props}>
          {label}
        </button>
      </>
    );
  }
);
Button.displayName = "Button";

export { Button };
