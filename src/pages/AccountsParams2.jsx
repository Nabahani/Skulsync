import { useParams, Link, useNavigate } from "react-router-dom";
import ScrollTop from "../components/ScrollTop";
import { useAccounts } from "../context/AccountsContext";
import { useEffect, useState } from "react";
import { useInvoices } from "../context/InvoicesContext";
import Pagination from "../components/Pagination";

function AccountsParams2() {

    const { action, id } = useParams();
    const navigate = useNavigate();
    const { accounts, setAccounts } = useAccounts();

    const expectedActions = ['edit', 'info', 'view'];
    useEffect(() => {
        if (!expectedActions.includes(action)) {
            navigate('/404');
        }

        if (action === 'edit' && !accounts.some((account) => account.id === Number(id))) {
            navigate('/404');
        }

        if (action === 'info' && !accounts.some((account) => account.id === Number(id))) {
            navigate('/404');
        }
    }, [action, expectedActions, navigate]);

    const currentAccount = accounts.find(account => account.id === Number(id));
    const [data, setData] = useState(currentAccount);
    const { invoices, setInvoices } = useInvoices();
    const schoolFees = invoices.filter((invoice) =>
        (invoice.title ?? '').includes('School') ?? []
    );

    function handleSubmit(e) {
        e.preventDefault();

        setAccounts((prev) => prev.map((account) => account.id === Number(id) ? data : account));
        navigate('/accounts');
    }

    function deactivate(id) {

        setAccounts((prev) =>
            prev.map((account) =>
                account.id === id
                    ? {
                        ...account,
                        status: account.status === 'Active' ? 'Inactive' : 'Active'
                    }
                    : account
            ));
    }


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


    let content;
    if (action === 'edit') {
        content = (
            <div className="container-fluid pb-4">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-8">
                        <div className="public-container">
                            <h3 className="title-4 mt-3 text-center">Add Account</h3>

                            <form className="student-form" onSubmit={(e) => handleSubmit(e)}>
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="title" className="form-label mb-1">Title <span className="text-danger">*</span></label>
                                        <input type="text" id="title" className="form-control" value={data?.title ?? ''} onChange={(e) => setData({ ...data, title: e.target.value })} required />
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        <label htmlFor="code" className="form-label mb-1">Code <span className="text-danger">*</span></label>
                                        <input type="text" id="code" className="form-control" value={data?.code ?? ''} onChange={(e) => setData({ ...data, code: e.target.value })} required />
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        <label htmlFor="type" className="form-label mb-1">Type <span className="text-danger">*</span></label>
                                        <select id="type" className="form-select" value={data?.type ?? ''} onChange={(e) => setData({ ...data, type: e.target.value })} required >
                                            <option value=''>Choose..</option>
                                            <option value="Income">Income</option>
                                            <option value="Asset">Asset</option>
                                            <option value="Expense">Expense</option>
                                            <option value="Liability">Liability</option>
                                            <option value="Equity">Equity</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row mt-0 mt-md-2">
                                    <div className="col-md-6 mt-2 mt-md-0">
                                        <label htmlFor="previousBal" className="form-label mb-1">Opening Balance (&#8358;) <span className="text-danger">*</span></label>
                                        <input type="number" id="previousBal" className="form-control" value={data?.previousBal ?? ''} onChange={(e) => setData({ ...data, previousBal: e.target.value })} required />
                                    </div>

                                    <div className="col-md-6 mt-2 mt-md-0">
                                        <label htmlFor="parent" className="form-label mb-1">Parent Account (Optional)</label>
                                        <select id="parent" className="form-select" value={data?.parent ?? ''} onChange={(e) => setData({ ...data, parent: e.target.value })} >
                                            <option value=''>Choose..</option>
                                            <option value='School Fees Income - Income'>School Fees Income - Income</option>
                                            <option value='Income Account - Income'>Income Account - Income</option>
                                            <option value='Asset Account - Asset'>Asset Account - Asset</option>
                                            <option value='Zenith Bank 1'>Zenith Bank 1</option>
                                            <option value='Zenith Bank 2'>Zenith Bank 2</option>
                                            <option value='Kazeem Fabunmi - Taj Bank - Asset'>Kazeem Fabunmi - Taj Bank - Asset</option>
                                            <option value='Kazeem Fabunm - Opay - Asset'>Kazeem Fabunm - Opay - Asset</option>
                                            <option value='New Standard - Taj Bank - Asset'>New Standard - Taj Bank - Asset</option>
                                            <option value='Expense Account - Expense'>Expense Account - Expense</option>
                                        </select>
                                    </div>
                                </div>

                                <label htmlFor="description" className="form-label mb-1 mt-2">Discription <span className="text-danger">*</span></label>
                                <textarea id="description" className="form-control" value={data?.description ?? ''} onChange={(e) => setData({ ...data, description: e.target.value })} ></textarea>

                                <div className="text-center mt-3">
                                    <button type="submit" className="btn btn-primary text-center py-1 me-1">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (action === 'info') {
        content = (
            <div className="container-fluid pb-4">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="public-container px-3 py-4">

                            <h3 className="title-2 text-center mt-2 mb-1">Account Details</h3>
                            <div className="row">
                                <div className="col-12">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Title : </span>
                                        <span className="public-input">{currentAccount?.title ?? ''}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Code : </span>
                                        <span className="public-input">{currentAccount?.code ?? ''}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Type : </span>
                                        <span className="public-input">{currentAccount?.type ?? ''}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Previous Balance : </span>
                                        <span className="public-input">&#8358;{(currentAccount?.previousBal ?? '').toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Current Balance : </span>
                                        <span className="public-input">&#8358;{(currentAccount?.currentBal ?? '').toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Parent : </span>
                                        <span className="public-input">{currentAccount?.parent ?? ''}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Status : </span>
                                        <span className="public-input">{currentAccount?.status ?? ''}</span>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Descripton : </span>
                                        <span className="public-input">{currentAccount?.description ?? ''}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Created On </span>
                                        <span className="public-input">{currentAccount?.createdOn ?? ''}</span>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Created By </span>
                                        <span className="public-input">{currentAccount?.createdBy ?? ''}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mt-2">
                                <button className="btn btn-primary me-1 mt-2 py-1" onClick={() => navigate(`/accounts/view/${currentAccount.id}`)}><i className="bi bi-eye-fill"></i> View</button>
                                <button className="btn btn-info me-1 mt-2 py-1" onClick={() => navigate(`/accounts/edit/${currentAccount.id}`)}><i className="bi bi-pencil-square"></i> Edit</button>
                                <button className="btn btn-info me-1 mt-2 py-1" onClick={() => navigate('/accounts')}><i className="bi bi-x-lg"></i> Cancel</button>
                                <button className="btn btn-warning mt-2 py-1" onClick={() => deactivate(currentAccount.id)}><i className={`bi bi-arrow-${currentAccount.status === 'Active' ? 'down' : 'up'}`}></i> {currentAccount.status === 'Active' ? 'Deactivate' : 'Activate'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (action === 'view') {
        content = (
            <div className="container-fluid px-3 pb-4">
                <div className="row g-4">
                    <div className="col-sm-6 col-lg-3">
                        <div className="small-container">
                            <div className="inner-container">
                                <h5 className="title-text">School Fees Income</h5>

                                <div className="d-flex align-items-center">
                                    <i className='bi bi-cash-coin'></i>

                                    <div>
                                        <p className="bold-text">
                                            &#8358;
                                            {schoolFees
                                                .reduce(
                                                    (sum, item) =>
                                                        sum + Number(item.total.replace(/,/g, '')),
                                                    0
                                                )
                                                .toLocaleString('en-NG', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="small-container">
                            <div className="inner-container">
                                <h5 className="title-text">All Transactions</h5>

                                <div className="d-flex align-items-center">
                                    <i className='bi bi-cash-coin'></i>
                                    <div>
                                        <p className="bold-text">
                                            &#8358;
                                            {schoolFees
                                                .reduce(
                                                    (sum, item) =>
                                                        sum + Number(item.total.replace(/,/g, '')),
                                                    0
                                                )
                                                .toLocaleString('en-NG', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="small-container">
                            <div className="inner-container">
                                <h5 className="title-text">Debit</h5>

                                <div className="d-flex align-items-center">
                                    <i className='bi bi-cash-coin'></i>
                                    <div>
                                        <p className="bold-text">
                                            &#8358;
                                            {schoolFees
                                                .reduce(
                                                    (sum, item) =>
                                                        sum + Number(item.total.replace(/,/g, '')) / 8,
                                                    0
                                                )
                                                .toLocaleString('en-NG', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="small-container">
                            <div className="inner-container">
                                <h5 className="title-text">Credit</h5>

                                <div className="d-flex align-items-center">
                                    <i className='bi bi-cash-coin'></i>
                                    <div>
                                        <p className="bold-text">
                                            &#8358;
                                            {schoolFees
                                                .reduce(
                                                    (sum, item) =>
                                                        sum + Number(item.total.replace(/,/g, '')) / 1.2,
                                                    0
                                                )
                                                .toLocaleString('en-NG', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 pb-3">
                        <div className="public-container">
                            <h5 className="title-text mb-3">Transactions</h5>

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
                                                                    <th>{firstIndex + index + 1}</th>
                                                                    <td>{data.id}</td>
                                                                    <td>{data.student} ({data.regno})</td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td>{data.class}</td>
                                                                    <td>{data.category}</td>
                                                                    <td>{data.total}</td>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="page">
                <h4 className="page-title">Accounts</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container' style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}><a className='page-link'>Home</a><span className="slash">/</span></span>
                    <span className='link-container' style={{ cursor: 'pointer' }} onClick={() => navigate('/accounts')}><Link to='/accounts' className='page-link'>Accounts</Link><span className="slash">/</span></span>
                    <span className="current-path" style={{ textTransform: 'capitalize' }}>{action === 'view' ? 'Account Journal' : action}</span>
                </p>
            </div>

            {content}

            <ScrollTop />
        </>
    )
}

export default AccountsParams2;