import React from "react";
import PostItem from "./PostItem";
function PostList({ posts }) {
  return (
         <div className="row d-flex justify-content-center">
            {posts.map((item) => (
           <div  key={item._id} className="col-md-5 my-3 ">
             <PostItem post={item}/>
           </div>
          ))}
         </div>
  );
}

export default PostList;
