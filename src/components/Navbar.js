import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
       <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                <div className="container-fluid ">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
                        <ul className="navbar-nav  mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <Link to="/" className='nav-link'>Home</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav  mb-2 mb-lg-0 grid gap-3">
                            <li className="nav-item ">
                                <span className=" fw-bold uppercase">
                                    Welcome
                                </span>
                            </li>
                            <li className="nav-link">
                                <Link to="/posts/manage" className="nav-link">
                                <span> <i className="bi bi-gear"></i>
                                   Manage Post
                                </span>
                                </Link>
                            </li>

                            {/* <li className="nav-item ">
                                <Link to="/" className="nav-link"> <button type="submit" className="btn btn-light">
                                    <i className="bi bi-door-closed-fill"></i>Logout
                                </button></Link>
                            </li>
                            <li className="nav-link">
                                <Link to="/login" className="nav-link"><i class="bi bi-box-arrow-in-right"></i> Login</Link>
                            </li>
                            <li className="nav-link">
                                <Link to="/register" className="nav-link">
                                <span>
                                    <i class="bi bi-person-plus-fill"></i>
                                    Register
                                </span>
                                </Link>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
    </div>
  )
}

export default Navbar
