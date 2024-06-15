import { useEffect, useState } from "react";
import UserTable from "./components/UserTable";
import "./users.scss";
import Instance from "../../service/Instance";
import UserCard from "./components/UserCard";

const Users = () => {
  const [users, setUsers] = useState();
  const [userID, setUserID] = useState(null);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const getUser = async() => {
      try{
        const res = await Instance.get('/user');
        setUsers(res.data)
      }
      catch(err){
        console.log(err)
      }
    }
    getUser()
  }, [trigger])

  if(!users){
    return <h1>Loading...</h1>
  }

  return (
    <>
    {userID && <UserCard userID={userID} setUserID={setUserID} setTrigger={setTrigger} trigger={trigger} />}
    <div id="users">
      <div className="table">
        <UserTable users={users} setUserID={setUserID} />
      </div>
    </div>
    </>
  );
};

export default Users;
