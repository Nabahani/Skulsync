import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar({ collapsed }) {

    const [openDropdown, setOpenDropdown] = useState(null);
    const [activeItem, setActiveItem] = useState(null);

    function toggleDropdown(name) {
        setOpenDropdown(prev => (prev === name ? null : name));
    }

    return (
        <div className={`sidebar pt-5 ${collapsed ? "collapsed" : ""}`}>
            <nav className="sidebar-container">
                <ul className="navbar-lists">
                    <li className="navbar-item active">
                        <Link to='/dashboard'>
                            <i className="bi bi-columns-gap"></i>
                            <span className="navbar-link">Dashboard</span>
                        </Link>
                    </li>
                    <li className="navbar-item dropdown-container">
                        <Link className={`achorTag ${openDropdown === "school" ? "active" : ""}`} onClick={() => toggleDropdown("school")}>
                            <span>
                                <i className="bi bi-house-door-fill"></i>
                                <span className="navbar-link">My School</span>
                            </span>

                            <span className="dropdown-icon">
                                <i className={`bi bi-chevron-down ${openDropdown === "school" ? "rotate" : ""}`}></i>
                            </span>
                        </Link>

                        <ul className={`dropdown-menu-el ${openDropdown === "school" ? "open" : ""}`} >
                            <li className={`${activeItem === "sections" ? "active" : ""}`} onClick={() => setActiveItem("sections")}>
                                <Link to='/sections'>Sections</Link>
                            </li>
                            <li className={`${activeItem === "programs" ? "active" : ""}`} onClick={() => setActiveItem("programs")}>
                                <Link to='/programs'>Programs</Link>
                            </li>
                            <li className={`${activeItem === "classes" ? "active" : ""}`} onClick={() => setActiveItem("classes")}>
                                <Link to='/classes'>Classes</Link>
                            </li>
                            <li className={`${activeItem === "sessions" ? "active" : ""}`} onClick={() => setActiveItem("sessions")}>
                                <Link to='/sessions'>Sessions</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="navbar-item dropdown-container">
                        <a className={`achorTag ${openDropdown === "staffs" ? "active" : ""}`} onClick={() => toggleDropdown("staffs")}>
                            <span>
                                <i className="bi bi-people-fill"></i>
                                <span className="navbar-link">Staffs</span>
                            </span>

                            <span className="dropdown-icon">
                                <i className={`bi bi-chevron-down ${openDropdown === "staffs" ? "rotate" : ""}`}></i>
                            </span>
                        </a>

                        <ul className={`dropdown-menu-el ${openDropdown === "staffs" ? "open" : ""}`}>
                            <li className={`${activeItem === "allStaffs" ? "active" : ""}`} onClick={() => setActiveItem("allStaffs")}>
                                <a href="#allStaffs">All Staffs</a>
                            </li>
                            <li className={`${activeItem === "addStaffs" ? "active" : ""}`} onClick={() => setActiveItem("addStaffs")}>
                                <a href="#addStaffs">Add Staffs</a>
                            </li>
                            <li className={`${activeItem === "academicStaffs" ? "active" : ""}`} onClick={() => setActiveItem("academicStaffs")}>
                                <a href="#academicStaffs">Academic Staffs</a>
                            </li>
                            <li className={`${activeItem === "nonAcademicStaffs" ? "active" : ""}`} onClick={() => setActiveItem("nonAcademicStaffs")}>
                                <a href="#nonAcademicStaffs">Non Academic Staffs</a>
                            </li>
                            <li className={`${activeItem === "fullTimeStaffs" ? "active" : ""}`} onClick={() => setActiveItem("fullTimeStaffs")}>
                                <a href="#fullTimeStaffs">Full-Time Staffs</a>
                            </li>
                            <li className={`${activeItem === "partTimeStaffs" ? "active" : ""}`} onClick={() => setActiveItem("partTimeStaffs")}>
                                <a href="#partTimeStaffs">Part-Time Staffs</a>
                            </li>
                        </ul>
                    </li>
                    <li className="navbar-item dropdown-container">
                        <a className={`achorTag ${openDropdown === "students" ? "active" : ""}`} onClick={() => toggleDropdown("students")}>
                            <span>
                                <i className="bi bi-people-fill"></i>
                                <span className="navbar-link">Students</span>
                            </span>

                            <span className="dropdown-icon">
                                <i className={`bi bi-chevron-down ${openDropdown === "students" ? "rotate" : ""}`}></i>
                            </span>
                        </a>

                        <ul className={`dropdown-menu-el ${openDropdown === "students" ? "open" : ""}`}>
                            <li className={`${activeItem === "allStudents" ? "active" : ""}`} onClick={() => setActiveItem("allStudents")}>
                                <a href="#allStudents">All Student</a>
                            </li>
                            <li className={`${activeItem === "admission" ? "active" : ""}`} onClick={() => setActiveItem("admission")}>
                                <a href="#admission">Admission</a>
                            </li>
                            <li className={`${activeItem === "bulkAdmission" ? "active" : ""}`} onClick={() => setActiveItem("bulkAdmission")}>
                                <a href="#bulkAdmission">Bulk Admission</a>
                            </li>
                            <li className={`${activeItem === "activeStudents" ? "active" : ""}`} onClick={() => setActiveItem("activeStudents")}>
                                <a href="#activeStudents">Active Students</a>
                            </li>
                            <li className={`${activeItem === "inActiveStudents" ? "active" : ""}`} onClick={() => setActiveItem("inActiveStudents")}>
                                <a href="#inActiveStudents">In Active Students</a>
                            </li>
                            <li className={`${activeItem === "alumniStudents" ? "active" : ""}`} onClick={() => setActiveItem("alumniStudents")}>
                                <a href="#alumniStudents">Alumni Students</a>
                            </li>
                        </ul>
                    </li>
                    <li className="navbar-item dropdown-container">
                        <a className={`achorTag ${openDropdown === "billings" ? "active" : ""}`} onClick={() => toggleDropdown("billings")}>
                            <span>
                                <i className="bi bi-diagram-3-fill"></i>
                                <span className="navbar-link">Billings</span>
                            </span>

                            <span className="dropdown-icon">
                                <i className={`bi bi-chevron-down ${openDropdown === "billings" ? "rotate" : ""}`}></i>
                            </span>
                        </a>

                        <ul className={`dropdown-menu-el ${openDropdown === "billings" ? "open" : ""}`}>
                            <li className={`${activeItem === "billing-items" ? "active" : ""}`} onClick={() => setActiveItem("billing-items")}>
                                <a href="#billing-items">Billing Items</a>
                            </li>
                            <li className={`${activeItem === "billing-categories" ? "active" : ""}`} onClick={() => setActiveItem("billing-categories")}>
                                <a href="#billing-categories">Billing Categories</a>
                            </li>
                            <li className={`${activeItem === "student-discount" ? "active" : ""}`} onClick={() => setActiveItem("student-discount")}>
                                <a href="#student-discount">Student Discount</a>
                            </li>
                            <li className={`${activeItem === "bank-account1" ? "active" : ""}`} onClick={() => setActiveItem("bank-account1")}>
                                <a href="#bank-account1">Bank Account</a>
                            </li>
                        </ul>
                    </li>
                    <li className="navbar-item dropdown-container">
                        <a className={`achorTag ${openDropdown === "invoices" ? "active" : ""}`} onClick={() => toggleDropdown("invoices")}>
                            <span>
                                <i className="bi bi-hdd-stack"></i>
                                <span className="navbar-link">Invoices</span>
                            </span>

                            <span className="dropdown-icon">
                                <i className={`bi bi-chevron-down ${openDropdown === "invoices" ? "rotate" : ""}`}></i>
                            </span>
                        </a>

                        <ul className={`dropdown-menu-el ${openDropdown === "invoices" ? "open" : ""}`}>
                            <li className={`${activeItem === "accounts" ? "active" : ""}`} onClick={() => setActiveItem("accounts")}>
                                <a href="#accounts">Accounts</a>
                            </li>
                            <li className={`${activeItem === "transfers" ? "active" : ""}`} onClick={() => setActiveItem("transfers")}>
                                <a href="#transfers">Transfers</a>
                            </li>
                            <li className={`${activeItem === "transactions" ? "active" : ""}`} onClick={() => setActiveItem("transactions")}>
                                <a href="#transactions">Transactions</a>
                            </li>
                            <li className={`${activeItem === "bank-account2" ? "active" : ""}`} onClick={() => setActiveItem("bank-account2")}>
                                <a href="#bank-account2">Bank Account</a>
                            </li>
                        </ul>
                    </li>
                    <li className="navbar-item dropdown-container">
                        <a className={`achorTag ${openDropdown === "accounts" ? "active" : ""}`} onClick={() => toggleDropdown("accounts")}>
                            <span>
                                <i className="bi bi-piggy-bank-fill"></i>
                                <span className="navbar-link">Accounts</span>
                            </span>

                            <span className="dropdown-icon">
                                <i className={`bi bi-chevron-down ${openDropdown === "accounts" ? "rotate" : ""}`}></i>
                            </span>
                        </a>

                        <ul className={`dropdown-menu-el ${openDropdown === "accounts" ? "open" : ""}`}>
                            <li className={`${activeItem === "accounts1" ? "active" : ""}`} onClick={() => setActiveItem("accounts1")}>
                                <a href="#accounts1">Accounts</a>
                            </li>
                            <li className={`${activeItem === "transfers1" ? "active" : ""}`} onClick={() => setActiveItem("transfers1")}>
                                <a href="#transfers1">Transfers</a>
                            </li>
                            <li className={`${activeItem === "transactions1" ? "active" : ""}`} onClick={() => setActiveItem("transactions1")}>
                                <a href="#transactions1">Transactions</a>
                            </li>
                        </ul>
                    </li>
                    <li className="navbar-item dropdown-container">
                        <a className={`achorTag ${openDropdown === "payments3" ? "active" : ""}`} onClick={() => toggleDropdown("payments3")}>
                            <span>
                                <i className="bi bi-credit-card-fill"></i>
                                <span className="navbar-link">Payments</span>
                            </span>

                            <span className="dropdown-icon">
                                <i className={`bi bi-chevron-down ${openDropdown === "payments" ? "rotate" : ""}`}></i>
                            </span>
                        </a>

                        <ul className={`dropdown-menu-el ${openDropdown === "payments3" ? "open" : ""}`}>
                            <li className={`${activeItem === "allPayments" ? "active" : ""}`} onClick={() => setActiveItem("allPayments")}>
                                <a href="#allPayments">All Payments</a>
                            </li>
                            <li className={`${activeItem === "newPayment" ? "active" : ""}`} onClick={() => setActiveItem("newPayment")}>
                                <a href="#newPayment">New Payment</a>
                            </li>
                        </ul>
                    </li>
                    <li className="navbar-item dropdown-container">
                        <a className={`achorTag ${openDropdown === "payroll" ? "active" : ""}`} onClick={() => toggleDropdown("payroll")}>
                            <span>
                                <i className="bi bi-credit-card-fill"></i>
                                <span className="navbar-link">Payroll</span>
                            </span>

                            <span className="dropdown-icon">
                                <i className={`bi bi-chevron-down ${openDropdown === "payroll" ? "rotate" : ""}`}></i>
                            </span>
                        </a>

                        <ul className={`dropdown-menu-el ${openDropdown === "payroll" ? "open" : ""}`}>
                            <li className={`${activeItem === "payslips" ? "active" : ""}`} onClick={() => setActiveItem("payslips")}>
                                <a href="#payslips">Payslips</a>
                            </li>
                            <li className={`${activeItem === "newPayslip" ? "active" : ""}`} onClick={() => setActiveItem("newPayslip")}>
                                <a href="#newPayslip">New Payslip</a>
                            </li>
                            <li className={`${activeItem === "newPayslips" ? "active" : ""}`} onClick={() => setActiveItem("newPayslips")}>
                                <a href="#newPayslips">New Payslips</a>
                            </li>
                            <li className={`${activeItem === "earnings" ? "active" : ""}`} onClick={() => setActiveItem("earnings")}>
                                <a href="#earnings">Earnings</a>
                            </li>
                            <li className={`${activeItem === "deductions" ? "active" : ""}`} onClick={() => setActiveItem("deductions")}>
                                <a href="#deductions">Deductions</a>
                            </li>
                        </ul>
                    </li>
                    <li className={`navbar-item ${activeItem === "expenses" ? "active" : ""}`} onClick={() => setActiveItem("expenses")}>
                        <a href="#expenses">
                            <i className="bi bi-calendar-week"></i>
                            <span className="navbar-link">Expenses</span>
                        </a>
                    </li>
                    <li className={`navbar-item ${activeItem === "tracker" ? "active" : ""}`} onClick={() => setActiveItem("tracker")}>
                        <a href="#tracker">
                            <i className="bi bi-grid-fill"></i>
                            <span className="navbar-link">Tracker</span>
                        </a>
                    </li>
                    <li className="navbar-item dropdown-container">
                        <a className={`achorTag ${openDropdown === "report" ? "active" : ""}`} onClick={() => toggleDropdown("report")}>
                            <span>
                                <i className="bi bi-graph-up-arrow"></i>
                                <span className="navbar-link">Report & Insight</span>
                            </span>

                            <span className="dropdown-icon">
                                <i className={`bi bi-chevron-down ${openDropdown === "report" ? "rotate" : ""}`}></i>
                            </span>
                        </a>

                        <ul className={`dropdown-menu-el ${openDropdown === "report" ? "open" : ""}`}>
                            <li className={`${activeItem === "revenueReport" ? "active" : ""}`} onClick={() => setActiveItem("revenueReport")}>
                                <a href="#revenueReport">Revenue Report</a>
                            </li>
                            <li className={`${activeItem === "balancesReport" ? "active" : ""}`} onClick={() => setActiveItem("balancesReport")}>
                                <a href="#balancesReport">Balances Report</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar;