import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import ScrollTop from "../components/ScrollTop";
import { useBillings } from "../context/BillingsContext";

function BillingsParams1() {

    const { action } = useParams();
    const navigate = useNavigate();

    const expectedActions = ['category', 'discount', 'bank-accounts']
    useEffect(() => {
        if (!expectedActions.includes(action)) {
            navigate('/404');
        }
    }, [action, navigate]);

    const { category, setCategory, discount, setDiscount, accounts, setAccounts } = useBillings();

    const [searchCategory, setSearchCategory] = useState('');
    const filteredCategory = action === 'category' ? category.filter((data) => {
        const searchString = searchCategory.toLowerCase().trim();

        if (!searchString) return true;

        return (
            (data?.title || '').toLowerCase().includes(searchString) ||
            (data?.status || '').toLowerCase().includes(searchString)
        )
    }) : action === 'discount'
        ? discount.filter((data) => {
            const searchString = searchCategory.toLowerCase().trim();

            if (!searchString) return true;

            return (
                (data?.title || '').toLowerCase().includes(searchString) ||
                (data?.category || '').toLowerCase().includes(searchString) ||
                (data?.tenure || '').toLowerCase().includes(searchString) ||
                (data?.session || '').toLowerCase().includes(searchString) ||
                (data?.appliesTo || '').toLowerCase().includes(searchString) ||
                (data?.target || '').toLowerCase().includes(searchString) ||
                (data?.type || '').toLowerCase().includes(searchString) ||
                (String(data?.amount) || '').includes(searchString) ||
                (data?.admittedBefore || '').toLowerCase().includes(searchString) ||
                (data?.status || '').toLowerCase().includes(searchString)
            )
        })
        : accounts.filter((data) => {
            const searchString = searchCategory.toLowerCase().trim();

            if (!searchString) return true;

            return (
                (data?.accountName || '').toLowerCase().includes(searchString) ||
                (data?.accountNo || '').toLowerCase().includes(searchString) ||
                (data?.bankName || '').toLowerCase().includes(searchString) ||
                (data?.status || '').toLowerCase().includes(searchString)
            )
        });
    const isFiltered = searchCategory.trim() !== '';
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const pageData = filteredCategory.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredCategory.length / itemsPerPage) || 1;
    const [add, setAdd] = useState(false);
    const [categoryFormData, setCategoryFormData] = useState(action === 'category' ? { id: '', title: '', status: '' } : { accountName: '', accountNo: '', bankName: '' });
    const [isEditingCategory, setIsEditingCategory] = useState(false);
    const handleAddCategory = () => {
        if (action === 'category') {
            setCategoryFormData({ id: '', title: '', status: '' });
        } else if (action === 'bank-accounts') {
            setCategoryFormData({ accountName: '', accountNo: '', bankName: '' });
        }
        setIsEditingCategory(false);
    }
    const handleEditCategory = (data) => {
        setCategoryFormData(data);
        setIsEditingCategory(true);
    }
    const deleteCategory = (id) => {
        if (action === 'category') {
            const currentCategory = category.find((item) => item.id === id);
            if (currentCategory && window.confirm(`Are you sure you want to delete ${currentCategory?.title ?? ''} category?`)) {
                setCategory(category.filter((data) => data.id !== id));
            }
        } else if (action === 'bank-accounts') {
            const currentAccount = accounts.find((account) => account.id === id);
            if (currentAccount && window.confirm(`Are you sure you want to delete ${currentAccount?.accountNo ?? ''} account?`)) {
                setAccounts((prev) => prev.filter((accounts) => accounts.id !== id));
            }
        }
    }
    const deleteDiscount = (id) => {
        const currentDiscount = discount.find((item) => item.id === id);
        if (window.confirm(`Are you sure you want to delete ${currentDiscount?.title ?? ''} discount?`)) {
            setDiscount((prev) => prev.filter((data) => data.id !== id));
        }
    }
    const onSubmitCategory = (e) => {
        e.preventDefault();

        if (isEditingCategory) {
            if (action === 'category') {
                setCategory(category.map((data) => data.id === categoryFormData.id ? { ...category, id: categoryFormData.id, title: categoryFormData.title, status: categoryFormData.status } : data));
            } else if (action === 'bank-accounts') {
                setAccounts((prev) => prev.map((data) => data.id === categoryFormData.id ? categoryFormData : data));
            }
        } else {
            if (action === 'category') {
                const uniqueId = category.length > 0
                    ? Math.max(...category.map(item => item.id)) + 1
                    : 1;
                setCategory([...category, { ...categoryFormData, id: uniqueId }]);
            } else if (action === 'bank-accounts') {
                const newAccount = {
                    ...categoryFormData,
                    id: accounts.length > 0 ?
                        Math.max(...accounts.map(item => item.id)) + 1
                        : 1,
                    status: 'Active'
                }
                setAccounts([...accounts, newAccount]);
            }
        }
    }

    useEffect(() => {
        setCurrentPage(1);
    }, [searchCategory, itemsPerPage]);

    let content;
    if (action === 'category') {
        content = (
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            pageData.length > 0 ?
                                pageData.map((data, index) => (
                                    <tr key={data.id}>
                                        <th>{firstIndex + index + 1}</th>
                                        <td>{data.title}</td>
                                        <td>{data.status}</td>
                                        <td className="actions d-flex">
                                            <button className="btn btn-sm btn-primary px-1 me-1" data-bs-toggle="modal" data-bs-target="#categoryModal" onClick={() => handleEditCategory(data)}>
                                                <i className="bi bi-pencil-square"></i>
                                            </button>

                                            <button className="btn btn-sm btn-danger px-1 me-1" onClick={() => deleteCategory(data.id)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td colSpan={10}>No matching records found</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        )
    } else if (action === 'discount') {
        content = (
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Tenure</th>
                            <th>Session</th>
                            <th>Applies To</th>
                            <th>Target</th>
                            <th>Type</th>
                            <th>Value</th>
                            <th>Admitted Before</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            pageData.length > 0 ?
                                pageData.map((data, index) => (
                                    <tr key={data.id}>
                                        <th>{firstIndex + index + 1}</th>
                                        <td>{data.title}</td>
                                        <td>{data.category}</td>
                                        <td>{data.tenure}</td>
                                        <td>{data.session}</td>
                                        <td>{data.appliesTo}</td>
                                        <td>{data.target}</td>
                                        <td>{data.type}</td>
                                        <td>&#8358;{data.amount.toLocaleString()}</td>
                                        <td>{data.admittedBefore}</td>
                                        <td>{data.status}</td>
                                        <td className="actions">
                                            <div className="d-flex">
                                                <button className="btn btn-sm btn-primary px-1 me-1" onClick={() => navigate(`/billings/discount/edit/${data.id}`)}>
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>

                                                <button className="btn btn-sm btn-danger px-1 me-1" onClick={() => deleteDiscount(data.id)}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td colSpan={10}>No matching records found</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        )
    } else if (action === 'bank-accounts') {
        content = (
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Account Name</th>
                            <th>Account Number</th>
                            <th>Bank Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            pageData.length > 0 ?
                                pageData.map((data, index) => (
                                    <tr key={data.id}>
                                        <th>{firstIndex + index + 1}</th>
                                        <td>{data.accountName}</td>
                                        <td>{data.accountNo}</td>
                                        <td>{data.bankName}</td>
                                        <td>{data.status}</td>
                                        <td className="actions">
                                            <div className="d-flex">
                                                <button className="btn btn-sm btn-primary px-1 me-1" data-bs-toggle="modal" data-bs-target="#categoryModal" onClick={() => handleEditCategory(data)}>
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>

                                                <button className="btn btn-sm btn-danger px-1 me-1" onClick={() => deleteCategory(data.id)}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td colSpan={10}>No matching records found</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        )
    }


    return (
        <>
            <div className="page">
                <h4 className="page-title">{action === 'bank-accounts' ? 'Bank Accounts' : 'Billings'}</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container' onClick={() => navigate('/dashboard')}><Link className='page-link'>Home</Link ><span className="slash">/</span></span>
                    <span className="current-path">{action === 'category' ? 'Billing' : action === 'discount' ? 'Student' : ''} <span style={{ textTransform: 'capitalize' }}>{action.replace('-', ' ')}</span></span>
                </p>
            </div>

            <div className="container-fluid px-3 pb-4">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="public-container px-3">
                            <div className="d-flex justify-content-between relative-container">
                                <h5 className="title-text">{action === 'category' ? 'Billing Category' : action === 'bank-accounts' ? 'Bank Accounts' : 'Student Discount'}</h5>

                                {
                                    action === 'category' ?
                                        <button type='button' className='btn btn-sm btn-primary' data-bs-toggle="modal" data-bs-target="#categoryModal" onClick={() => handleAddCategory()} style={{ position: 'relative' }}>
                                            <span className="add-icon ps-2">+</span> <span className="ms-3">Items</span>
                                        </button>
                                        : action === 'bank-accounts'
                                            ? <button type='button' className='btn btn-sm btn-primary' data-bs-toggle="modal" data-bs-target="#categoryModal" onClick={() => handleAddCategory()} style={{ position: 'relative' }}>
                                                <span className="add-icon ps-2">+</span> <span className="ms-3">Items</span>
                                            </button>
                                            :
                                            <>
                                                <button type='button' className='actions' onClick={() => setAdd(prev => !prev)}>
                                                    <i className="bi bi-three-dots-vertical"></i>
                                                </button>


                                                {
                                                    add && <div className="add-student-container">
                                                        <nav>
                                                            <ul>
                                                                <li onClick={() => {
                                                                    navigate('/billings/discount/add');
                                                                }} className="position-relative">
                                                                    <a><span className="add-icon text-black pe-2 pe-sm-2 pt-1 pt-sm-0">+</span> <span className="add-text ps-4 fw-semibold">Add Discount</span></a>
                                                                </li>
                                                            </ul>
                                                        </nav>
                                                    </div>
                                                }
                                            </>

                                }
                            </div>

                            <div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <label htmlFor="show" className="form-label my-1">Show:</label>
                                        <select name="show" id="show" value={itemsPerPage} className='form-select p-1 px-2' style={{ width: "90px" }} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </div>

                                    <div className="col-12 col-sm-6">
                                        <label htmlFor="search" className="form-label my-1">Search:</label>
                                        <input type="search" name="search" id="search" className="form-control p-1 px-2" style={{ width: "250px" }} onChange={(e) => setSearchCategory(e.target.value)} />
                                    </div>
                                </div>

                                <div className="entries mt-3">
                                    <label className="form-label entries-text mb-1">entries</label>

                                    {content}

                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <p className='entries-amount'>Showing {filteredCategory.length === 0 ? 0 : firstIndex + 1} to {Math.min(lastIndex, filteredCategory.length)} of {filteredCategory.length} entries {isFiltered && `(filtered from ${action === 'category' ? category.length : (action === 'discount' ? discount.length : accounts.length)} total entries)`}</p>
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

            <div className="modal fade" id="categoryModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{isEditingCategory ? "Edit" : "Add"} {action === 'category' ? 'Billing Category' : 'Bank Account'}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <form onSubmit={onSubmitCategory}>
                            <div className="modal-body">
                                {
                                    action === 'category'
                                        ? <>
                                            <label htmlFor="title" className="form-label mb-1">Title <span className="text-danger">*</span></label>
                                            <input type="text" id="title" value={categoryFormData?.title ?? ''} onChange={(e) => setCategoryFormData({ ...categoryFormData, title: e.target.value })} className="form-control" required />

                                            <label htmlFor="status" className="form-label mb-1 mt-2">Status <span className="text-danger">*</span></label>
                                            <select id="status" value={categoryFormData?.status ?? ''} onChange={(e) => setCategoryFormData({ ...categoryFormData, status: e.target.value })} className='form-select'>
                                                <option value="">Choose..</option>
                                                <option value={`${categoryFormData.status === 'Active' ? 'Active' : 'Inactive'}`}>{categoryFormData.status === 'Active' ? 'Active' : 'Inactive'}</option>
                                                <option value={`${categoryFormData.status === 'Active' ? 'Inactive' : 'Active'}`}>{categoryFormData.status === 'Active' ? 'Inactive' : 'Active'}</option>
                                            </select>
                                        </>
                                        : <>
                                            <label htmlFor="accountName" className="form-label mb-1">Account Name <span className="text-danger">*</span></label>
                                            <input type="text" id="accountName" value={categoryFormData?.accountName ?? ''} onChange={(e) => setCategoryFormData({ ...categoryFormData, accountName: e.target.value })} className="form-control" required />

                                            <label htmlFor="accountNo" className="form-label mb-1 mt-2">Account Number <span className="text-danger">*</span></label>
                                            <input type="text" id="accountNo" value={categoryFormData?.accountNo ?? ''} onChange={(e) => setCategoryFormData({ ...categoryFormData, accountNo: e.target.value })} className="form-control" required />

                                            <label htmlFor="bankName" className="form-label mb-1 mt-2">Bank Name <span className="text-danger">*</span></label>
                                            <input type="text" id="bankName" value={categoryFormData?.bankName ?? ''} onChange={(e) => setCategoryFormData({ ...categoryFormData, bankName: e.target.value })} className="form-control" required />
                                        </>
                                }
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">{isEditingCategory ? 'Save Changes' : 'Submit'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ScrollTop />
        </>
    )
}

export default BillingsParams1;