import "./App.css";
import { AxiosInterceptor } from "./hooks/axiosInterceptor";
import { Home } from "./pages";
import "./styles/index.scss";

function App() {
  return (
    <AxiosInterceptor>
      <Home />
    </AxiosInterceptor>
  );
}

export default App;
