/* eslint-disable react/prop-types */
import "./vaccine-card.scss";
import Instance from "../../../service/Instance";

const VaccineCard = ({ setTrigger, setOpen }) => {
  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const vaccine_name = formData.get("vaccine_name");
    const given_age = formData.get("given_age");
    const description = formData.get("description");

    try {
      await Instance.post("/vaccine", {
        vaccine_name,
        given_age,
        description,
      });

      setTrigger((prev) => !prev);
      setOpen(false);
    } catch (err) {
      console.log(err);
      alert("An error occurred");
    }
  };

  return (
    <div id="vaccine-card">
      <div className="card">
        <h1 className="title">Add Vaccine</h1>

        <form onSubmit={submit}>
          <table>
            <tbody>
              <tr>
                <td className="key">Vaccine Name:</td>
                <td>
                  <input type="text" name="vaccine_name" required />
                </td>
              </tr>

              <tr>
                <td className="key">Given Age (Month):</td>
                <td>
                  <input type="number" name="given_age" required />
                </td>
              </tr>

              <tr>
                <td className="key">Description:</td>
                <td>
                  <textarea name="description" required />
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

export default VaccineCard;
