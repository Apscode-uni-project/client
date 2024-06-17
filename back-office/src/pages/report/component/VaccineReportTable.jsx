/* eslint-disable react/prop-types */
import Instance from "../../../service/Instance";

const CreateRow = ({ cattle_id, vaccine_id, vaccine_name, given_age, description }) => {
  return (
    <tr>
      <td>{cattle_id}</td>
      <td>{vaccine_id}</td>
      <td>{vaccine_name}</td>
      <td>{given_age}</td>
      <td>{description}</td>
    </tr>
  );
};

const VaccineReportTable = ({ vaccines=[] }) => {
  if (!vaccines) return <div>Loading...</div>;
  return (
    <table id="vaccine-table">
      <thead>
        <tr>
          <th>Cattle ID</th>
          <th>Vaccine ID</th>
          <th>Vaccine Name</th>
          <th>Given Age (Dates)</th>
          <th>Description</th>
        </tr>
      </thead>

      <tbody>
        {vaccines.length > 0 ?vaccines.map((vaccine, index) => (
          <CreateRow 
            key={index} 
            cattle_id={vaccine.cattle_id} 
            vaccine_id={vaccine.vaccine_id}
            vaccine_name={vaccine.vaccine_name}
            given_age={vaccine.given_age}
            description={vaccine.description}
          />
        )): <tr><td colSpan="5" style={{textAlign: 'center'}}>No data</td></tr>}
      </tbody>
    </table>
  );
};

export default VaccineReportTable;
