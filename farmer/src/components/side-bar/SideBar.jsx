import { NavLink } from "react-router-dom";
import "./side-bar.scss";

const SideBar = () => {
  const links = [
    {
      name: "Dashboard",
      to: "/dashboard",
    },
    {
      name: "Upcoming",
      to: "/upcoming",
    },
    {
      name: "Past Vaccination",
      to: "/past-vaccination",
    },
    {
      name: "Past Checkup",
      to: "/past-checkup",
    },
  ];
  return (
    <div id="side-bar">
        <div className="logo">
        LOGO
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
