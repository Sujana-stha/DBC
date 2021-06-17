import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Sidebar extends Component {
    render() {
        return (
            // <!-- Main Sidebar Container -->
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* <!-- Brand Logo --> */}
                <a href="# " className="brand-link brand-logo">
                    {/* <img src="#" alt="Diaspora Business" className=" img-fluid" /> */}
                    <span className="brand-text font-weight-light">Diaspora Business</span>
                </a>

                {/* <!-- Sidebar --> */}
                <div className="sidebar">
                    {/* <!-- Sidebar user panel (optional) --> */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">Hello Admin!</a>
                        </div>
                    </div>

                

                    {/* <!-- Sidebar Menu --> */}
                    <nav className="mt-2 nm-sidebar">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {/* <!-- Add icons to the links using the .nav-icon class with font-awesome or any other icon font library --> */}
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link active">
                                    <i className="nav-icon fas fa-tachometer-alt"></i>
                                    <p>
                                        Dashboard
                                        
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item has-treeview">
                                <NavLink to="/users" className="nav-link">
                                    <i className="nav-icon fas fa-user"></i>
                                    <p>
                                        Users
                                    </p>
                                </NavLink>
                                
                            </li>
                            <li className="nav-item has-treeview">
                                <NavLink to="/profile" className="nav-link">
                                    <i className="nav-icon fas fa-id-card"></i>
                                    <p>
                                        Profile
                                    </p>
                                </NavLink>
                                
                            </li>
                            <li className="nav-item has-treeview">
                                <NavLink to="/interests" className="nav-link">
                                    <i className="nav-icon fas fa-chart-pie"></i>
                                    <p>
                                        Interest
                                    </p>
                                </NavLink>
                                
                            </li>
                            <li className="nav-item has-treeview">
                                <NavLink to="/objective" className="nav-link">
                                    <i className="nav-icon fas fa-bullseye"></i>
                                    <p>
                                        Objectives
                                    </p>
                                </NavLink>
                                
                            </li>
                            <li className="nav-item has-treeview">
                                <NavLink to="/match" className="nav-link">
                                    <i className="nav-icon fas fa-infinity"></i>
                                    <p>
                                        Matched Users
                                    </p>
                                </NavLink>
                                
                            </li>
                            <li className="nav-item has-treeview">
                                <NavLink to="/meeting" className="nav-link">
                                    <i className="nav-icon far fa-handshake"></i>
                                    <p>
                                        Meetings
                                    </p>
                                </NavLink>
                                
                            </li>
                            <li className="nav-item has-treeview">
                                <NavLink to="/feedbacks" className="nav-link">
                                    <i className="nav-icon far fa-comments"></i>
                                    <p>
                                        Feedbacks
                                    </p>
                                </NavLink>
                                
                            </li>
                         
                            
                        </ul>
                    </nav>
                    {/* <!-- /.sidebar-menu --> */}
                </div>
                {/* <!-- /.sidebar --> */}
            </aside>
        );
    }
}

export default Sidebar;