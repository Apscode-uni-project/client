import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import "./side-bar.scss";

const SideBar = () => {
  const links = [
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
      name: "Daily Report",
      to: "/report",
    },
  ];
  return (
    <>
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
    </>
  );
};

export default SideBar;
