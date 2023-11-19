import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {useDispatch} from "react-redux"
import { loginUser } from "../../redux/apiCalls/authApiCall";

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const LoginFormHandler = (e) => {
    e.preventDefault()
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");
    
    dispatch(loginUser({
      email, password
    }))
  }
  return (
    <div className="container py-5" style={{ height: "81vh" }}>
        <ToastContainer position="top-center" />
      <div className="d-flex flex-column justif-content-center align-items-center">
      <form onSubmit={LoginFormHandler}>
      <h2 className="fw-bolder text-info text-center">Login to your account </h2>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div> 
         
         <div className="d-flex flex-column">
         <button type="submit" className="btn btn-primary">
          Log in
        </button>
        <Link style={{fontSize : "13px"}} className="mt-2  text-center" to="/signup"> You don't have an account  ?<strong> Sign Up  </strong></Link>
        <Link style={{fontSize : "13px"}} className="mt-2  text-center" to="/forgotPassword"> Did you forgot password ?<strong> Forgot Password</strong></Link>
    
         </div> 
         </form>
      </div>
    </div>
  )
}

export default Login