import { useParams, Link, useNavigate } from "react-router-dom";
import { useInvoices } from "../context/InvoicesContext";
import { useEffect } from "react";
import ScrollTop from "../components/ScrollTop";

function ExpensesDetails() {

    const { action, id } = useParams();
    const navigate = useNavigate();
    const expectedActions = ['edit', 'view'];

    useEffect(() => {
        if (!expectedActions.includes(action)) {
            navigate('/404');
        }
    }, [action, navigate]);

    const { invoices, setInvoices } = useInvoices();
    const currentStudentDetails = invoices.find((student) => student.id === id);

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

            <div className="container-fluid pb-4">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-10 col-lg-8">
                        <div className="public-container px-3 py-4">

                            <div className="text-center">
                                <h3 className="title-2 text-center mt-2 mb-1">
                                    <i className="bi bi-credit-card-2-front-fill"></i>
                                </h3>
                                <h3 className="title-2 text-center mt-2 mb-1">Expense Details</h3>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Title : </span>
                                        <span className="public-input">{currentStudentDetails?.title ?? ''}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Reference : </span>
                                        <span className="public-input">{currentStudentDetails?.uniqueId ?? ''}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Category : </span>
                                        <span className="public-input">{currentStudentDetails?.category ?? ''}</span>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Amount : </span>
                                        <span className="public-input">&#8358;{currentStudentDetails?.total ?? String(currentStudentDetails?.amount).toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Date : </span>
                                        <span className="public-input">{currentStudentDetails?.date ?? ''}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Status : </span>
                                        <span className="public-input">{currentStudentDetails?.status2 ?? ''}</span>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Note : </span>
                                        <span className="public-input"></span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Created On </span>
                                        <span className="public-input">{currentStudentDetails?.date ?? ''}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Created By </span>
                                        <span className="public-input">yusufabdulrahman5677@gmail.com</span>
                                    </div>
                                </div>
                            </div>

                            <hr className="mb-2" />

                            <div className="text-center">
                                <button className="btn btn-primary me-2 mt-2 py-1">Edit</button>
                                <button className="btn btn-success me-2 mt-2 py-1" onClick={() => {
                                    setInvoices((prev) =>
                                        prev.map((item) =>
                                            item.id === id ? { ...prev, status2: 'Successful' } : item)
                                    );
                                    navigate('/expenses');
                                }}>Approve</button>
                                <button className="btn btn-secondary mt-2 py-1" onClick={() => navigate('/expenses')}>Reject</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ScrollTop />
        </>
    )
}

export default ExpensesDetails;