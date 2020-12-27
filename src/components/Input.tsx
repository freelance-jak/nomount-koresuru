import { ChangeEvent } from "react";

type Props = {
  placeholder?: string;
  className?: string;
  value: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Input = (props: Props) => {
  const { className = "", placeholder = "", onChange } = props;
  return <input className={className} placeholder={placeholder} onChange={onChange} />;
};
