import React from "react";

interface Prop {
  text: string;
  ok?: boolean;
}
export const TextField: React.FC<Prop> = ({ text }) => {
  return (
    <div>
      <label>{text}</label>
      <input />
    </div>
  );
};
