import { ChangeEvent } from "react";

type Props = {
  placeholder?: string;
  className?: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Input = (props: Props) => {
  const { placeholder = "", className = "", value, onChange } = props;
  return <input placeholder={placeholder} className={className} value={value} onChange={onChange} />;
};
