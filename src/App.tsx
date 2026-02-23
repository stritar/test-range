import { ThemeProvider } from "./theme/ThemeContext";
import { WebGLBackground } from "./components/WebGLBackground/WebGLBackground";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";
import { Sandbox } from "./sandbox/Sandbox";

function App() {
  return (
    <ThemeProvider>
      <WebGLBackground />
      <ThemeToggle />
      <Sandbox />
    </ThemeProvider>
  );
}

export default App;
