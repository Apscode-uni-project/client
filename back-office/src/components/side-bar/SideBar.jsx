import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import "./side-bar.scss";

const SideBar = () => {
  const links = [
    {
      name: "Dashboard",
      to: "/dashboard",
    },
    {
      name: "User Management",
      to: "/users",
    },
    {
      name: "Cattle Management",
      to: "/cattle",
    },
    {
      name: "Vaccine Management",
      to: "/vaccine",
    },
    {
      name: "Past Checkup",
      to: "/past-checkup",
    },
  ];
  return (
    <div id="side-bar">
        <div className="logo">
          <img src={Logo} alt="logo" />
          <p>DairyCow <span>Nexus</span></p>
        </div>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <NavLink to={link.to} className="nav-link">
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
