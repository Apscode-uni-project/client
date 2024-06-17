import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./main-layout.scss";
import Nav from "../components/nav/Nav";
import SideBar from "../components/side-bar/SideBar";
import MainOutlet from "../components/main-outlet-layout/MainOutlet";
import { useEffect, useState } from "react";
import Instance from "../service/Instance";
import { FaUserTie } from "react-icons/fa6";
import { AiOutlineAlignLeft } from "react-icons/ai";



const MainLayout = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState();
  const [user, setUser] = useState();
  const [sideBarDisplay, setSideBarDisplay] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await Instance.get("/user/check-auth");
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  useEffect(() => {

    console.log(location.pathname);
    
    if(location.pathname === "/users") {
      setTitle("User Management")
    }

    if(location.pathname === "/dashboard") {
      setTitle("Dashboard")
    }

    if(location.pathname === "/cattle") {
      setTitle("Cattle Management")
    }
    
    if(location.pathname === "/vaccine") {
      setTitle("Vaccine Management")
    }

    if(location.pathname.match(/^\/cattle\/(\d+)$/)) {
      setTitle("Cattle Details")
    }

    if(location.pathname === "/report" || location.pathname === "/report/") {
      setTitle("Daily Report")
    }
    
  }, [location.pathname]);


  const logout = async () => {
    try {
      await Instance.get("/user/logout");
      navigation("/login");
    } catch (err) {
      console.log(err);
    }
  }

  // if(!title) {
  //   return <p>Loading...</p>
  // }

  return (
    <>
    <div id="toggle001">
        <AiOutlineAlignLeft className="icon" onClick={() => setSideBarDisplay(prv => !prv)} />
      </div>
    <div id="main-layout">
      
      <div className="with-sidebar-container">
        
        {/* mobile */}
        {sideBarDisplay && <div className="side-bar" id="mobile-sidebar">
          <SideBar />

          <div className="user-info">
            <div className="info">
              <FaUserTie className="icon" />
              <div>
                <p className="name">{user ? `${user.fName} ${user.lName}` : 'Loading..'}</p>
                <p className="role"> {user ? user.role : 'Loading..'}</p>
              </div>
            </div>

            <button className="logout" onClick={logout}>Logout</button>
          </div>
        </div>}
        
        {/* desktop */}
        <div className="side-bar" id="desktop-sidebar">
          <SideBar />

          <div className="user-info">
            <div className="info">
              <FaUserTie className="icon" />
              <div>
                <p className="name">{user ? `${user.fName} ${user.lName}` : 'Loading..'}</p>
                <p className="role"> {user ? user.role : 'Loading..'}</p>
              </div>
            </div>

            <button className="logout" onClick={logout}>Logout</button>
          </div>
        </div>
        <div className="content">
          <div className="nav">
            <Nav />
          </div>
          <div className="outlet">
            <MainOutlet title={title}>
              <Outlet />
            </MainOutlet>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default MainLayout;
