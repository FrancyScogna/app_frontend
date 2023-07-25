import TopBar from "./components/TopBar";

function App() {
  return (
    <div style={{top:'0px',right:'0px',width:'100%', height:'60px', display:"flex", flexDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
      <TopBar />
    </div>
  );
}

export default App;
