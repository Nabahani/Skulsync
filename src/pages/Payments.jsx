import { Link, useNavigate } from "react-router-dom";
import { useInvoices } from "../context/InvoicesContext";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";

function Payments() {

    const navigate = useNavigate();
    const { invoices } = useInvoices();
    const [searchInvoices, setSearchInvoices] = useState('');
    const filteredInvoices = invoices.filter((data) => {
        if (data.status2 === 'Successful') {
            const searchString = searchInvoices.toLowerCase().trim();

            if (!searchString) return true;

            return (
                (data.id ?? '').toLowerCase().includes(searchString) ||
                (data.uniqueId ?? '').toLowerCase().includes(searchString) ||
                (data.student ?? '').toLowerCase().includes(searchString) ||
                (data.paymentMethod ?? '').toLowerCase().includes(searchString) ||
                (data.total ?? '').toLowerCase().includes(searchString) ||
                (data.status2 ?? '').toLowerCase().includes(searchString) ||
                (data.date ?? '').toLowerCase().includes(searchString)
            );
        }

        return false;
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
    const totalPayment = (filteredInvoices ?? []).reduce(
        (sum, invs) =>
            sum + Number(String(invs?.total ?? '0').replace(',', '')),
        0
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [itemsPerPage, searchInvoices])

    return (
        <>
            <div className="page">
                <h4 className="page-title">Payments</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container'><Link className='page-link' to="/dashboard">Home</Link ><span className="slash">/</span></span>
                    <span className="current-path">Payments</span>
                </p>
            </div>

            <div className="container-fluid px-3 pb-4">
                <div className="row g-4">
                    <div className="col-sm-6 col-lg-3">
                        <div className="small-container">
                            <div className="inner-container">
                                <h5 className="title-text">All Payments</h5>

                                <div className="d-flex align-items-center">
                                    <i className='bi bi-credit-card-2-front-fill'></i>
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
                                    <i className='bi bi-people-fill'></i>
                                    <div>
                                        <p className="bold-text">4</p>
                                        <p className="light-text"><span className="green-text text-primary">&#8358;{(Math.max(totalPayment - 1750000, 0)).toLocaleString()}</span></p>
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
                                    <i className='bi bi-credit-card-2-front-fill'></i>
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
                                    <i className='bi bi-people-fill'></i>
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
                            <h5 className="title-text">Payments</h5>

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
                                                    <th>Invoice</th>
                                                    <th>Student</th>
                                                    <th></th>
                                                    <th></th>
                                                    <th>Method</th>
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
                                                                <tr key={data.id}>
                                                                    <th>{firstIndex + index + 1}</th>
                                                                    <td>{data.uniqueId}</td>
                                                                    <td>{data.id}</td>
                                                                    <td style={{ textTransform: 'uppercase' }}>{data.student}</td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td>{data.paymentMethod}</td>
                                                                    <td>
                                                                        &#8358;
                                                                        {(Number(String(data?.total ?? "90000").replace(/,/g, "")) || 90000).toLocaleString()}
                                                                    </td>
                                                                    <td>
                                                                        <span className="bg-primary text-white px-1 smaller-text" style={{ borderRadius: '5px', paddingBottom: '1.5px' }}>{data.status2}</span>
                                                                    </td>
                                                                    <td>{data.date}</td>
                                                                    <td className="actions">
                                                                        <button type="button" className="actions" onClick={() => {
                                                                            setToggleActionsById(data.id);
                                                                            setToggleActions((prev) => !prev);
                                                                        }}>
                                                                            <i className="bi bi-three-dots-vertical"></i>
                                                                        </button>

                                                                        {toggleActions && <nav className={`actions-button-container ${toggleActionsById === data.id ? 'd-block' : 'd-none'}`} style={{ top: '68px', height: '90px' }}>
                                                                            <ul>
                                                                                <li onClick={() => navigate(`/payments/view/${data.id}`)}>
                                                                                    <Link><i className="bi bi-eye-fill"></i> <span className="" style={{ fontSize: '17px' }}>View</span></Link>
                                                                                </li>
                                                                                <li>
                                                                                    <Link><i className="bi bi-printer-fill"></i> <span className="" style={{ fontSize: '17px' }}>Print</span></Link>
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
            </div >
        </>
    )
}

export default Payments;