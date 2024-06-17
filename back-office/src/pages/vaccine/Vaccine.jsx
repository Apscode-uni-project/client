import { IoIosAdd } from 'react-icons/io'
import './vaccine.scss'
import { useEffect, useState } from 'react'
import VaccineTable from './components/VaccineTable';
import Instance from '../../service/Instance';
import VaccineCard from './components/VaccineCard';

const Vaccine = () => {
  const [vaccines, setVaccine] = useState();
  const [open, setOpen] = useState(false);
  const [trigger, setTrigger] = useState(false);


  useEffect(() => {
    const fetchVaccine = async () => {
      try {
        const res = await Instance.get("/vaccine");
        setVaccine(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchVaccine();
  }, [trigger]);

  if(!vaccines) return (<div>Loading...</div>);
  
  return (
    <>
    {open && <VaccineCard setOpen={setOpen} setTrigger={setTrigger} />}
    <div id="vaccine">
      <div className="add-cattle">
        <div onClick={() => setOpen(true)}>
          <IoIosAdd className="icon" />
          <p>Add Vaccine</p>
        </div>
      </div>

      <div className="v-table">
      <VaccineTable vaccines={vaccines} setTrigger={setTrigger}  />
      </div>
    </div>
    </>
  )
}

export default Vaccine