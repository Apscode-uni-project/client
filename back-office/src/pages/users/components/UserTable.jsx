/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "./user-table.scss";

const CreateRow = ({
  id,
  fName,
  lName,
  email,
  nic,
  role,
  active,
  setUserID,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{fName}</td>
      <td>{lName}</td>
      <td>
        <a href={`mailto:${email}`}>{email}</a>
      </td>
      <td>{nic}</td>
      <td>{role}</td>
      <td className={active == 0 ? "not-active" : "active"}>
        {active == 0 ? "Not Active" : "Activated"}
      </td>
      <td className="action-col">
        <span>
          <button
            onClick={() => {
              setUserID(id);
            }}
          >
            More
          </button>
        </span>
      </td>
    </tr>
  );
};

const UserTable = ({ users, setUserID }) => {
  return (
    <table id="user-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>NIC</th>
          <th>Role</th>
          <th>Active</th>
          <th className="actions">More</th>
        </tr>
      </thead>

      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <CreateRow
              key={user.user_id}
              id={user.user_id}
              fName={user.fName}
              lName={user.lName}
              email={user.email}
              nic={user.nic}
              role={user.role}
              active={user.active}
              setUserID={setUserID}
            />
          ))
        ) : (
          <tr>
            <td colSpan="8" style={{ textAlign: "center" }}>
              No data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
