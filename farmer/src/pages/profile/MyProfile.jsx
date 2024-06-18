import { useState } from "react";
import "./my-profile.scss";
import { useEffect } from "react";
import Instance from "../../service/Instance";
import { validation } from "./validation";

const MyProfile = () => {
  const [data, setData] = useState({});
  const [toggle, setToggle] = useState(false);

  // const err = {
  //   fName: "",
  //   lName: "",
  //   nic: "",
  // };
  const [err, setErr] = useState({
    fName: "",
    lName: "",
    nic: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Instance.get("/user/self");
        setData(response.data);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };

    fetchData();
  }, [toggle]);

  const update = async (e) => {
    e.preventDefault();

    const validate = validation(data, err);
    setErr((prev) => {
      return {
        ...prev,
        ...validate,
      };
    });

    console.log(validate);

    try {
      await Instance.put("/user", {
        fName: data.fName,
        lName: data.lName,
        nic: data.nic,
      });

      alert("User updated successfully");
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  if (!data) {
    return <h1>Loading...</h1>;
  }
  return (
    <div id="update-profile">
      <h1 className="title">Update User</h1>

      <form onSubmit={update}>
        <div className="input-field">
          <label>User ID</label>
          <input
            type="text"
            value={data.user_id}
            disabled
            className="disable"
          />
          <p className="error"></p>
        </div>

        <div className="input-field">
          <label>First Name</label>
          <input
            type="text"
            value={data.fName}
            name="fName"
            onChange={(e) => setData({ ...data, fName: e.target.value })}
          />
          <p className="error">{err.fName}</p>
        </div>

        <div className="input-field">
          <label>Last Name</label>
          <input
            type="text"
            value={data.lName}
            name="lName"
            onChange={(e) => setData({ ...data, lName: e.target.value })}
          />
          <p className="error">{err.lName}</p>
        </div>

        <div className="input-field">
          <label>NIC</label>
          <input
            type="text"
            value={data.nic}
            name="lName"
            onChange={(e) => setData({ ...data, nic: e.target.value })}
          />
          <p className="error">{err.nic}</p>
        </div>

        <div className="input-field">
          <label>Email</label>
          <input
            type="text"
            value={data.email}
            name="email"
            disabled
            className="disable"
          />
          <p className="error"></p>
        </div>

        <div className="btn-group">
          <div className="input-field btn">
            <button type="submit">Update</button>
          </div>

          <div className="input-field btn">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setToggle((prv) => !prv)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
