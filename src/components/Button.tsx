import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

interface Props
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<Props> = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={[
        "px-3 py-1.5 border border-black rounded bg-[var(--light-gray)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
};
