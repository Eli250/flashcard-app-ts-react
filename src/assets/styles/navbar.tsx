import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledNavLink = styled(Link)`
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  &:hover,
  &:focus {
    color: #2f7cf7;
  }
  &:active {
    color: blue;
  }
`;
