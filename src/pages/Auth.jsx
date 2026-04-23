import { useEffect, useState } from "react";

function Auth() {

    const [show, setShow] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShow(true);
            } else {
                setShow(false);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    function scrollTop() {
        window.scroll(
            {
                top: 0,
                behavior: "smooth"
            }
        )
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
    }

    return (
        <div className="auth-section min-vh-100">
            <div className="container">
                <div className="row justify-content-center page">
                    <div className="col-11 col-lg-6">
                        <div className="text-center">
                            <img src="https://dev.skulsync.com.ng/assets/general/img/skulsync-y.png" alt="" />
                        </div>


                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-11">
                                <div className="form-container">
                                    <h2 className="text-center">Create an Account</h2>
                                    <p className="text-center">Enter your personal details to create account</p>

                                    <form className="form" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-12 col-md-6">
                                                <label htmlFor="f-name" className="form-label">First Name</label>
                                                <input type="text" name="f-name" id="f-name" className={`form-control ${submitted ? "is-valid" : ""}`} required />
                                            </div>

                                            <div className="col-12 col-md-6 mt-3 mt-md-0">
                                                <label htmlFor="l-name" className="form-label">Last Name</label>
                                                <input type="text" name="l-name" id="l-name" className={`form-control ${submitted ? "is-valid" : ""}`} required />
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-12 col-md-7">
                                                <label htmlFor="email" className="form-label">Your Email</label>
                                                <input type="email" name="email" id="email" className={`form-control ${submitted ? "is-valid" : ""}`} required />
                                            </div>

                                            <div className="col-12 col-md-5 mt-3 mt-md-0">
                                                <label htmlFor="number" className="form-label">Phone Number</label>
                                                <input type="number" name="number" id="number" className={`form-control ${submitted ? "is-valid" : ""}`} required placeholder="080XXXXXXXX" />
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-12 col-md-6">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <input type="password" name="password" id="password" className={`form-control ${submitted ? "is-valid" : ""}`} required />
                                            </div>

                                            <div className="col-12 col-md-6 mt-3 mt-md-0">
                                                <label htmlFor="confirm-pass" className="form-label">Confirm Password</label>
                                                <input type="password" name="confirm-pass" id="confirm-pass" className={`form-control ${submitted ? "is-valid" : ""}`} required />
                                            </div>
                                        </div>

                                        <div className="mt-3 d-flex">
                                            <input type="checkbox" id="checkbox" className={`form-check-input ${submitted ? "is-valid" : ""}`} required />
                                            <label htmlFor="checkbox" className="form-check-label ms-2">I agree and accept the <span className="text-primary"><a href="#">terms and conditions</a></span></label>
                                        </div>

                                        <button type="submit" className="btn btn-primary mt-4">Create Account</button>

                                        <p className="ques mt-3">Already have an account? <button className="text-primary ps-0">Sign In</button></p>
                                    </form>
                                </div>

                                <p className="copyright mt-3 mb-4 text-center">&copy; Copyright <span className="sgr">SGR</span> 2026</p>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    show && <button onClick={() => scrollTop()} className="btn btn-sm btn-primary scrollTopBtn">
                        <i className="bi bi-arrow-up"></i>
                    </button>
                }
            </div>
        </div >
    )
}

export default Auth;