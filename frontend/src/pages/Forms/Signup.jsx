import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector, } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../redux/apiCalls/authApiCall";
import Swal from "sweetalert2";
function  Signup() {
  const { signupMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const signupFormHandler = (e) => {
    e.preventDefault()
    if (username.trim() === "") return toast.error("Username is required");
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");
   dispatch(signupUser({
    username ,email, password
   }))
  }
  useEffect(() => {
    if (signupMessage) {
      Swal.fire({
        icon: "success",
        title: signupMessage,
      }).then((isOk) => {
        if (isOk) {
          navigate("/login");
        }
      });
    }
  }, [signupMessage, navigate]);
  
  
  return (
    <div className="container py-5" style={{ height: "81vh" }}>
        <ToastContainer position="top-center" />
      <div className="d-flex flex-column justif-content-center align-items-center">
      <form onSubmit={signupFormHandler}>
      <h2 className="fw-bolder text-info text-center">Create New Account</h2>
      <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
          Sign up
        </button>
        <Link style={{fontSize : "13px"}} className="mt-2  text-center" to="/login"> Already have an account  ?<strong> Log In  </strong></Link>
    
         </div> 
         </form>
      </div>
    </div>
  )
}

export default Signup