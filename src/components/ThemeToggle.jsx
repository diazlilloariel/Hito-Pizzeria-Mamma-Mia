import { useTheme } from "../context/ThemeProvider";

const ThemeToggle = () => {
  const { toggleTheme } = useTheme();


  return (
    <div>
        <button onClick={toggleTheme}>Cambiar Modo</button>
    </div>
  );
}   

export default ThemeToggle;