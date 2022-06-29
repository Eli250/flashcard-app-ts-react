import * as yup from "yup";

export const cardSchema = yup.object().shape({
  question: yup.string().required("This field is required"),
  answer: yup.string().required("This field is required"),
  details: yup.string().required("This field is required"),
  image: yup.string(),
});
