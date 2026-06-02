import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useInvoices } from "../context/InvoicesContext";
import ScrollTop from "../components/ScrollTop";

function AddExpenses() {

    const { action } = useParams();
    const navigate = useNavigate();

    const expectedActions = ['add', 'bulk'];
    useEffect(() => {
        if (!expectedActions.includes(action)) {
            navigate('/404');
        }
    }, [action, navigate]);


    const { invoices, setInvoices } = useInvoices();
    const [data, setData] = useState({});

    function handleSubmit(e) {
        e.preventDefault();

        if (action === 'add') {
            const currentData = {
                ...data,
                uniqueId: crypto.randomUUID(),
                id: `IN${Math.floor(Math.random() * 10000) + 1}`
            };
            setInvoices([...invoices, currentData]);
            navigate('/expenses');
        } else {
            navigate('/expenses');
        }
    }

    return (
        <>
            <div className="page">
                <h4 className="page-title">Payments</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container' onClick={() => navigate('/dashboard')}><Link className='page-link' to="/dashboard">Home</Link ><span className="slash">/</span></span>
                    <span className='link-container' onClick={() => navigate('/expenses')}><Link className='page-link' to="/expenses">Expenses</Link ><span className="slash">/</span></span>
                    <span className="current-path" style={{ textTransform: 'capitalize' }}>{action}</span>
                </p>
            </div>

            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-8">
                        <div className="public-container">
                            <h3 className="title-4 mt-3 text-center">Add {action === 'add' ? 'Student' : 'Expense'}</h3>

                            <form className="student-form" onSubmit={(e) => handleSubmit(e)}>

                                {
                                    action === 'add' ?
                                        <>
                                            <div className="row">
                                                <div className="col-12">
                                                    <label htmlFor="title" className="form-label mb-1">Title <span className="text-danger">*</span></label>
                                                    <input type="text" id="title" className="form-control" onChange={(e) => setData({ ...data, title: e.target.value })} required />
                                                </div>
                                                <div className="col-md-6 mt-2">
                                                    <label htmlFor="category" className="form-label mb-1">Category <span className="text-danger">*</span></label>
                                                    <select id="category" className="form-select" onChange={(e) => setData({ ...data, category: e.target.value })} required>
                                                        <option value="">Choose..</option>
                                                        <option value="Speech">Speech</option>
                                                        <option value="CHARGES">CHARGES</option>
                                                        <option value="Registration">Registration</option>
                                                        <option value=''>Choose..</option>
                                                        <option value="PTA">PTA</option>
                                                        <option value="Exam Fee">Exam Fee</option>
                                                        <option value="School Fee">School Fee</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6 mt-2">
                                                    <label htmlFor="amount" className="form-label mb-1">Amount(&#8358;) <span className="text-danger">*</span></label>
                                                    <input type="number" id="amount" className="form-control" onChange={(e) => setData({ ...data, total: e.target.value })} required />
                                                </div>
                                            </div>

                                            <div className="row mt-0 mt-md-2">
                                                <div className='col-md-6 mt-2 mt-md-0'>
                                                    <label htmlFor="date" className="form-label mb-1">Date <span className="text-danger">*</span></label>
                                                    <input type="date" id="date" className="form-control" onChange={(e) => setData({ ...data, date: e.target.value })} required />
                                                </div>
                                                <div className='col-md-6 mt-2 mt-md-0'>
                                                    <label htmlFor="status" className="form-label mb-1">Status <span className="text-danger">*</span></label>
                                                    <select id="status" className="form-select" onChange={(e) => setData({ ...data, status2: e.target.value })} required>
                                                        <option>Choose..</option>
                                                        <option value='Pending'>Pending</option>
                                                        <option value='Processed'>Processed</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <label htmlFor="attachment" className="form-label mb-1 mt-2">Attachment <span className="text-danger">*</span></label>
                                            <input type="file" id="attachment" className="form-control" onChange={(e) => setData({ ...data, attachment: e.target.value })} />

                                            <label htmlFor="note" className="form-label mb-1 mt-2">Note <span className="text-danger">*</span></label>
                                            <textarea id="note" className="form-control" onChange={(e) => setData({ ...data, note: e.target.value })}></textarea>

                                            <div className="row mt-0 mt-md-2">
                                                <div className="col-md-6 mt-2 mt-md-0">
                                                    <label htmlFor="asset" className="form-label mb-1">Asset Account</label>
                                                    <select id="asset" className="form-select" onChange={(e) => setData({ ...data, asset: e.target.value })} required>
                                                        <option value=''>Choose..</option>
                                                        <option value="Jaiz Bank - 0000000001">Jaiz Bank - 0000000001</option>
                                                        <option value="Taj Bank - 0004768813">Taj Bank - 0004768813</option>
                                                        <option value="Zenith Bank - 1012504768">Zenith Bank - 1012504768</option>
                                                    </select>
                                                </div>

                                                <div className="col-md-6 mt-2 mt-md-0">
                                                    <label htmlFor="expense" className="form-label mb-1">Expense Account</label>
                                                    <select id="expense" className="form-select" onChange={(e) => setData({ ...data, expense: e.target.value })} required>
                                                        <option value=''>Select expense account</option>
                                                        <option value="Expense Account - 2000">Expense Account - 2000</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <div className="row">
                                            <div className="col-12">
                                                <label htmlFor="csv" className="form-label mb-1 mt-2">CSV File</label>
                                                <input type="file" id="csv" className="form-control" onChange={(e) => setData({ ...data, csv: e.target.value })} />
                                            </div>
                                            <div className="col-md-6 mt-2">
                                                <label htmlFor="asset" className="form-label mb-1">Asset Account</label>
                                                <select id="asset" className="form-select" onChange={(e) => setData({ ...data, asset: e.target.value })} required>
                                                    <option value=''>Choose..</option>
                                                    <option value="Jaiz Bank - 0000000001">Jaiz Bank - 0000000001</option>
                                                    <option value="Taj Bank - 0004768813">Taj Bank - 0004768813</option>
                                                    <option value="Zenith Bank - 1012504768">Zenith Bank - 1012504768</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 mt-2">
                                                <label htmlFor="expense" className="form-label mb-1">Expense Account</label>
                                                <select id="expense" className="form-select" onChange={(e) => setData({ ...data, expense: e.target.value })} required>
                                                    <option value=''>Select expense account</option>
                                                    <option value="Expense Account - 2000">Expense Account - 2000</option>
                                                </select>
                                            </div>
                                        </div>
                                }

                                <div className="text-center mt-3">
                                    <button type="submit" className="btn btn-primary text-center py-1 me-1">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <ScrollTop />
        </>
    )
}

export default AddExpenses;