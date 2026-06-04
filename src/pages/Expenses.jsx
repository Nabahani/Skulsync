import { Link, useNavigate } from "react-router-dom";
import { useInvoices } from "../context/InvoicesContext";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import ScrollTop from "../components/ScrollTop";

function Expenses() {

    const navigate = useNavigate();
    const { invoices } = useInvoices();
    const [add, setAdd] = useState(false);
    const [searchInvoices, setSearchInvoices] = useState('');
    const filteredInvoices = invoices.filter((data) => {
        if (data.status2 === 'Pending') {
            const searchString = searchInvoices.toLowerCase().trim();

            if (!searchString) return true;

            return (
                (data.uniqueId ?? '').toString().toLowerCase().includes(searchString) ||
                (data.title ?? '').toLowerCase().includes(searchString) ||
                (data.category ?? '').toLowerCase().includes(searchString) ||
                (data.total ?? '').toLowerCase().includes(searchString) ||
                (data.status2 ?? '').toLowerCase().includes(searchString) ||
                (data.date ?? '').toLowerCase().includes(searchString)
            );
        }
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentPageItems = filteredInvoices.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage) || 1;
    const isFiltered = searchInvoices.trim() !== '';
    const [toggleActions, setToggleActions] = useState(false);
    const [toggleActionsById, setToggleActionsById] = useState();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const currentYear = new Date().getFullYear();
    const currentMonth = months[new Date().getMonth()];
    const totalPayment = filteredInvoices.reduce((sum, invs) => {
        return sum + Number(invs.total?.replace(',', '') ?? 0);
    }, 0);

    useEffect(() => {
        setCurrentPage(1);
    }, [itemsPerPage, searchInvoices])

    return (
        <>
            <div className="page">
                <h4 className="page-title">Expenses</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container' onClick={() => naviagte('/dashboard')}><Link className='page-link' to="/dashboard">Home</Link ><span className="slash">/</span></span>
                    <span className="current-path">Expenses</span>
                </p>
            </div>

            <div className="container-fluid px-3 pb-4">
                <div className="row g-4">
                    <div className="col-sm-6 col-lg-3">
                        <div className="small-container">
                            <div className="inner-container">
                                <h5 className="title-text">All Expenses</h5>

                                <div className="d-flex align-items-center">
                                    <i className="bi bi-diagram-3-fill"></i>
                                    <div>
                                        <p className="bold-text">{filteredInvoices.length}</p>
                                        <p className="light-text"><span className="green-text text-primary">&#8358;{totalPayment.toLocaleString()}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="small-container">
                            <div className="inner-container">
                                <h5 className="title-text">{currentYear}</h5>

                                <div className="d-flex align-items-center">
                                    <i className="bi bi-diagram-3-fill"></i>
                                    <div>
                                        <p className="bold-text">1</p>
                                        <p className="light-text"><span className="green-text text-primary">&#8358;{(totalPayment - 353500).toLocaleString()}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="small-container">
                            <div className="inner-container">
                                <h5 className="title-text">{currentMonth}</h5>

                                <div className="d-flex align-items-center">
                                    <i className="bi bi-diagram-3-fill"></i>
                                    <div>
                                        <p className="bold-text">0</p>
                                        <p className="light-text"><span className="green-text text-primary">&#8358;0</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="small-container">
                            <div className="inner-container">
                                <h5 className="title-text">Today</h5>

                                <div className="d-flex align-items-center">
                                    <i className="bi bi-diagram-3-fill"></i>
                                    <div>
                                        <p className="bold-text">0</p>
                                        <p className="light-text"><span className="green-text text-primary">&#8358;0</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="public-container">
                            <div className="d-flex justify-content-between relative-container">
                                <h5 className="title-text">Students</h5>
                                <button type='button' className='actions' onClick={() => setAdd(prev => !prev)}>
                                    <i className="bi bi-three-dots-vertical"></i>
                                </button>

                                {
                                    add && <div className="add-student-container">
                                        <nav>
                                            <ul>
                                                <li onClick={() => {
                                                    navigate('/expenses/add');
                                                }} className="position-relative">
                                                    <Link><span className="add-icon text-info pe-2">+</span> <span className="add-text ps-4 fw-semibold">New Expenses</span></Link>
                                                </li>
                                                <li onClick={() => {
                                                    navigate('/expenses/bulk');
                                                }} className="position-relative">
                                                    <Link><span className="add-icon text-info pe-2">+</span> <span className="add-text ps-4 fw-semibold">New Bulk Expenses</span></Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                }
                            </div>

                            <div className="px-1">
                                <div className="row mt-3">
                                    <div className="col-12 col-sm-6">
                                        <label htmlFor="show" className="form-label my-1">Show:</label>
                                        <select name="show" id="show" className='form-select p-1 px-2' style={{ width: "90px" }} value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </div>

                                    <div className="col-12 col-sm-6">
                                        <label htmlFor="search" className="form-label my-1">Search:</label>
                                        <input type="search" name="search" id="search" className="form-control p-1 px-2" style={{ width: "250px" }} onChange={(e) => setSearchInvoices(e.target.value)} />
                                    </div>
                                </div>

                                <div className="entries mt-3">
                                    <label className="form-label entries-text mb-1">entries</label>

                                    <div className="table-responsive">
                                        <table className="table table-hover align-middle">
                                            <thead>
                                                <tr>
                                                    <th>S/N</th>
                                                    <th>Reference</th>
                                                    <th>Title</th>
                                                    <th></th>
                                                    <th></th>
                                                    <th>Category</th>
                                                    <th>Amount</th>
                                                    <th>Status</th>
                                                    <th>Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    currentPageItems.length > 0 ?
                                                        currentPageItems.map((data, index) => {

                                                            const isActive = data.status === 'active';
                                                            return (
                                                                <tr key={data.uniqueId}>
                                                                    <th>{firstIndex + index + 1}</th>
                                                                    <td>{data.uniqueId}</td>
                                                                    <td>{data.title}</td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td>{data.category}</td>
                                                                    <td>&#8358;{(data.total ?? '90,000.00').toLocaleString()}</td>
                                                                    <td>
                                                                        <span className="bg-primary text-white px-2 smaller-text rounded" style={{ paddingBottom: '1.5px', paddingTop: '1px' }}>{data.status2}</span>
                                                                    </td>
                                                                    <td>{data.date}</td>
                                                                    <td className="actions">
                                                                        <button type="button" className="actions" onClick={() => {
                                                                            setToggleActionsById(data.id);
                                                                            setToggleActions((prev) => !prev);
                                                                        }}>
                                                                            <i className="bi bi-three-dots-vertical"></i>
                                                                        </button>

                                                                        {toggleActions && <nav className={`actions-button-container ${toggleActionsById === data.id ? 'd-block' : 'd-none'}`} style={{ top: '68px', height: '60px' }}>
                                                                            <ul>
                                                                                <li onClick={() => navigate(`/expenses/view/${data.id}`)}>
                                                                                    <Link><i className="bi bi-eye-fill"></i> <span className="" style={{ fontSize: '17px' }}>View</span></Link>
                                                                                </li>
                                                                            </ul>
                                                                        </nav>}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        :
                                                        <tr>
                                                            <td colSpan={13}>No matching records found</td>
                                                        </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-12 col-md-6">
                                            <p className='entries-amount'>Showing {filteredInvoices.length === 0 ? 0 : firstIndex + 1} to {Math.min(lastIndex, filteredInvoices.length)} of {filteredInvoices.length} entries {isFiltered && `(filtered from ${invoices.length} total entries)`}</p>
                                        </div>

                                        <div className="col-12 col-md-6 table-responsive">
                                            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ScrollTop />
        </>
    )
}

export default Expenses;