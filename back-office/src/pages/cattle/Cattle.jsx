import { useEffect, useState } from "react";
import "./cattle.scss";
import { IoIosAdd } from "react-icons/io";
import Instance from "../../service/Instance";
import Table from "./components/Table";
import AddCattleCard from "./components/AddCattleCard";

const Cattle = () => {
  const [cattle, setCattle] = useState();
  const [trigger, setTrigger] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCattle = async () => {
      try {
        const res = await Instance.get("/cattle");
        setCattle(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCattle();
  }, [trigger]);

  if(!cattle) return (<div>Loading...</div>);

  return (
    <>
    {open && <AddCattleCard setTrigger={setTrigger} setOpen={setOpen} />}
    <div id="cattle">
      <div className="add-cattle">
        <div onClick={() => setOpen(true)}>
          <IoIosAdd className="icon" />
          <p>Add Cattle</p>
        </div>
      </div>

      <Table cattles={cattle} />
    </div>
    </>
  );
};

export default Cattle;
