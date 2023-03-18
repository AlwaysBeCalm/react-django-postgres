import React, {Component} from 'react';
import {Home} from "./Home";
import {Department} from "./Department";
import {Employee} from "./Employee";
import {Route, Routes, NavLink} from "react-router-dom";

class NavBar extends Component {
    render() {
        return (
            <>
                <h3 className="d-flex justify-content-center m-3">
                    React JS Frontend
                </h3>
                <nav className="navbar navbar-expand-sm bg-light navbar-dark">
                    <ul className="navbar-nav">
                        <li className="nav-item m-1">
                            <NavLink className="btn btn-light btn-outline-primary" to="/">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item m-1">
                            <NavLink className="btn btn-light btn-outline-primary" to="/department">
                                Department
                            </NavLink>
                        </li>
                        <li className="nav-item m-1">
                            <NavLink className="btn btn-light btn-outline-primary" to="/Employee">
                                Employee
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/department" element={<Department/>}/>
                    <Route path="/employee" element={<Employee/>}/>
                </Routes>
            </>
        )
    }
}

export default NavBar;