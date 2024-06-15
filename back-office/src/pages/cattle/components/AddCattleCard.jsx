/* eslint-disable react/prop-types */
import "./add-cattle-card.scss";
import Instance from "../../../service/Instance";
import { useEffect, useState } from "react";

const AddCattleCard = ({ setTrigger, setOpen }) => {
  const [owners, setOwners] = useState();
  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const birthday = formData.get("birthday");
    const owner = formData.get("add-cattle-owner");


    try {
      await Instance.post("/cattle", {
        name,
        birthday,
        owner,
      });

      setTrigger((prev) => !prev);
      setOpen(false);
    } catch (err) {
      console.log(err);
      alert("An error occurred");
    }
  };

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const res = await Instance.get("/user");
        console.log(res.data);
        setOwners(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOwners();
  }, []);

  if (!owners) return <div>Loading...</div>;

  return (
    <div id="user-card">
      <div className="card">
        <h1 className="title">Add Cattle</h1>

        <form onSubmit={submit}>
          <table>
            <tbody>
              <tr>
                <td className="key">Name:</td>
                <td>
                  <input type="text" name="name" required />
                </td>
              </tr>

              <tr>
                <td className="key">Birth Date</td>
                <td>
                  <input type="date" name="birthday" required />
                </td>
              </tr>
              
              <tr>
                <td className="key">Owner</td>
                <td>
                  <select name="add-cattle-owner" required>
                    <option value="" disabled selected>Select Owner</option>
                    {owners &&
                      owners?.map((owner) => (
                        <option key={owner.id} value={owner.user_id}>
                          {owner.fName} - {owner.nic}
                        </option>
                      ))}
                  </select>
                </td>
              </tr>


            </tbody>
          </table>
          <button className="update-btn" type="submit">
            Update
          </button>
          <button
            className="close-btn"
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCattleCard;
