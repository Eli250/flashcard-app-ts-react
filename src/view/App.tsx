import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import "../assets/styles/App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import Flashcard from "./Flashcard";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="" element={<Signin />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="flashcard" element={<Flashcard />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
// import React from "react";
// import "../assets/styles/App.css";
// import SignIn from "./Signin";

// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <SignIn />
//     </div>
//   );
// };

// export default App;
