import { Outlet } from "react-router-dom";
import "./main-layout.scss";
import Nav from "../components/nav/Nav";
import SideBar from "../components/side-bar/SideBar";

const MainLayout = () => {
  return (
    <div id="main-layout">
      <div className="with-sidebar-container">
        <div className="side-bar">
          <SideBar />

          <div className="user-info">
            <p className="name">Apscode</p>
            <p className="role"> Farmer</p>

            <button className="logout">Logout</button>
          </div>
        </div>
        <div className="content">
          <div className="nav">
            <Nav />
          </div>
          <div className="outlet">
          <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
