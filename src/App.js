import { ThemeProvider } from "@mui/system";
import { CssBaseline, useTheme } from "@mui/material";
import "./App.css";
import Authentication from "./pages/Authentication";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/authComponents/LoginForm";
import SignupForm from "./components/authComponents/SignupForm";
import ConfirmForm from "./components/authComponents/ConfirmForm";
import ForgotPasswordCodeForm from "./components/authComponents/ForgotPasswordCodeForm";
import ForgotPasswordForm from "./components/authComponents/ForgotPasswordForm";
import { lightTheme, darkTheme } from "./libs/theme";
import { useEffect, useState } from "react";
import BottomBar from "./components/appComponents/BottomBar";
import Profile from "./pages/Profile";
import Footer from "./components/appComponents/Footer";
import TopBar from "./components/appComponents/TopBar";
import { getAuthenticatedUser } from "./libs/backendSimulation";
import LoadingPage from "./components/appComponents/LoadingPage";

function App() {

  const storedThemeMode = window.localStorage.getItem("themeMode");
  var themeSelected = false;
  storedThemeMode ? themeSelected = true : themeSelected = false;
  const [themeMode, setThemeMode] = useState(themeSelected ? (storedThemeMode === "light" ? lightTheme : darkTheme) : lightTheme);

  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loadingApp, setLoadingApp] = useState(true);

  async function getAuth(){
    const userData = await getAuthenticatedUser();
    if(userData){
      setUser(userData);
      setAuthenticated(true);
    }
    setLoadingApp(false);
  }

  useEffect(() => {
    getAuth();
  },[])

  return (
      <ThemeProvider theme={themeMode}>
        <CssBaseline />
          <div style={{display: "flex", flexDirection: "column"}}>

            <div id="topbar" style={{height: "60px", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              <TopBar setThemeMode={setThemeMode} authUser={user} loading={loadingApp}/>
            </div>

            <div id="page" style={{position: "relative", display: "block", width: "100%", paddingBottom: "80px"}}>
            {!loadingApp ?
              <Routes>
                {!authenticated && 
                <Route path="/" element={<Authentication />}>
                  <Route path="/" element={<LoginForm/>} />
                  <Route path="/signup" element={<SignupForm/>} />
                  <Route path="/confirmAccount" element={<ConfirmForm/>} />
                  <Route path="/forgotPasswordCode" element={<ForgotPasswordCodeForm />} />
                  <Route path="/forgotPassword" element={<ForgotPasswordForm />} />
                </Route>
                }
                <Route path="/user/:nickname" element={<Profile authUser={user}/>} />

              </Routes>
            :
              <LoadingPage />
            }
            </div>

            <div id="footer" style={{display: "flex"}}>
              <Footer />
            </div>

            <BottomBar />

          </div>
      </ThemeProvider>
  );
}

export default App;