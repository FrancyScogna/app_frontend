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

function App() {

  return (
    <div>

      <div className="topbar-container" style={{}}>
        <TopBar />
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
    </div>
  );
}

export default App;