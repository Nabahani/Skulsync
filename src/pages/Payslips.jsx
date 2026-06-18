import { Link, useNavigate } from "react-router-dom";
import { useInvoices } from "../context/InvoicesContext";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import ScrollTop from "../components/ScrollTop";
import { usePayslips } from "../context/PayslipsContext";

function Payslips() {

    const navigate = useNavigate();
    const { payslips, setPayslips } = usePayslips();
    const [searchAccounts, setSearchAccounts] = useState('');
    const filteredAccounts = payslips.filter((data) => {
        const searchString = searchAccounts.toLowerCase().trim();

        if (!searchString) return true;

        return (
            (String(data?.id) ?? '').includes(searchString) ||
            (data?.staff ?? '').toLowerCase().includes(searchString) ||
            (data?.period ?? '').toLowerCase().includes(searchString) ||
            String(data?.salary ?? '').includes(searchString) ||
            (data?.status ?? '').toLowerCase().includes(searchString) ||
            (data?.date ?? '').toLowerCase().includes(searchString)
        );
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentPageItems = filteredAccounts.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage) || 1;
    const isFiltered = searchAccounts.trim() !== '';
    const [toggleActions, setToggleActions] = useState(false);
    const [toggleActionsById, setToggleActionsById] = useState();
    const [add, setAdd] = useState(false);

    useEffect(() => {
        setCurrentPage(1);
    }, [itemsPerPage, searchAccounts]);

    return (
        <>
            <div className="page">
                <h4 className="page-title">Payslips</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container' onClick={() => navigate('/dashboard')}><Link className='page-link'>Home</Link><span className="slash">/</span></span>
                    <span className="current-path">Payslips</span>
                </p>
            </div>

            <div className="container-fluid px-3 pb-4">
                <div className="row g-4">

                    <div className="col-12">
                        <div className="public-container">
                            <div className="d-flex justify-content-between align-items-center relative-container">
                                <h5 className="title-text">Payslips</h5>

                                <button type='button' className='actions' onClick={() => setAdd(prev => !prev)}>
                                    <i className="bi bi-three-dots-vertical"></i>
                                </button>

                                {
                                    add && <div className="add-student-container">
                                        <nav>
                                            <ul>
                                                <li onClick={() => {
                                                    navigate('/transfers/add');
                                                }} className="position-relative">
                                                    <Link><span className="add-icon text-info">+</span> <span className="add-text ps-4">New Bulk Payslips</span></Link>
                                                </li>
                                                <li onClick={() => {
                                                    navigate('/transfers/add');
                                                }} className="position-relative">
                                                    <Link><span className="add-icon text-info">+</span> <span className="add-text ps-4">New Single Payslips</span></Link>
                                                </li>
                                                <li onClick={() => {
                                                    navigate('/transfers/export');
                                                }} className="position-relative">
                                                    <Link><span className="add-icon text-info">+</span> <span className="add-text ps-4">Process Bulk Payslips</span></Link>
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
                                        <input type="search" name="search" id="search" className="form-control p-1 px-2" style={{ width: "250px" }} onChange={(e) => setSearchAccounts(e.target.value)} />
                                    </div>
                                </div>

                                <div className="entries mt-3">
                                    <label className="form-label entries-text mb-1">entries</label>

                                    <div className="table-responsive">
                                        <table className="table table-hover align-middle">
                                            <thead>
                                                <tr>
                                                    <th>S/N</th>
                                                    <th>Staff</th>
                                                    <th>Period</th>
                                                    <th>Basic Salary</th>
                                                    <th>Growth Salary</th>
                                                    <th>Net Salary</th>
                                                    <th>Status</th>
                                                    <th>Created On</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    currentPageItems.length > 0 ?
                                                        currentPageItems.map((data, index) => {
                                                            console.log(data)
                                                            return (
                                                                <tr key={data.id || data.uniqueID}>
                                                                    <th>{firstIndex + index + 1}</th>
                                                                    <td>{data?.staff ?? ''}</td>
                                                                    <td>{data?.period ?? ''}</td>
                                                                    <td>&#8358;{(data?.salary ?? 0).toLocaleString()}</td>
                                                                    <td>&#8358;{(data?.salary ?? 0).toLocaleString()}</td>
                                                                    <td>&#8358;{(data?.salary ?? 0).toLocaleString()}</td>
                                                                    <td>{data?.status ?? ''}</td>
                                                                    <td>{data?.date ?? ''}</td>
                                                                    <td className="actions">
                                                                        <button type="button" className="actions" onClick={() => {
                                                                            setToggleActionsById(data.id);
                                                                            setToggleActions((prev) => !prev);
                                                                        }}>
                                                                            <i className="bi bi-three-dots-vertical"></i>
                                                                        </button>

                                                                        {toggleActions && <nav className={`actions-button-container ${toggleActionsById === data.id ? 'd-block' : 'd-none'}`} style={{ top: '50px', height: '95px' }}>
                                                                            <ul>
                                                                                <li onClick={() => navigate(`/transfers/view/${(data.id)}`)}>
                                                                                    <a><i className="bi bi-eye-fill"></i> <span className="" style={{ fontSize: '17px' }}>View</span></a>
                                                                                </li>
                                                                                <li onClick={() => navigate(`/transfers/view/${(data.id)}`)}>
                                                                                    <a><i className="bi bi-trash"></i> <span className="" style={{ fontSize: '17px' }}>Delete</span></a>
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
                                            <p className='entries-amount'>Showing {filteredAccounts.length === 0 ? 0 : firstIndex + 1} to {Math.min(lastIndex, filteredAccounts.length)} of {filteredAccounts.length} entries {isFiltered && `(filtered from ${payslips.length} total entries)`}</p>
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

export default Payslips;