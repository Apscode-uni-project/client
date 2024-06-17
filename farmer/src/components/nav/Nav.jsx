import { useEffect, useState } from "react";
import "./nav.scss";
import { LuUser } from "react-icons/lu";
import Instance from "../../service/Instance";
import Logo from "../../assets/logo.jpg";
import { NavLink, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigation = useNavigate();
  const [user, setUser] = useState();
  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Cattle",
      path: "/cattle",
    },
    {
      name: "Profile",  
      path: "/profile",
    },
  ];
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

  const logout = async () => {
    try {
      await Instance.get("/user/logout");
      navigation("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="nav">
      <div className="left">
        <div className="logo">
          <img src={Logo} alt="logo" />
          <p>
            DairyCow <span>Nexus</span>
          </p>
        </div>

        {/* Nav Link */}
        <div className="nav-link">
          {navLinks?.map((link, index) => (
            <NavLink key={index} to={link.path}>
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="right">
        {user ? (
          <>
            <LuUser className="icon" />
            <p>{user.fName}</p>

            <div className="dropdown">
              <div className="dropdown-content">
                <p className="logout" onClick={logout}>
                  Logout
                </p>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Nav;
