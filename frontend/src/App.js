import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./components/layout/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import ViewEmployee from "./pages/ViewEmployee";
import EditEmployee from "./pages/EditEmployee";

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/create/employee" element={<Create />} />
          <Route exact path="/edit/employee/:id" element={<EditEmployee />} />
      <Route exact path="/view/employee/:id" element={<ViewEmployee />} />
        </Routes>
    </>
  );
}

export default App;
