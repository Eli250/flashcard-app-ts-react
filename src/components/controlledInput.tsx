import { Controller } from "react-hook-form";
import InputField from "./input";

const ControlledInputs = ({
  name,
  control,
  variant,
  placeholder,
  ...props
}: {
  name: string;
  control: any;
  variant: any;
  placeholder: string;
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <InputField
        variant="outlined"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        otherStyles={{
          width: "100%",
          height: 40,
        }}
        {...props}
      />
    )}
  />
);

export default ControlledInputs;
