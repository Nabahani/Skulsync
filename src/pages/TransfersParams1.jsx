import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ScrollTop from "../components/ScrollTop";
import { useInvoices } from "../context/InvoicesContext";

function TransfersParams1() {

    const { action } = useParams();
    const navigate = useNavigate();

    const expectedActions = ['add', 'export'];
    useEffect(() => {
        if (!expectedActions.includes(action)) {
            navigate('/404');
        }
    }, [action, navigate]);


    const { invoices, setInvoices, currentData, setCurrentData } = useInvoices();
    const [data, setData] = useState({});
    const userDetails = JSON.parse(localStorage.getItem('user-details') || '{}');
    const [randomText] = useState(
        () => Math.random().toString(36).substring(2, 9).toUpperCase()
    );

    function handleSubmit(e) {
        e.preventDefault();

        if (action === 'add') {
            const newData = {
                ...data,
                id: `TRF${randomText}`,
                uniqueId: Math.floor(Math.random() * 1000000000) + 1,
                title: data.sourceAcc,
                status2: 'Successful',
                category: 'Registration',
                createdBy: userDetails.email,
                ApprovedBy: userDetails.email
            };
            setCurrentData(prev => [...prev, newData]);
            navigate('/transfers');
        } else if (action === 'export') {
            alert('Successfully exported');
            navigate('/transfers');
        }
    }

    let content;
    if (action === 'add') {
        content = (
            <>
                <div className="row">
                    <div className="col-md-6 mt-2">
                        <label htmlFor="sourceAcc" className="form-label mb-1">Source Account <span className="text-danger">*</span></label>
                        <select id="sourceAcc" className="form-select" onChange={(e) => setData({ ...data, sourceAcc: e.target.value })} required>
                            <option value="">Select source account</option>
                            <option value="Expense Account - 2000">Expense Account - 2000</option>
                            <option value="New Standard - TajBank - 1500">New Standard - TajBank - 1500</option>
                            <option value="Kazeem Fabumn - Opay - 1400">Kazeem Fabumn - Opay - 1400</option>
                            <option value="Kazeem Fabumn - TajBank - 1300">Kazeem Fabumn - TajBank - 1300</option>
                            <option value="Zenith Bank 2 - 1200">Zenith Bank 2 - 1200</option>
                            <option value="Zenith Bank 1 - 1100">Zenith Bank 1 - 1100</option>
                            <option value="Asset Account - 1000">Asset Account - 1000</option>
                            <option value="Income Acocunt - 4000">Income Acocunt - 4000</option>
                            <option value="School Fees Income - 4100">School Fees Income - 4100</option>
                        </select>
                    </div>
                    <div className="col-md-6 mt-2">
                        <label htmlFor="destinationAcc" className="form-label mb-1">Destination Account <span className="text-danger">*</span></label>
                        <select id="destinationAcc" className="form-select" onChange={(e) => setData({ ...data, destinationAcc: e.target.value })} required>
                            <option value="">Select destination account</option>
                            <option value="Expense Account - 2000">Expense Account - 2000</option>
                            <option value="New Standard - TajBank - 1500">New Standard - TajBank - 1500</option>
                            <option value="Kazeem Fabumn - Opay - 1400">Kazeem Fabumn - Opay - 1400</option>
                            <option value="Kazeem Fabumn - TajBank - 1300">Kazeem Fabumn - TajBank - 1300</option>
                            <option value="Zenith Bank 2 - 1200">Zenith Bank 2 - 1200</option>
                            <option value="Zenith Bank 1 - 1100">Zenith Bank 1 - 1100</option>
                            <option value="Asset Account - 1000">Asset Account - 1000</option>
                            <option value="Income Acocunt - 4000">Income Acocunt - 4000</option>
                            <option value="School Fees Income - 4100">School Fees Income - 4100</option>
                        </select>
                    </div>
                </div>

                <div className="row mt-0 mt-md-2">
                    <div className="col-md-6 mt-2 mt-md-0">
                        <label htmlFor="reference" className="form-label mb-1">Reference <span className="text-danger">*</span></label>
                        <input type="text" id="reference" className="form-control" value={`TRF${randomText}`} onChange={(e) => setData({ ...data, reference: e.target.value })} readOnly />
                    </div>

                    <div className="col-md-6 mt-2 mt-md-0">
                        <label htmlFor="date" className="form-label mb-1">Date <span className="text-danger">*</span></label>
                        <input type="date" id="date" className="form-control" onChange={(e) => setData({ ...data, date: e.target.value })} />
                    </div>
                </div>

                <div className="row mt-0 mt-md-2">
                    <div className="col-md-12 mt-2 mt-md-0">
                        <label htmlFor="total" className="form-label mb-1">Amount <span className="text-danger">*</span></label>
                        <input type="number" id="total" className="form-control" onChange={(e) => setData({ ...data, total: e.target.value })} />
                    </div>

                    <div className="col-md-12 mt-2 mt-md-0">
                        <label htmlFor="remarks" className="form-label mb-1 mt-2">Remarks <span className="text-danger">*</span></label>
                        <textarea id="remarks" className="form-control" onChange={(e) => setData({ ...data, description: e.target.value })}></textarea>
                    </div>
                </div>
            </>
        )
    } else if (action === 'export') {
        content = (
            <>
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="status" className="form-label mb-1">Status <span className="text-danger">*</span></label>
                        <select id="status" className="form-select" required>
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Successful">Successful</option>
                        </select>
                    </div>
                    <div className="col-md-12 mt-2">
                        <label htmlFor="format" className="form-label mb-1">Format <span className="text-danger">*</span></label>
                        <select id="format" className="form-select" required>
                            <option value="PDF">PDF</option>
                            <option value="Excel">Excel</option>
                        </select>
                    </div>
                    <div className="col-md-6 mt-2">
                        <label htmlFor="from" className="form-label mb-1">From Date <span className="text-danger">*</span></label>
                        <input type="date" id="from" className="form-control" required />
                    </div>
                    <div className="col-md-6 mt-2">
                        <label htmlFor="to" className="form-label mb-1">To Date <span className="text-danger">*</span></label>
                        <input type="date" id="to" className="form-control" required />
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="page">
                <h4 className="page-title">Transfers</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container' style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}><a className='page-link'>Home</a><span className="slash">/</span></span>
                    <span className='link-container' style={{ cursor: 'pointer' }} onClick={() => navigate('/transfers')}><a className='page-link'>Transfers</a><span className="slash">/</span></span>
                    <span className="current-path" style={{ textTransform: 'capitalize' }}>{action}</span>
                </p>
            </div>

            <div className="container-fluid pb-4">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-8">
                        <div className="public-container">
                            <h3 className="title-4 mt-3 text-center">{action === 'add' ? 'Add Transfer' : 'Export Transfers'}</h3>

                            <form className="student-form" onSubmit={(e) => handleSubmit(e)}>

                                {content}

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

export default TransfersParams1;