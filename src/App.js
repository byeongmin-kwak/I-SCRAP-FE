import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
