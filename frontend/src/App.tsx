import AuthProtection from "./components/AuthProtection";
import Nav from "./components/Nav.tsx";
import AppSection from "./components/AppSection.tsx";

function App() {
  return (
    <AuthProtection>
      <div
        className={
          "size-screen text-quaternary bg-primary flex flex-col items-center"
        }
      >
        <Nav />
        <AppSection />
      </div>
    </AuthProtection>
  );
}

export default App;
