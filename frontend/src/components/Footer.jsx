import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div className=" bg-primary ">
  <footer className="d-flex flex-wrap justify-content-between align-items-center py-3  border-top">
    <p className="col-md-4 mb-0 text-light">© 2023 Blog, Inc</p>

    <Link className="navbar-brand fw-bold text-light" to="/">
        Blog
      </Link>

    <ul className="nav col-md-4 justify-content-end">
      <li className="nav-item"><Link to={'/'} className='nav-link px-2 text-light'> Home</Link></li>
      <li className="nav-item"><Link to={'/posts'} className='nav-link px-2 text-light'> Post</Link></li>
      <li className="nav-item"><Link to={'/posts/createPost'} className='nav-link px-2 text-light'> Create</Link></li>
      <li className="nav-item"><Link to={'/adminDashboard'} className='nav-link px-2 text-light'> Admin Dashboard</Link></li>

    </ul>
  </footer>
</div>
  )
}

export default Footer