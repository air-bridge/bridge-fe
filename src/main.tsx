import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
);
