/* eslint-disable react/prop-types */
import React from 'react'


const CreateRow = ({ cattle_id, checkup_id, general_health, bcs, temperature, respiratory_rate }) => {
    return (
      <tr>
        <td>{checkup_id}</td>
        <td>{cattle_id}</td>
        <td>{general_health}</td>
        <td>{bcs}</td>
        <td>{temperature}</td>
        <td>{respiratory_rate}</td>
      </tr>
    );
  };

const CheckupTable = ({checkups=[]}) => {
  return (
    <table id="vaccine-table">
      <thead>
        <tr>
          <th>Checkup ID</th>
          <th>Cattle ID</th>
          <th>General Health</th>
          <th>Body Condition Score (BCS)</th>
          <th>Temperature</th>
          <th>Respiratory Rate</th>
        </tr>
      </thead>

      <tbody>
        {checkups.length > 0 ? checkups?.map((checkup) => (
          <CreateRow 
            key={checkup.checkup_id} 
            checkup_id={checkup.checkup_id}
            cattle_id={checkup.cattle_id} 
            general_health={checkup.general_health}
            bcs={checkup.bcs}
            temperature={checkup.temperature}
            respiratory_rate={checkup.respiratory_rate}
          />
        )): <tr><td colSpan="6" style={{textAlign: 'center'}}>No data</td></tr>}
      </tbody>
    </table>
  )
}

export default CheckupTable