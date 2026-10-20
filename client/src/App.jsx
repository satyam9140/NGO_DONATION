import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Directory from "./pages/Directory.jsx";
import Register from "./pages/Register.jsx";
import Donate from "./pages/Donate.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="directory" element={<Directory />} />
        <Route path="register" element={<Register />} />
        <Route path="donate" element={<Donate />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="impact" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
