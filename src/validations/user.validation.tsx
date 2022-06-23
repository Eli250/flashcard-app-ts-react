import * as yup from "yup";
const regexPassword = /^(?=.*[A-Z])(?=.*[0-9])\w{8,}$/;
export const userSchema = yup.object().shape({
  name: yup.string().required("Username is Required"),
  email: yup
    .string()
    .email("Please provide a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please provide a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      regexPassword,
      "Only letters (lower + upper), and numbers are allowed"
    )
    .required("password is required"),
});
