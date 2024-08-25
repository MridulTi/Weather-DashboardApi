import { Outlet } from "react-router-dom";
import { Navbar, TopBar } from "../../Components/Navbar";

const MainLayout = () => {

  return (
    <div className="relative overflow-hidden">
      <Navbar/>
      <TopBar/>
      <div className="z-10">
        <Outlet />
      </div>
      <div className=" w-full">
      {/* <Footer/> */}

      </div>

    </div>
  );
};

export default MainLayout;
