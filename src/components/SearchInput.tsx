import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLElement> {
  name: string;
}

const SearchInput = forwardRef<HTMLInputElement, InputProps>(
  ({ name, ...props }, ref) => {
    return (
      <>
        <input
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          ref={ref}
          name={name}
          {...props}
        />
      </>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
