import { BrowserRouter } from "react-router-dom"
import { Rutas } from "./routes/Rutas";

export const App = () => {
  return (
    <BrowserRouter>
        <Rutas/>
    </BrowserRouter>
  );
};