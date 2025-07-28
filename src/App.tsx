import { BrowserRouter } from "react-router";

import ContextContainer from "./context";

import "./App.css";
import AppRoutes from "./routes/Routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <ContextContainer>
          <AppRoutes />
        </ContextContainer>
      </BrowserRouter>
    </>
  );
}

export default App;
