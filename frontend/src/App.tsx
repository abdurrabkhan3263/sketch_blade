
import Canvas from "./pages/Canvas";
import ToolSec from "./pages/ToolSec";
import AuthProtection from "./components/AuthProtection";

function App() {
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
