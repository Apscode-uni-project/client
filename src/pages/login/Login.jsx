import { Link } from "react-router-dom";
import "./login.scss";
import { useState } from "react";
import { LoginValidation } from "./logic";
import Instance from "../../service/Instance";
const Login = () => {
  
  const[errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const validate = LoginValidation(email, password);

    if(validate.email || validate.password){
      setErrors(validate);
      return;

    }
    else{
      setErrors({
        email: '',
        password: ''
      });
    }

    try{
      const res = await Instance.post('/login')
      console.log(res)
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div id="login">
      <div className="container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-section email-sec">
            <label htmlFor="login-email">Email</label>
            <input type="email" id="login-email" />
            {errors.email && <p className="helper">{errors.email}</p>}
          </div>

          <div className="input-section password-sec">
            <label htmlFor="login-password">Password</label>
            <input type="password" id="login-password" />
            {errors.password && <p className="helper">{errors.password}</p>}
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="link">If you have not account <Link to={'/register'} >Register </Link></p>
        

      </div>
    </div>
  );
};

export default Login;
