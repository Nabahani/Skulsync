import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInvoices } from "../context/InvoicesContext";
import Pagination from "../components/Pagination";
import ScrollTop from "../components/ScrollTop";

function Invoices() {

    const navigate = useNavigate();
    const { invoices, setInvoices } = useInvoices();
    const [searchInvoices, setSearchInvoices] = useState('');
    const filteredInvoices = invoices.filter((data) => {
        const searchString = searchInvoices.toLowerCase().trim();

        if (!searchString) return true;

        return (
            (data.id ?? '').toLowerCase().includes(searchString) ||
            (data.student ?? '').toLowerCase().includes(searchString) ||
            (data.regno ?? '').toLowerCase().includes(searchString) ||
            (data.class ?? '').toLowerCase().includes(searchString) ||
            (data.category ?? '').toLowerCase().includes(searchString) ||
            (data.total ?? '').toLowerCase().includes(searchString) ||
            (data.session ?? '').toLowerCase().includes(searchString) ||
            (data.term ?? '').toLowerCase().includes(searchString) ||
            (data.status1 ?? '').toLowerCase().includes(searchString) ||
            (data.status2 ?? '').toLowerCase().includes(searchString) ||
            (data.date ?? '').toLowerCase().includes(searchString)
        );
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
    const [selectedInvoices, setSelectedInvoices] = useState([]);
    const [selectedAction, setSelectedAction] = useState('');

    function deleteInvoice(id) {
        setInvoices(invoices.filter((invcs) => invcs.id !== id));
    }

    function handleCheckedInvoice(id, checked) {
        setSelectedInvoices((prev) => {
            if (checked) {
                return [...prev, id];
            }

            return prev.filter(
                (item) => item !== id
            );
        });
    }

    function handleSelectedAction(e, action) {
        e.preventDefault();

        if (action === '') return;

        if (action === 'Delete') {
            if (!selectedInvoices.length > 0) {
                alert('Please select an invoice');
                event.target.value = '';
                return;
            }

            const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedInvoices.length} selected invoice(s)?`);
            if (confirmDelete) {
                selectedInvoices.map((item) => setInvoices((prev) =>
                    prev.filter((invs) => !selectedInvoices.includes(invs.id))
                ));
                setSelectedInvoices([]);
                setCurrentPage(1);
                event.target.value = '';
                return;
            } else {
                event.target.value = '';
            }
        }
    }

    useEffect(() => {
        setCurrentPage(1);
    }, [itemsPerPage, searchInvoices]);

    return (
        <>
            <div className="page">
                <h4 className="page-title">Invoices</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container'><Link className='page-link' to="/dashboard">Home</Link ><span className="slash">/</span></span>
                    <span className="current-path"><span style={{ textTransform: 'capitalize' }}></span> Invoices</span>
                </p>
            </div>

            <div className="container-fluid pb-4">
                <div className="public-container">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="title-text">Invoices</h5>

                        <div className="">
                            <button type='button' className='btn btn-sm btn-primary me-2' style={{ position: 'relative' }} onClick={() => navigate('/invoices/bulk')}>
                                <span className="add-icon ps-2">+</span> <span className="ms-4 pe-1 fw-semibold">Bulk</span>
                            </button>

                            <button type='button' className='btn btn-sm btn-primary' style={{ position: 'relative' }} onClick={() => navigate('/invoices/single')}>
                                <span className="add-icon ps-2">+</span> <span className="ms-4 pe-1 fw-semibold">Single</span>
                            </button>
                        </div>
                    </div>


                    <div className="px-1">
                        <div className="row mt-2">
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
                                            <th><input type="checkbox" name="" id="" className="form-check-input" onChange={(e) => {
                                                const checked = e.target.checked;

                                                setSelectedInvoices((prev) => {
                                                    if (checked) {
                                                        return currentPageItems.map((item) => item.id);
                                                    }

                                                    return [];
                                                })
                                            }} checked={currentPageItems.length > 0 && currentPageItems.every((item) => selectedInvoices.includes(item.id))} /></th>
                                            <th>S/N</th>
                                            <th>ID</th>
                                            <th>Student</th>
                                            <th></th>
                                            <th></th>
                                            <th>Class</th>
                                            <th>Category</th>
                                            <th>Total</th>
                                            <th>Session</th>
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
                                                            <td><input type="checkbox" id={data.id} className="form-check-input" onChange={(e) => handleCheckedInvoice(data.id, e.target.checked)} checked={selectedInvoices.includes(data.id)} /></td>
                                                            <th>{firstIndex + index + 1}</th>
                                                            <td>{data.id}</td>
                                                            <td>{data.student} ({data.regno})</td>
                                                            <td></td>
                                                            <td></td>
                                                            <td>{data.class}</td>
                                                            <td>{data.category}</td>
                                                            <td>
                                                                &#8358;
                                                                {(Number(String(data?.total ?? "90000").replace(/,/g, "")) || 90000).toLocaleString()}
                                                            </td>
                                                            <td>{data.session}</td>
                                                            <td>
                                                                <span className="bg-primary text-white px-1 smaller-text" style={{ borderRadius: '5px', paddingBottom: '1.5px' }}>{data.status1}</span>
                                                                <br />
                                                                <span className="bg-success text-white px-1 smaller-text" style={{ borderRadius: '5px', paddingBottom: '1.5px' }}>{data.status2}</span>
                                                            </td>
                                                            <td>{data.date}</td>
                                                            <td className="actions">
                                                                <button type="button" className="actions" onClick={() => {
                                                                    setToggleActionsById(data.id);
                                                                    setToggleActions((prev) => !prev);
                                                                }}>
                                                                    <i className="bi bi-three-dots-vertical"></i>
                                                                </button>

                                                                {toggleActions && <nav className={`actions-button-container ${toggleActionsById === data.id ? 'd-block' : 'd-none'}`} style={{ top: '68px', height: '130px' }}>
                                                                    <ul>
                                                                        <li onClick={() => navigate(`/invoices/view/${data.id}`)}>
                                                                            <Link><i className="bi bi-eye-fill"></i> <span className="" style={{ fontSize: '17px' }}>View</span></Link>
                                                                        </li>
                                                                        <li onClick={() => navigate(`/invoices/edit/${data.id}`)}>
                                                                            <Link><i className="bi bi-pencil-square"></i> <span className="" style={{ fontSize: '17px' }}>Edit</span></Link>
                                                                        </li>
                                                                        <li onClick={() => deleteInvoice(data.id)}>
                                                                            <button><i className="bi bi-trash"></i> <span className="" style={{ fontSize: '17px' }}>Delete</span></button>
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

                        <hr className="mt-0" />


                        <form onSubmit={(e) => handleSelectedAction(e, selectedAction)}>
                            <div className="row align-items-center g-2 table-responsive">
                                <div className="col-4">
                                    <select className="form-select" onChange={(e) => setSelectedAction(e.target.value)} required>
                                        <option value="">-- Select Action --</option>
                                        <option value="Delete">Delete</option>
                                        <option value="Print">Print</option>
                                    </select>
                                </div>
                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary py-1">Apply</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ScrollTop />
        </>
    )
}

export default Invoices;