import { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
  onClick: () => void;
};

export const Button = (props: Props) => {
  const { className, children, onClick } = props;
  return (
    <button className={className} type="button" onClick={onClick}>
      {children}
    </button>
  );
};
