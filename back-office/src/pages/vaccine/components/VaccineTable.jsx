/* eslint-disable react/prop-types */
import Instance from "../../../service/Instance";
import "./vaccine-table.scss";

const CreateRow = ({ id, name, given_age, description, setTrigger }) => {
  const deleteVaccine = async (id) => {
    try {
      await Instance.delete(`/vaccine/${id}`);
      setTrigger((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{`${given_age}`}</td>
      <td>{description}</td>

      <td className="action-col">
        <span>
          <button onClick={() => deleteVaccine(id)}>Delete</button>
        </span>
      </td>
    </tr>
  );
};

const VaccineTable = ({ vaccines, setTrigger }) => {
  if (!vaccines) return <div>Loading...</div>;
  return (
    <table id="vaccine-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Given Age (Date)</th>
          <th>Description</th>

          <th className="actions">Delete</th>
        </tr>
      </thead>

      <tbody>
        {vaccines.length > 0 ? (
          vaccines.map((vaccine) => (
            <CreateRow
              key={vaccine.vaccine_id}
              id={vaccine.vaccine_id}
              name={vaccine.vaccine_name}
              given_age={vaccine.given_age}
              description={vaccine.description}
              setTrigger={setTrigger}
            />
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: "center" }}>
              No data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default VaccineTable;
