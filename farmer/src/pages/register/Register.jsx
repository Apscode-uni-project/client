import { useState } from "react";
import { loginValidation } from "./logic";
import "./register.scss";
import { Link } from "react-router-dom";
const Register = () => {
  const[errors, setErrors] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const register = (e) => {
    e.preventDefault();
    const fName = document.getElementById("reg-f-name").value;
    const lName = document.getElementById("reg-l-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("register-confirm-password").value;

    const validation = loginValidation(fName, lName, email, password, confirmPassword);
    
    if (validation.fName || validation.lName || validation.email || validation.password || validation.confirmPassword) {
      setErrors((pev) => {
        return {
          ...pev,
          fName: validation.fName,
          lName: validation.lName,
          email: validation.email,
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

    console.log("Register");
    
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
