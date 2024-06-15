/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./user-card.scss";
import Instance from "../../../service/Instance";

const UserCard = ({ userID, setUserID, setTrigger, trigger }) => {
  const [user, setUsers] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await Instance.get(`/user/${userID}`);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [userID, trigger]);

  const updateUser = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const fName = data.get("fName");
    const lName = data.get("lName");
    const role = data.get("role");
    

    try {
      await Instance.put(`/user/${userID}`, { fName, lName, role });
      setTrigger(prv => !prv);
      setUserID(null);
    } catch (err) {
      console.log(err);
    }
  };

  const makeUserActive = async () => {
    try {
      await Instance.put(`/user/activate/${userID}`);
      setTrigger(prv => !prv);
    } catch (err) {
      console.log(err);
    }
  }


  if (!user) {
    return (
      <div id="user-card">
        <div
          className="card"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>Loading...</p>
        </div>
      </div>
    );

  }

  
  return (
    <div id="user-card">
      <div className="card">
        <h1 className="title">{user.fName + " " + user.lName}</h1>

        <p className={user.active == 1? 'active': 'not-active' }>{user.active == 1 ? 'ACTIVATE': 'NOT ACTIVATE'}</p>
        {user.active == 0 && <button className="make-user-active-btn" onClick={makeUserActive}>Make User Active</button>}

        <form onSubmit={updateUser}>
          <table>
            <tbody>
              <tr>
                <td className="key">ID:</td>
                <td>
                  <input type="text" name="id" disabled defaultValue={user.user_id} />
                </td>
              </tr>
              <tr>
                <td className="key">First Name:</td>
                <td>
                  <input type="text" name="fName" defaultValue={user.fName} />
                </td>
              </tr>

              <tr>
                <td className="key">Last Name:</td>
                <td>
                  <input type="text" name="lName" defaultValue={user.lName} />
                </td>
              </tr>

              <tr>
                <td className="key">Email:</td>
                <td>
                  <input
                    type="email"
                    name="email"
                    disabled
                    value={user.email}
                  />
                </td>
              </tr>
              <tr>
                <td className="key">Role:</td>
                <td>
                  <select name="role" id="role" defaultValue={user.role}>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
            <button className="update-btn" type="submit">Update</button>
            <button className="close-btn" type="button" onClick={() => setUserID(null)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UserCard;
