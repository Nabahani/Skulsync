import { Link, useNavigate } from "react-router-dom";
import { useAccounts } from "../context/AccountsContext";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";

function Accounts() {

    const navigate = useNavigate();
    const { accounts } = useAccounts();
    const [searchAccounts, setSearchAccounts] = useState('');
    const filteredAccounts = accounts.filter((data) => {
        const searchString = searchAccounts.toLowerCase().trim();

        if (!searchString) return true;

        return (
            (String(data?.id) ?? '').includes(searchString) ||
            (data?.title ?? '').toLowerCase().includes(searchString) ||
            (String(data?.code) ?? '').includes(searchString) ||
            (data?.type ?? '').toLowerCase().includes(searchString) ||
            (String(data?.previousBal) ?? '').includes(searchString) ||
            (String(data?.currentBal) ?? '').includes(searchString) ||
            (data?.parent ?? '').toLowerCase().includes(searchString) ||
            (data?.status ?? '').toLowerCase().includes(searchString) ||
            (data?.description ?? '').toLowerCase().includes(searchString) ||
            (data?.createdOn ?? '').includes(searchString) ||
            (data?.createdBy ?? '').toLowerCase().includes(searchString)
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
    const assetAccounts = accounts.filter((accounts) => accounts.type === 'Asset');
    const incomeAccounts = accounts.filter((accounts) => accounts.type === 'Income');
    const expenseAccounts = accounts.filter((accounts) => accounts.type === 'Expense');
    const liabilitiesAccounts = accounts.filter((accounts) => accounts.type === 'Liability');

    useEffect(() => {
        setCurrentPage(1);
    }, [itemsPerPage, searchAccounts])

    return (
        <>
            <div className="page">
                <h4 className="page-title">Accounts</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container' onClick={() => navigate('/dashboard')}><a className='page-link'>Home</a><span className="slash">/</span></span>
                    <span className="current-path">Accounts</span>
                </p>
            </div>

            <div className="container-fluid px-3 pb-4">
                <div className="row g-4">
                    <div className="col-sm-6 col-lg-3">
                        <div className="small-container">
                            <div className="inner-container">
                                <h5 className="title-text">Asset</h5>

                                <div className="d-flex align-items-center">
                                    <i className='bi bi-people-fill'></i>
                                    <div>
                                        <p className="bold-text">{assetAccounts.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="small-container">
                            <div className="inner-container">
                                <h5 className="title-text">Income</h5>

                                <div className="d-flex align-items-center">
                                    <i className='bi bi-people-fill'></i>
                                    <div>
                                        <p className="bold-text">{incomeAccounts.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="small-container">
                            <div className="inner-container">
                                <h5 className="title-text">Expense</h5>

                                <div className="d-flex align-items-center">
                                    <i className='bi bi-credit-card-2-front-fill'></i>
                                    <div>
                                        <p className="bold-text">{expenseAccounts.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="small-container">
                            <div className="inner-container">
                                <h5 className="title-text">Liabilities</h5>

                                <div className="d-flex align-items-center">
                                    <i className='bi bi-people-fill'></i>
                                    <div>
                                        <p className="bold-text">{liabilitiesAccounts.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="public-container">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="title-text">Accounts</h5>

                                <button type='button' className='btn btn-sm btn-primary me-2' style={{ position: 'relative' }} onClick={() => navigate('/accounts/add')}>
                                    <span className="add-icon ps-2">+</span> <span className="ms-4 pe-1 fw-semibold">Add</span>
                                </button>
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
                                                    <th>Code</th>
                                                    <th>Title</th>
                                                    <th>Type</th>
                                                    <th>Balance</th>
                                                    <th>Parent</th>
                                                    <th>Status</th>
                                                    <th>Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    currentPageItems.length > 0 ?
                                                        currentPageItems.map((data, index) => {
                                                            return (
                                                                <tr key={data.id}>
                                                                    <th>{firstIndex + index + 1}</th>
                                                                    <td>
                                                                        <span className={`${data.type === 'Income' ? 'bg-success text-white' : data.type === 'Asset' ? 'bg-primary text-white' : data.type === 'Expense' ? 'bg-warning text-black' : 'bg-danger text-white'} px-2 rounded-pill smaller-text`} style={{ paddingBottom: '1.2px', fontWeight: '500', fontSize: '10px' }}>{data?.code ?? ''}</span>
                                                                    </td>
                                                                    <td>{data?.title ?? ''}</td>
                                                                    <td>

                                                                        <span className={`${data.type === 'Income' ? 'bg-success text-white' : data.type === 'Asset' ? 'bg-primary text-white' : data.type === 'Expense' ? 'bg-warning text-black' : 'bg-danger text-white'} px-2 rounded-pill smaller-text`} style={{ paddingBottom: '1.2px', fontWeight: '500', fontSize: '10px' }}>{data?.type ?? ''}</span>
                                                                    </td>
                                                                    <td>&#8358;{data?.currentBal ?? ''}</td>
                                                                    <td>{data?.parent ?? ''}</td>
                                                                    <td>
                                                                        <span className='bg-primary text-white px-2 rounded-pill smaller-text' style={{ paddingBottom: '1.2px', fontWeight: '500', fontSize: '10px' }}>{data?.status ?? ''}</span>
                                                                    </td>
                                                                    <td>{data?.createdOn ?? ''}</td>
                                                                    <td className="actions">
                                                                        <button type="button" className="actions" onClick={() => {
                                                                            setToggleActionsById(data.id);
                                                                            setToggleActions((prev) => !prev);
                                                                        }}>
                                                                            <i className="bi bi-three-dots-vertical"></i>
                                                                        </button>

                                                                        {toggleActions && <nav className={`actions-button-container ${toggleActionsById === data.id ? 'd-block' : 'd-none'}`} style={{ top: '68px', height: '135px' }}>
                                                                            <ul>
                                                                                <li onClick={() => navigate(`/accounts/view/${(data?.title ?? '').toLowerCase().replaceAll(' ', '-')}`)}>
                                                                                    <a><i className="bi bi-eye-fill"></i> <span className="" style={{ fontSize: '17px' }}>View</span></a>
                                                                                </li>
                                                                                <li onClick={() => navigate(`/accounts/info/${data.id}`)}>
                                                                                    <a><i className="bi bi-info-circle"></i> <span className="" style={{ fontSize: '17px' }}>Info</span></a>
                                                                                </li>
                                                                                <li onClick={() => navigate(`/accounts/edit/${data.id}`)}>
                                                                                    <a><i className="bi bi-pencil-square"></i> <span className="" style={{ fontSize: '17px' }}>Edit</span></a>
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
                                            <p className='entries-amount'>Showing {filteredAccounts.length === 0 ? 0 : firstIndex + 1} to {Math.min(lastIndex, filteredAccounts.length)} of {filteredAccounts.length} entries {isFiltered && `(filtered from ${accounts.length} total entries)`}</p>
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
        </>
    )
}

export default Accounts;