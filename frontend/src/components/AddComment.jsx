import React, { useState } from 'react';
import { toast } from "react-toastify";
import {useDispatch} from "react-redux"
import { createCommentPost } from '../redux/apiCalls/commentApiCall';
function AddComment({postId}) {
  const dispatch = useDispatch()
  const [text, setText] = useState("")
  const formSubmitHandler = (e) => {
    e.preventDefault()
    console.log(text)
    if (text.trim() === "") return toast.error("Plase type something");
    dispatch(createCommentPost({text, postId}))
    setText("")
  }
  return (
    <form onSubmit={formSubmitHandler}>
      <div className="input-group my-3">
        <input
        value={text}
          type="text"
          className="form-control"
          id="comment"
          placeholder="Type a comment ..."
          onChange={(e) => setText(e.target.value)}
        />

        <div className="input-group-append">
          <span className="input-group-text">
           <button type ="submit" className='btn p-0'>
           <i  className="bi bi-chat-dots-fill text-primary"></i>
           </button>
          </span>
        </div>
      </div>
    </form>
  );
}

export default AddComment;
