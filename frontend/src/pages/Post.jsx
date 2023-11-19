import {React, useEffect, useState} from 'react'
import PostList from '../components/PostList'
import Sidebar from '../components/Sidebar'
import Pagination from '../components/Pagination';
import {useDispatch, useSelector} from "react-redux"
import { fetchPosts, getPostsCount } from '../redux/apiCalls/postsApiCall';
const POST_PER_PAGE = 4
function Post() {
  const dispatch = useDispatch();
  const { postsCount, posts} = useSelector(state => state.post)

  const [currentPage, setCurrentPage] = useState(1)
  const pages = Math.ceil(postsCount / POST_PER_PAGE)
  useEffect(() => {
    dispatch(fetchPosts(currentPage))
  },[currentPage])
  useEffect(() => {
    dispatch(getPostsCount())
  },[])
  return (
    <>
    <div className="container min-vw-100 ">
      <h2 className="fw-bolder text-info">Latest Posts</h2>
        <div className="row">
          <div className="col-md-8">
            <PostList posts={posts} />
          </div>
          <div className="col-md-4">
            <Sidebar />
          </div>
        </div>
        <div className="d-flex justify-content-center">
      <Pagination pages={pages} currentPage={currentPage} 
      setCurrentPage={setCurrentPage} />
      </div>
      </div>
    </>
  )
}

export default Post