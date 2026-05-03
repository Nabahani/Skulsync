import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function TopBar({ onToggle }) {

    const { userDetails } = useAuth();

    const [openProfileMenu, setOpenProfileMenu] = useState(false);




    return (
        <div className="navbar-container">
            <div className="topbar d-flex justify-content-between align-items-center">
                <div className="topbar-left-container d-flex justify-content-between align-items-center">
                    <img src="https://dev.skulsync.com.ng/assets/general/img/skulsync-x.png" alt="" />

                    <button onClick={() => onToggle()}>
                        <span className="navbar-toggler">
                            <i className="bi bi-list"></i>
                        </span>
                    </button>
                </div>

                <div className="topbar-right-container" onClick={() => setOpenProfileMenu(prev => !prev)}>
                    <p className="mt-1 mb-0 d-flex justify-content-between align-items-center">
                        <i className="bi bi-person-circle mb-1"></i>
                        <span className="user-name ms-2 d-none d-sm-inline-block">{userDetails.fName}</span>
                        <i className="bi bi-caret-down-fill dropdown-icon d-none d-sm-inline-block"></i>
                    </p>

                    <div className={`profile-dropmenu ${openProfileMenu ? "open" : ""}`}>
                        <div className="text-center">
                            <p className="profile-user">{userDetails.fName} {userDetails.lName}</p>
                            <p className="profile-role">super-admin</p>
                        </div>

                        <ul className="dropmenu-lists">
                            <li className="dropmenu-item"><a href="#settings"><i className="bi bi-gear"></i> Settings</a></li>
                            <li className="dropmenu-item"><a href="#users"><i className="bi bi-people-fill"></i> Users</a></li>
                            <li className="dropmenu-item"><a href="#settings"><i className="bi bi-box-arrow-right"></i> Sign Out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar;