import TopBar from "./components/TopBar";
import "./App.css";

function App() {
  return (
    <div style={{height:'60px', display:"flex", flexDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
      <TopBar />
    </div>
  );
}

export default App;
