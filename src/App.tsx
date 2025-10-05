import "./App.css";
import Sidebar from "./components/Sidebar";
import { CameraProvider } from "./contexts/CameraContext";

function App(): JSX.Element {
  return (
    <CameraProvider>
      <div className="app-container">
        <Sidebar />
      </div>
    </CameraProvider>
  );
}

export default App;
