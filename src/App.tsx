import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeContext";
import { WebGLBackground } from "./components/WebGLBackground/WebGLBackground";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";
import { Sandbox } from "./sandbox/Sandbox";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ThemeProvider>
        <WebGLBackground />
        <ThemeToggle />
        <Routes>
          <Route path="/sandbox" element={<Sandbox />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
