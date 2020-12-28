import { ChangeEvent } from "react";

type Props = {
  placeholder?: string;
  className?: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Input = (props: Props) => {
  const { className, value, placeholder, onChange } = props;
  return <input className={className} value={value} placeholder={placeholder} onChange={onChange} />;
};
