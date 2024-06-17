/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import "./cattle-details.scss";
import { useEffect, useState } from "react";
import Instance from "../../service/Instance";
import { IoIosAdd } from "react-icons/io";
import CheckupCard from "./components/checkup-card/CheckupCard";
import { CalculateAgeInDays } from "../../utility/DataCal";

const CattleDetails = () => {
  const { id } = useParams();
  const [basicData, setBasicData] = useState();
  const [vaccines, setVaccine] = useState();
  const [checkup, setCheckup] = useState([]);
  const [open, setOpen] = useState(false);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const fetchVaccine = async () => {
      try {
        const res = await Instance.get(`/cattle/vaccine-time-table/${id}`);
        setVaccine(res.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchBasicData = async () => {
      try {
        const res = await Instance.get(`/cattle/${id}`);
        setBasicData(res.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCheckup = async () => {
      try {
        const res = await Instance.get(`/cattle/checkup/${id}`);
        setCheckup(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBasicData();
    fetchVaccine();
    fetchCheckup();
  }, [id, trigger]);

  if (!basicData || !vaccines || !checkup) {
    return <h1>Loading...</h1>;
  }

  // if (!basicData || !vaccines || !checkup) {
  //   return <h1>Loading...</h1>;
  // }

  return (
    <>
      {open && (
        <CheckupCard setTrigger={setTrigger} setOpen={setOpen} cattle_id={id} />
      )}
      <div id="cattle-details">
        <div className="basic_info">
          <h1>Basic Information</h1>

          <table>
            <tbody>
              <tr>
                <td className="key">Cattle ID:</td>
                <td>{basicData?.id}</td>
              </tr>

              <tr>
                <td className="key">Name:</td>
                <td>{basicData?.name}</td>
              </tr>

              <tr>
                <td className="key">Date of Birth:</td>
                <td>{`${new Date(basicData?.birthday).getFullYear()}-${new Date(basicData?.birthday).getMonth()+1}-${new Date(basicData?.birthday).getDate()}`}</td>
              </tr>

              <tr>
                <td className="key">Age (Month):</td>
                <td>{`${(
                  (new Date() - new Date(basicData?.birthday)) /
                    (1000 * 60 * 60 * 24 * 365.25)
                ).toFixed(1)}`}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="vaccine_info">
          <h1>Vaccine Information</h1>

          <div className="table">
            <table id="vaccine-table">
              <thead>
                <tr>
                  <th>Vaccine Id</th>
                  <th>Name</th>
                  <th>Given Age (Date)</th>

                  <th className="actions">Take</th>
                </tr>
              </thead>

              <tbody>
                {vaccines.length > 0 ? vaccines?.map((vaccine) => (
                  <tr key={vaccine.vaccine_id}>
                    <td>{vaccine.vaccine_id}</td>
                    <td>{vaccine.vaccine_name}</td>
                    <td>{`${CalculateAgeInDays(basicData?.birthday)}`}</td>
                    <td className="actions">
                      {vaccine.taken ? (
                        <span className="taken" style={{ color: "green" }}>
                          Taken
                        </span>
                      ) : (
                        <span className="not-taken">Not Taken</span>
                      )}
                    </td>
                  </tr>
                )): <tr><td colSpan="4" style={{textAlign: 'center'}}>No data</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        <div className="checkup">
          <div className="add-checkup">
            <h1>Health Checkup</h1>
            
          </div>

          <table id="vaccine-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>General Health</th>
                <th>Body Condition Score (BCS)</th>
                <th>Temperature (&#8451;)</th>
                <th>Respiratory Rate</th>
              </tr>
            </thead>

            <tbody>
              {checkup.length > 0 ? checkup?.map((_checkup) => (
                <tr key={_checkup.checkup_id}>
                  <td>{_checkup.date.split("T")[0]}</td>

                  <td>{_checkup.general_health}</td>
                  <td>{_checkup.bcs}</td>
                  <td>{_checkup.temperature}</td>
                  <td>{_checkup.respiratory_rate}</td>
                </tr>
              )): <tr><td colSpan="5" style={{textAlign: 'center'}}>No data</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CattleDetails;
