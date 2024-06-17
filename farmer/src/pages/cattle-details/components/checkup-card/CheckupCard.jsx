/* eslint-disable react/prop-types */
import Instance from "../../../../service/Instance";
import "./checkup-card.scss";

const CheckupCard = ({ setTrigger, setOpen, cattle_id }) => {
  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const date = formData.get("date");
    const general_health = formData.get("general_health");
    const bcs = formData.get("bcs");
    const temperature = formData.get("temperature");
    const respiratory_rate = formData.get("respiratory_rate");

    try {
      await Instance.post(`cattle/checkup/${cattle_id}`, {
        date,
        general_health,
        bcs,
        temperature,
        respiratory_rate,
      });

      setTrigger((prev) => !prev);
      setOpen(false);
    } catch (err) {
      console.log(err);
      alert("An error occurred");
    }
  };
  return (
    <div id="user-card">
      <div className="card">
        <h1 className="title">Add Cattle</h1>

        <form onSubmit={submit}>
          <table>
            <tbody>
              <tr>
                <td className="key">Date:</td>
                <td>
                  <input type="date" name="date" required />
                </td>
              </tr>

              <tr>
                <td className="key">General Health:</td>
                <td>
                  <input type="text" name="general_health" required />
                </td>
              </tr>

              <tr>
                <td className="key">Body Condition Score (BCS):</td>
                <td>
                  <input type="number" name="bcs" required />
                </td>
              </tr>

              <tr>
                <td className="key">Temperature:</td>
                <td>
                  <input type="number" name="temperature" required />
                </td>
              </tr>

              <tr>
                <td className="key">Respiratory Rate:</td>
                <td>
                  <input type="number" name="respiratory_rate" required />
                </td>
              </tr>
            </tbody>
          </table>
          <button className="update-btn" type="submit">
            Add Checkup
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

export default CheckupCard;
