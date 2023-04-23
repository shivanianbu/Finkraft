import React from "react";
import { NavLink } from 'react-router-dom'


export default function Header() {

  return (

    <header>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <NavLink className="navbar-brand" to="/"><img src="/image/logo.jpg" alt="logo" width="30" height="24" className="d-inline-block align-text-top" /> E-Data</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                    </li>
                  
                </ul>
                <div className="add_btn mt-2 mb-2">
                        <NavLink to="/create/employee" className="btn btn-primary">+ Add Employee</NavLink>
                    </div>
            </div>
        </div>
    </nav>
</header>
  );
}
