//CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

//COMPONENTS
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import StoreDetails from "./components/ClientDashboard/StoreDetails";
import Search from "./components/ClientDashboard/Search";
import Dashboard from "./components/AdministratorDashboard/Dashboard";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";
import AccountPage from "./components/Home/Parts/AccountPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/details/:id" element={<StoreDetails />} />
          <Route path="/accountpage/:id" element={<AccountPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
