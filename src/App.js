import TopBar from "./components/TopBar";
import "./App.css";
import Authentication from "./pages/Authentication";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/authComponents/LoginForm";
import SignupForm from "./components/authComponents/SignupForm";

function App() {
  return (
    <div>
    <div style={{height:'60px', display:"flex", flexDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
      <TopBar />
    </div>
      <Routes>
        <Route path="/" element={<Authentication />}>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;