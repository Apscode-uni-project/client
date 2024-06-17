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

  const updateTakenStatus = async (status, vaccineId) => {
    console.log(status, vaccineId);
    if (status == true) {
      try {
        await Instance.post(`cattle/take-vaccine/${vaccineId}/${id}`);
        alert("Status updated successfully");
      } catch (err) {
        console.log(err);
        alert("Failed to update the status");
      }
    }

    if (status == false) {
      try {
        await Instance.delete(`cattle/take-vaccine/${vaccineId}/${id}`);
        alert("Status updated successfully");
      } catch (err) {
        console.log(err);
        alert("Failed to update the status");
      }
    }
  };

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
                <td>{basicData?.birthday.split('T')[0]}</td>
              </tr>

              <tr>
                <td className="key">Age (Days):</td>
                {/* <td>{`${Math.floor(
                  (new Date() - new Date(basicData?.birthday)) /
                    (1000 * 60 * 60 * 24 * 365.25)
                )}`}</td> */}
                <td>{`${CalculateAgeInDays(basicData?.birthday)} (${(
                  (new Date() - new Date(basicData?.birthday)) /
                    (1000 * 60 * 60 * 24 * 365.25)
                ).toFixed(1)} Year)`}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="vaccine_info">
          <h1>Vaccine Information</h1>

          <div>
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
                    {/* <td>{`${Math.floor(
                      (new Date() - new Date(basicData?.birthday)) /
                        (1000 * 60 * 60 * 24 * 365.25)
                    )}`}</td> */}
                    <td>{`${CalculateAgeInDays(basicData.birthday)}`}</td>
                    <td className="actions">
                      <input
                        type="checkbox"
                        defaultChecked={vaccine.taken}
                        onChange={(e) =>
                          updateTakenStatus(
                            e.target.checked,
                            vaccine.vaccine_id
                          )
                        }
                      />
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
            <span onClick={() => setOpen(true)}>
              <IoIosAdd className="icon" />
              <p>Add Checkup</p>
            </span>
          </div>

          <table id="vaccine-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>General Health</th>
                <th>Body Condition Score (BCS)</th>
                <th>Temperature</th>
                <th>Respiratory Rate</th>
              </tr>
            </thead>

            <tbody>
              {checkup.length > 0 ? checkup?.map((_checkup) => (
                <tr key={_checkup.checkup_id}>
                  <td>{`${new Date(_checkup.date).getFullYear()}-${
                    new Date(_checkup.date).getMonth() + 1
                  }-${new Date(_checkup.date).getDate()
                  }`}</td>

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
