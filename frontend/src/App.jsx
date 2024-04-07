import { useState } from "react";
import "./App.css";
import NavbarForAdmin from "./Admin/components/NavbarForAdmin";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavbarForUser from "./User/components/NavbarForUser";
import { Toaster } from "react-hot-toast";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavbarForUser />
      <Outlet />
      <Footer />
      
    </>
  );
}

export default App;
