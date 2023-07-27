import TopBar from "./components/TopBar";
import "./App.css";
import Authentication from "./pages/Authentication";

function App() {
  return (
    <div>
    <div style={{height:'60px', display:"flex", flexDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
      <TopBar />
    </div>
      <Authentication />
    </div>
  );
}

export default App;