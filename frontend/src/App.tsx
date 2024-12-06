import { useEffect } from "react";
import Canvas from "./pages/Canvas";
import ToolSec from "./pages/ToolSec";
import AuthProtection from "./components/AuthProtection";

function App() {
  useEffect(() => {
    (async () => {
      const res = await fetch("/api", {
        method: "GET",
      });
      const data = await res.json();
      console.log(data);
    })();
  }, []);

  return (
    <AuthProtection>
      <div className="h-screen w-screen bg-yellow-500">
        <ToolSec />
        <Canvas />
      </div>
    </AuthProtection>
  );
}

export default App;
