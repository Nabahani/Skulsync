import { useParams, Link, useNavigate } from "react-router-dom";
import { useInvoices } from "../context/InvoicesContext";

function PaymentsDetails() {

    const { action, id } = useParams();
    const navigate = useNavigate();
    const { invoices } = useInvoices();
    const currentStudentDetails = invoices.find((student) => student.id === id);

    return (
        <>
            <div className="page">
                <h4 className="page-title">Payments</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container'><Link className='page-link' to="/dashboard">Home</Link ><span className="slash">/</span></span>
                    <span className='link-container'><Link className='page-link' to="/payments">Payments</Link ><span className="slash">/</span></span>
                    <span className="current-path" style={{ textTransform: 'capitalize' }}>{action}</span>
                </p>
            </div>

            <div className="container-fluid pb-4">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="public-container px-3 py-4">

                            <h3 className="title-2 text-center mt-2 mb-1">Payment Details</h3>
                            <div className="row">
                                <div className="col-12">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Student : </span>
                                        <span className="public-input">{currentStudentDetails.student}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Reference : </span>
                                        <span className="public-input">{currentStudentDetails.uniqueId}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Invoice : </span>
                                        <span className="public-input">{currentStudentDetails.id}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Payment Method : </span>
                                        <span className="public-input">{currentStudentDetails.paymentMethod}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Amount : </span>
                                        <span className="public-input">&#8358{currentStudentDetails.total}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Date : </span>
                                        <span className="public-input">{currentStudentDetails.date}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Status : </span>
                                        <span className="public-input">{currentStudentDetails.status2}</span>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Note : </span>
                                        <span className="public-input">Bulk payment (FIFO)</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Created On </span>
                                        <span className="public-input">{currentStudentDetails.date} { }</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Created By </span>
                                        <span className="public-input">yusufabdulrahman5677@gmail.com</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mt-2">
                                <button className="btn btn-info me-3 mt-3 py-1"><i className="bi bi-printer-fill"></i> Print</button>
                                <button className="btn btn-warning ps-3 mt-3 py-1 position-relative" onClick={() => navigate('/payments')}><i className="bi bi-x  small-icon"></i> <span className="ps-3">Cancel</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentsDetails;