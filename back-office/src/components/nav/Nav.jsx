import { useEffect, useState } from "react";
import "./nav.scss";
import { LuUser } from "react-icons/lu";
import Instance from "../../service/Instance";

const Nav = () => {
  const [user, setUser] = useState();
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

  return (
    <div id="nav">
      <div className="left"></div>

      <div className="right">
        {user ? (
          <>
            <LuUser className="icon" />
            <p>{user.fName}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Nav;
