/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./nav-mobile.scss";
import Instance from "../../service/Instance";
import Logo from "../../assets/logo.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineAlignLeft } from "react-icons/ai";

const NavMobile = ({ setMobileNav, mobileNav }) => {
  const navigation = useNavigate();
  const [, setUser] = useState();

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
    <div id="nav-mobile">
      <AiOutlineAlignLeft
        className="menu-icon"
        onClick={() => setMobileNav((prv) => !prv)}
      />
      <div className="top">
        <div className="logo">
          <img src={Logo} alt="logo" />
          <p>
            DairyCow <span>Nexus</span>
          </p>
        </div>

        {/* <div>x</div> */}
      </div>

      {mobileNav && (
        <div className="bottom">
          <div className="back-drop"></div>
          {/* Nav Link */}
          <div className="nav-link">
            {navLinks?.map((link, index) => (
              <NavLink key={index} to={link.path}>
                {link.name}
              </NavLink>
            ))}

            <div className="logout-sec">
              <p className="logout" onClick={logout}>
                Logout
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavMobile;
