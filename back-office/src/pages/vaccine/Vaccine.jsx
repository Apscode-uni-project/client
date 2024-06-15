import { IoIosAdd } from 'react-icons/io'
import './vaccine.scss'
import { useState } from 'react'

const Vaccine = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <div id="cattle">
      <div className="add-cattle">
        <div onClick={() => setOpen(true)}>
          <IoIosAdd className="icon" />
          <p>Add Vaccine</p>
        </div>
      </div>

      {/* <Table  /> */}
    </div>
  )
}

export default Vaccine