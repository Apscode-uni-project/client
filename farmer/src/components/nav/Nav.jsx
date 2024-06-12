import './nav.scss'
import { LuUser } from "react-icons/lu";


const Nav = () => {
  return (
    <div id='nav'>
      <div className="left">
        
      </div>

      <div className="right">
          <LuUser className='icon' />
          <p>Apscode</p>
      </div>
    </div>
  )
}

export default Nav