import React from "react";
import { TextField, styled } from "@mui/material";

const StyledInputs = styled(TextField)(({ theme, ...props }) => ({
  [theme?.breakpoints.down("sm")]: {
    width: 280,
    height: 25,
    bottom: "20px",
    margin: "30px 1px",
  },
  width: "100%",
  height: 50,
  margin: "20px 1px 30px 1px",
}));

const InputField = ({ ...props }) => (
  <StyledInputs
    {...props}
    sx={{
      "& .MuiFormLabel-root": {
        color: "#00095E",
      },
      "& .MuiFormLabel-root.Mui-focused": {
        color: "#00095E",
      },
      "& .MuiInputBase-root": {
        color: "#00095E",
        "& fieldset": {
          borderColor: "#00095E",
        },

        "&.Mui-focused fieldset": {
          borderColor: "#00095E",
        },
      },
      "&.Mui-focused .MuiInputBase-root": {
        color: "#00095E",
      },
    }}
  />
);
export default InputField;
