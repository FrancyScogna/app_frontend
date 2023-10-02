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
import Footer from "./components/Footer";
import { lightTheme, darkTheme } from "./libs/theme";
import { useState } from "react";
import BottomBar from "./components/BottomBar";
import Profile from "./pages/Profile";

function App() {

  const storedThemeMode = window.localStorage.getItem("themeMode");
  var themeSelected = false;
  storedThemeMode ? themeSelected = true : themeSelected = false;
  const [themeMode, setThemeMode] = useState(themeSelected ? (storedThemeMode === "light" ? lightTheme : darkTheme) : lightTheme);

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

          <Route path="/profile" element={<Profile />} />

        </Routes>

        <div className="foother-container">
          <Footer />
        </div>


        <BottomBar />

      </ThemeProvider>
  );
}

export default App;