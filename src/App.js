import "./App.css";
import Navbar from "./pages/Navbar";
import Main from "./pages/Main";
import { GlobalProvider } from "./pages/GlobalState";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <div className="rubrica">
          <Navbar />
          <Main />
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
