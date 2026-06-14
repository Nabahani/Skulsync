import { Link, useNavigate, useParams } from "react-router-dom";
import { useInvoices } from "../context/InvoicesContext";
import { useState, useEffect } from "react";
import ScrollTop from "../components/ScrollTop";

function TransfersParams2() {

    const { action, id } = useParams();
    const navigate = useNavigate();
    const { currentData } = useInvoices();

    useEffect(() => {
        if (action !== 'view') {
            navigate('/404');
        }

        if (action === 'view' && !currentData.some((data) => data.id === id)) {
            navigate('/404');
        }
    }, [action, id, navigate]);

    const userDetails = JSON.parse(localStorage.getItem('user-details') || '{}');
    const currentDataDetails = currentData.find((data) => data.id === id);
    const [add, setAdd] = useState(false);

    return (
        <>
            <div className="page">
                <h4 className="page-title">Transfers</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container'><Link className='page-link' to="/dashboard">Home</Link >
                        <span className="slash">/</span><Link className='page-link' to="/transfers">Transfers</Link ><span className="slash">/</span></span>
                    <span className="current-path"><span style={{ textTransform: 'capitalize' }}>{action}</span></span>
                </p>
            </div>

            <div className="container-fluid pb-4">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-9 col-md-10 col-lg-8">
                        <div className="public-container px-3 py-4">

                            <div className="d-flex justify-content-between align-items-center relative-container">
                                <h3 className="title-2 mt-2 text-center">Transfer Details</h3>

                                <button type='button' className='actions bg-white' onClick={() => setAdd(prev => !prev)}>
                                    <i className="bi bi-three-dots-vertical"></i>
                                </button>

                                {
                                    add && <div className="add-student-container">
                                        <nav>
                                            <ul>
                                                <li onClick={() => {
                                                    navigate('/transfers');
                                                }} className="position-relative">
                                                    <Link><span className="add-icon text-info">+</span> <span className="add-text ps-4 fw-semibold">All Transfer</span></Link>
                                                </li>
                                                <li onClick={() => {
                                                    navigate('/transfers/add');
                                                }} className="position-relative">
                                                    <Link><span className="add-icon text-info">+</span> <span className="add-text ps-4 fw-semibold">New Transfers</span></Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                }
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Source : </span>
                                        <span className="public-input">{currentDataDetails?.title ?? ''}</span>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Destination : </span>
                                        <span className="public-input">{currentDataDetails?.title ?? ''}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Reference : </span>
                                        <span className="public-input">{currentDataDetails?.reference ?? currentDataDetails?.id}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Amount : </span>
                                        <span className="public-input">&#8358;{Number((currentDataDetails?.total ?? '').replace(/,/g, '')).toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Date : </span>
                                        <span className="public-input">{currentDataDetails?.date ?? ''}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Status : </span>
                                        <span className="public-input">{currentDataDetails?.status2 ?? ''}</span>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Remarks : </span>
                                        <span className="public-input">{currentDataDetails?.description ?? ''}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Created On : </span>
                                        <span className="public-input">{currentDataDetails?.date ?? ''}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Created By : </span>
                                        <span className="public-input">{userDetails?.email ?? ''}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Approved On </span>
                                        <span className="public-input">{currentDataDetails?.date ?? ''}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="public-border public-bg mt-3">
                                        <span className="public-label">Approved By </span>
                                        <span className="public-input">{userDetails?.email ?? ''}</span>
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

export default TransfersParams2;