import { Link } from 'react-router-dom';
import ScrollTop from '../components/ScrollTop';
import Footer from '../components/Footer';

function Dashboard() {

    return (
        <div id="dashboad">
            <div className="page">
                <h4 className="page-title">Dashboard</h4>
                <p className="page-navigations">
                    <span className='link-container'><Link className='page-link' to="/dashboard">Home</Link ><span className="slash">/</span></span>
                    <span className="current-path">Dashboard</span>
                </p>
            </div>

            <div className="container-fluid px-3 pb-4">
                <div className="row gy-4">
                    <div className="col-12 mt-2">
                        <div className="d-md-flex parent-container">
                            <div className="col-12 col-md-3 d-flex justify-content-center">
                                <div className='img-container'>
                                    <img alt="" />
                                </div>
                            </div>

                            <div className="col-12 col-md-9">
                                <div className="me-0 me-lg-5 text-center">
                                    <h4 className="title">New Standard College</h4>
                                    <p className="motto">Knowledge is light</p>
                                    <p className="page-contact">08028787683,08034225605, newstandardcollege@gmail.com.</p>
                                    <p className="page-address">96/97 Gandu New Layout, Gandu Albasa, Kano</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="small-container">
                            <Link className='inner-link' to='/sessions'>
                                <div className="inner-container">
                                    <h5 className="title-text">Session</h5>

                                    <div className="d-flex align-items-center">
                                        <i className='bi bi-calendar-fill'></i>
                                        <div>
                                            <p className="bold-text">2025/2026</p>
                                            <p className="light-text">Second term</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="small-container">
                            <Link className='inner-link' to='/students'>
                                <div className="inner-container">
                                    <h5 className="title-text">Students</h5>

                                    <div className="d-flex align-items-center">
                                        <i className='bi bi-people-fill'></i>
                                        <div>
                                            <p className="bold-text">277</p>
                                            <p className="light-text"><span className="green-text">254</span> Active students</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="small-container">
                            <Link className='inner-link' to='/classes'>
                                <div className="inner-container">
                                    <h5 className="title-text">Classes</h5>

                                    <div className="d-flex align-items-center">
                                        <i className='bi bi-house-door-fill'></i>
                                        <div>
                                            <p className="bold-text">14</p>
                                            <p className="light-text">14 Active Classes</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="small-container">
                            <Link className='inner-link' to='/invoices'>
                                <div className="inner-container">
                                    <h5 className="title-text">Invoices</h5>

                                    <div className="d-flex align-items-center">
                                        <i className='bi bi-file-earmark-fill'></i>
                                        <div>
                                            <p className="bold-text">552</p>
                                            <p className="light-text"><span className="green-text">262</span> Successful Invoice</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="small-container">
                            <Link className='inner-link' to='/payments'>
                                <div className="inner-container">
                                    <h5 className="title-text">Payments</h5>

                                    <div className="d-flex align-items-center">
                                        <i className='bi bi-credit-card-fill'></i>
                                        <div>
                                            <p className="bold-text">460</p>
                                            <p className="light-text"><span className="green-text">454</span> Successful Payments</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="small-container">
                            <Link className='inner-link' to='/expenses'>
                                <div className="inner-container">
                                    <h5 className="title-text">Expenses</h5>

                                    <div className="d-flex align-items-center">
                                        <i className='bi bi-credit-card-2-front-fill'></i>
                                        <div>
                                            <p className="bold-text">24</p>
                                            <p className="light-text"><span className="green-text">0</span> Processed Expenses</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <ScrollTop />
            <Footer />
        </div>
    )
}

export default Dashboard;