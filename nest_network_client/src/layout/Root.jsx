import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const Root = () => {
  return (
    <main className="font-lato">
        <Navbar/>
   <div className="min-h-[calc(100vh-265px)]">
   <Outlet />
   </div>
      <Footer/>
    </main>
  );
};

export default Root;
