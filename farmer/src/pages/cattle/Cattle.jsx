import { useEffect, useState } from "react";
import "./cattle.scss";
import Instance from "../../service/Instance";
import Table from "./components/Table";

const Cattle = () => {
  const [cattle, setCattle] = useState();

  useEffect(() => {
    const fetchCattle = async () => {
      try {
        const res = await Instance.get("cattle/farmer/all");
        setCattle(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCattle();
  }, []);

  if (!cattle) return <div>Loading...</div>;

  return (
    <>
      <div id="cattle">
      <h1 className='title'>My Cattle</h1>
      <br />
        <Table cattles={cattle} />
      </div>
    </>
  );
};

export default Cattle;
