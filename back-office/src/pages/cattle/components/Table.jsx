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
          cattles.map((cattle) => (
            <CreateRow
              key={cattle.id}
              id={cattle.id}
              name={cattle.name}
                birthDate={cattle.birthday.split('T')[0]}
                owner={cattle.nic}
            />
          ))
        }
      </tbody>
    </table>
  )
}

export default Table