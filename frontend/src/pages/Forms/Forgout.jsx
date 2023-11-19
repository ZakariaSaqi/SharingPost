import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {useDispatch} from "react-redux"
import { forgout } from "../../redux/apiCalls/passwordApiCall";
function Forgout() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const ForgoutFormHandler = (e) => {
    e.preventDefault()
    if (email.trim() === "") return toast.error("Email is required");
   dispatch(forgout(email))
  }
  return (
    <div className="container py-5" style={{ height: "81vh" }}>
        <ToastContainer position="top-center" />
      <div className="d-flex flex-column justif-content-center align-items-center">
      <form onSubmit={ForgoutFormHandler}>
      <h2 className="fw-bolder text-info text-center">Forgot password </h2>
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

        </div>
         <div className="d-flex flex-column">
         <button type="submit" className="btn btn-primary">
          Submit
        </button>
         </div> 
         </form>
      </div>
    </div>
  )
}

export default Forgout