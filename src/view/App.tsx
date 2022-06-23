import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import "../assets/styles/App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import Flashcard from "./Flashcard";
import Dashboard from "./dashboard";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ToastContainer } from "react-toastify";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#54ff68",
      dark: "#00ca36",
      light: "#91ff9a",
    },
    primary: {
      main: "#5b35dd",
      light: "#9463ff",
      dark: "#0700aa",
    },
  },
  typography: {
    fontSize: 12,
    fontFamily: "Roboto sans-serif",
  },
});

const apolloClient = new ApolloClient({
  uri: "http://localhost:5000/",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <Routes>
          <Route path="" element={<Signin />}></Route>
          <Route path="signin" element={<Signin />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="flashcard" element={<Flashcard />}></Route>
        </Routes>
        <ToastContainer />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
