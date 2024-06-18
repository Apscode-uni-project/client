import { useEffect, useState } from "react";
import CheckupTable from "./component/CheckupTable";
import { BsFillFolderSymlinkFill } from "react-icons/bs";
import { VscLoading } from "react-icons/vsc";


import VaccineReportTable from "./component/VaccineReportTable";
import "./daily-report.scss";
import Instance from "../../service/Instance";

const DailyReport = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [vaccines, setVaccines] = useState([]);
  const [checkups, setCheckups] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchVaccines = async () => {
      try{
        const res = await Instance.get(`/vaccine/report/${selectedDate}`);
        setVaccines(res.data);
        console.log(res.data);
      }
      catch(err){
        console.log(err);
      }
    };

    const fetchCheckups = async () => {
      try{
        const res = await Instance.get(`/user/report/${selectedDate}`);
        setCheckups(res.data);
      }
      catch(err){
        console.log(err);
      }
    };
      
    fetchVaccines();
    fetchCheckups();
  }, [selectedDate])

  const requestReportToEmail = async () => {
    setLoading(true)
    try{
      const res = await Instance.get(`/user/report-to-email/${selectedDate}`);
      setVaccines(res.data);
      console.log(res.data);
      setLoading(false)
      alert(res.data.message)
    }
    catch(err){
      console.log(err);
      setLoading(false)
      alert("Report can't send to email!")
    }
  }


  return (
    <div id="daily-report">
      <div className="filter-section">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <div className="request-report">

          <button className="icon-cont" onClick={requestReportToEmail} disabled={loading} >
          {
            loading ? <VscLoading className="icon loading" title="Request Report to Email" /> : <BsFillFolderSymlinkFill className="icon" title="Request Report to Email" />
          } 
          </button>
        </div>
      </div>
      <div
        className="vaccine-table"
        style={{ maxHeight: "350px", overflowY: "auto", width: "100%" }}
      >
        <h1>Vaccine Report ({selectedDate})</h1>
        <VaccineReportTable vaccines={vaccines}  />
      </div>

      <div
        className="checkup-table"
        style={{ maxHeight: "350px", overflowY: "auto", width: "100%" }}
      >
        <h1>Checkup Report ({selectedDate})</h1>
        <CheckupTable checkups={checkups} />
      </div>
    </div>
  );
};

export default DailyReport;
