import { useState } from "react";
import { loginValidation } from "./logic";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import Instance from "../../service/Instance";
const Register = () => {
  const navigation = useNavigate();
  const[errors, setErrors] = useState({
    fName: "",
    lName: "",
    email: "",
    nic: "",
    password: "",
    confirmPassword: "",
  });

  const register = async(e) => {
    e.preventDefault();
    const fName = document.getElementById("reg-f-name").value;
    const lName = document.getElementById("reg-l-name").value;
    const email = document.getElementById("register-email").value;
    const nic = document.getElementById("register-nic").value;
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("register-confirm-password").value;

    const validation = loginValidation(fName, lName, email, nic, password, confirmPassword);
    
    if (validation.fName || validation.lName || validation.email || validation.nic || validation.password || validation.confirmPassword) {
      setErrors((pev) => {
        return {
          ...pev,
          fName: validation.fName,
          lName: validation.lName,
          email: validation.email,
          nic: validation.nic,
          password: validation.password,
          confirmPassword: validation.confirmPassword,
        };
      });
      return;
    } else {
      setErrors({
        fName: "",
        lName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }

    try{
      const res = await Instance.post("/user/register", {
        fName,
        lName,
        email,
        nic,
        password,
        confirmPassword
      });

      if(res.data.status === "success"){
        alert("User registered successfully");
        navigation("/login")
      }
    }
    catch(err){
      console.error(err);
      if(err.response.data.message == "Email already exists"){
        return setErrors((pev) => {
          return {
            ...pev,
            email: "Email already exists",
          };
        });
      }

      if(err.response.data.message == "NIC already exists"){
        return setErrors((pev) => {
          return {
            ...pev,
            nic: "NIC already exists",
          };
        });
      }
      alert("Something went wrong");
    }
    
  };
  
  return (
    <div id="register">
      <div className="container">
        <h1>Register</h1>

        <form onSubmit={register} noValidate>
          <div className="input-section f-name-sec">
            <label htmlFor="reg-f-name">First Name</label>
            <input type="name" id="reg-f-name" required />
            {errors.fName && <p className="helper">{errors.fName}</p>}
          </div>
          
          <div className="input-section l-name-sec">
            <label htmlFor="reg-l-name">Last Name</label>
            <input type="name" id="reg-l-name" required />
            {errors.lName && <p className="helper">{errors.lName}</p>}
          </div>
          
          <div className="input-section email-sec">
            <label htmlFor="register-email">Email</label>
            <input type="email" id="register-email" required />
            {errors.email && <p className="helper">{errors.email}</p>}
          </div>
          
          <div className="input-section nic-sec">
            <label htmlFor="register-nic">NIC</label>
            <input type="nic" id="register-nic" required />
            {errors.nic && <p className="helper">{errors.nic}</p>}
          </div>

          <div className="input-section password-sec">
            <label htmlFor="register-password">Password</label>
            <input type="password" id="register-password" required />
            {errors.password && <p className="helper">{errors.password}</p>}
          </div>
          
          <div className="input-section confirm-password-sec">
            <label htmlFor="register-confirm-password">Confirm Password</label>
            <input type="password" id="register-confirm-password" required />
            {errors.confirmPassword && <p className="helper">{errors.confirmPassword}</p>}
          </div>

          <button type="submit">Register</button>
        </form>

        <p className="link">If you already have an account <Link to={'/login'} >Login </Link></p>
        

      </div>
    </div>
  );
};

export default Register;
