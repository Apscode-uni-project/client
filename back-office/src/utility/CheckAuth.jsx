import { useEffect, useState } from "react"
import Instance from "../service/Instance"
import { Navigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const CheckAuth = ({children}) => {
  const[auth, setAuth] = useState(null)

  useEffect(() => {
    const check = async() => {
      try{
        const res = await Instance.get('/user/check-auth')
        console.log(res)
        setAuth(true)
      }
      catch(err){
        setAuth(false)
      }
    }
    check()
  },[])

  if(auth === null){
    return <div>Loading...</div>
  }
  
  return auth ? children : <Navigate to="/login" />
}

export default CheckAuth