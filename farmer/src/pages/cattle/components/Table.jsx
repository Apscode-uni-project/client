/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import './table.scss'


const CreateRow = ({ 
    id,
    name,
    birthDate,
    owner,
 }) => {
  const navigation = useNavigate();
    return (
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{birthDate}</td>
        <td>{owner}</td>
        
        <td className="action-col">
          <span>
            <button onClick={() => navigation(`${id}`)} >More</button>
          </span>
        </td>
      </tr>
    );
  };

const Table = ({cattles}) => {
  return (
    <table id="cow-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Birth Date</th>
          <th>Owner NIC</th>
          
          <th className="actions">More</th>
        </tr>
      </thead>

      <tbody>
        {
          cattles.length > 0 ? cattles.map((cattle) => (
            <CreateRow
              key={cattle.id}
              id={cattle.id}
              name={cattle.name}
                birthDate={`${new Date(cattle.birthday).getFullYear()}-${new Date(cattle.birthday).getMonth() + 1}-${new Date(cattle.birthday).getDate()}`}
                owner={cattle.nic}
            />
          )): <tr><td colSpan={5}>No cattle found</td></tr>
        }
      </tbody>
    </table>
  )
}

export default Table