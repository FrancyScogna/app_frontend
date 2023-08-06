import { ThemeProvider } from "@mui/system";
import { CssBaseline } from "@mui/material";
import TopBar from "./components/TopBar";
import "./App.css";
import Authentication from "./pages/Authentication";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/authComponents/LoginForm";
import SignupForm from "./components/authComponents/SignupForm";
import ConfirmForm from "./components/authComponents/ConfirmForm";
import ForgotPasswordCodeForm from "./components/authComponents/ForgotPasswordCodeForm";
import ForgotPasswordForm from "./components/authComponents/ForgotPasswordForm";
import BottomBar from "./components/BottomBar";
import { lightTheme, darkTheme } from "./libs/theme";
import { useEffect, useState } from "react";
import i18n from "./libs/i18n";
import i18next from "i18next";

function App() {

  const storedThemeMode = window.localStorage.getItem("themeMode");
  var themeSelected = false;
  storedThemeMode ? themeSelected = true : themeSelected = false;
  const [themeMode, setThemeMode] = useState(themeSelected ? (storedThemeMode === "light" ? lightTheme : darkTheme) : lightTheme);

  useEffect(() => {
    console.log(i18next.language)
  })

  return (
    <ThemeProvider theme={themeMode}>
    <CssBaseline />

      <div className="topbar-container">
        <TopBar setThemeMode={setThemeMode}/>
      </div>

      <Routes>
        <Route path="/" element={<Authentication />}>
          <Route path="/" element={<LoginForm/>} />
          <Route path="/signup" element={<SignupForm/>} />
          <Route path="/confirmAccount" element={<ConfirmForm/>} />
          <Route path="/forgotPasswordCode" element={<ForgotPasswordCodeForm />} />
          <Route path="/forgotPassword" element={<ForgotPasswordForm />} />
        </Route>
      </Routes>

      <div className="bottombar-container">
        <BottomBar />
      </div>

      </ThemeProvider>
  );
}

export default App;