import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/App.css";
import Dashboard from "./dashboard";
import Flashcard from "./Flashcard";
import Signin from "./Signin";
import Signup from "./Signup";

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
const backendLink = createHttpLink({
  uri: "https://flashcard-app-ts-be.herokuapp.com/",
});

interface Access {
  login: {
    token: string;
    user: {
      name: string;
      email: string;
    };
  };
}
const loggedInUser = localStorage.getItem("authorization");
const authContext = setContext((_, { headers }): Object => {
  const auth: Access | null = loggedInUser
    ? JSON.parse(loggedInUser as string)
    : null;
  return {
    headers: {
      ...headers,
      authorization: auth ? auth.login.token : "",
    },
  };
});
const apolloClient1 = new ApolloClient({
  link: authContext.concat(backendLink),
  cache: new InMemoryCache(),
});

// const apolloClient = new ApolloClient({
//   uri: "https://flashcard-app-ts-be.herokuapp.com/",
//   cache: new InMemoryCache(),
// });

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient1}>
        <Routes>
          <Route path="" element={<Signin />}></Route>
          <Route path="signin" element={<Signin />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route path="dashboard/*" element={<Dashboard />}>
            <Route path=""></Route>
            <Route path="flashcard" element={<Flashcard />}></Route>
          </Route>
        </Routes>
        <ToastContainer />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
