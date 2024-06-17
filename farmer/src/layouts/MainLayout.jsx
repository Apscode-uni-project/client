import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./main-layout.scss";
import Nav from "../components/nav/Nav";
import MainOutlet from "../components/main-outlet-layout/MainOutlet";
import NavMobile from "../components/nav/NavMobile";

const MainLayout = () => {
  const [mobileNav, setMobileNav] = useState(false);
  return (
    <div id="main-layout">
      <div className="with-sidebar-container">
        <div className="content">
          <div className="nav">
            <div className="desktop-nav-bar">
              <Nav />
            </div>

            <div className="mobile-nav-bar">
              <NavMobile mobileNav={mobileNav} setMobileNav={setMobileNav} />
            </div>
          </div>
          <div className="outlet">
            <MainOutlet>
              <Outlet />
            </MainOutlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
