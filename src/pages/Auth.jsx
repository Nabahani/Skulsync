import { useState } from "react";
import ScrollTop from "../components/ScrollTop";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Auth() {

    const { signup, login } = useAuth();

    const [mode, setMode] = useState("signup");
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const [resultErrors, setResultErrors] = useState({});
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    function clearInput(field) {
        setResultErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        })
    }

    function onSubmit(data) {
        setSubmitted(true);
        setResultErrors({});

        let result;
        if (mode === "signup") {
            result = signup(data);

            if (result.success) {
                setSubmitted(false);
                setResultErrors({});
                navigate('/email/verify');
                return;
            } else {
                setResultErrors(result.errors);
                return;
            }
        } else {
            result = login(data.loginEmail, data.loginPassword);

            if (result.success) {
                setSubmitted(false);
                setResultErrors({});
                navigate('/dashboard');
                return;
            } else {
                setResultErrors(result.errors);
                return;
            }
        }
    }

    return (
        <div className="auth-section min-vh-100">
            <div className="container">
                <div className="row justify-content-center align-items-center column-container signup-page">
                    <div className="col-11 col-lg-6">
                        <div className="text-center">
                            {
                                mode === "signup" ?
                                    <a className="signup-image" href="#">
                                        <img src="https://dev.skulsync.com.ng/assets/general/img/skulsync-y.png" alt="" />
                                    </a>
                                    :
                                    <a href="#">
                                        <img className="login-image" src="https://dev.skulsync.com.ng/assets/general/img/skulsync-x.png" alt="" />
                                    </a>
                            }
                        </div>


                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-10">
                                <div className={`form-container ${mode === "login" ? "custom-form-container" : ""}`}>
                                    {mode === "signup" ? <h2 className="text-center signup-title">Create an Account</h2> : <h2 className="text-center login-title">Login to Your Account</h2>}
                                    {mode === "signup" ? <p className="text-center">Enter your personal details to create account</p> : <p className="text-center login-subtitle">Enter your username & password to login</p>}

                                    <form className={`form ${mode === "login" ? "custom-form" : ""}`} onSubmit={handleSubmit(onSubmit)}>
                                        {
                                            mode === "signup" ?
                                                <>
                                                    <div className="row">
                                                        <div className="col-12 col-md-6">
                                                            <label htmlFor="f-name" className="form-label signup-label">First Name</label>
                                                            <input type="text" name="f-name" id="f-name" className={`form-control signup-input ${submitted ? "is-valid" : ""}`} {...register("fName")} required />
                                                        </div>

                                                        <div className="col-12 col-md-6 mt-3 mt-md-0">
                                                            <label htmlFor="l-name" className="form-label signup-label">Last Name</label>
                                                            <input type="text" name="l-name" id="l-name" className={`form-control signup-input ${submitted ? "is-valid" : ""}`} {...register("lName")} required />
                                                        </div>
                                                    </div>

                                                    <div className="row mt-3">
                                                        <div className="col-12 col-md-7">
                                                            <label htmlFor="email" className="form-label signup-label">Your Email</label>
                                                            <input type="email" name="email" id="email" className={`form-control signup-input ${submitted ? "is-valid" : ""} ${resultErrors.email ? "is-invalid" : ""}`} {...register("email", { onChange: () => clearInput("email") })} required />
                                                            <p className="text-danger mt-1 mb-0">{resultErrors?.email}</p>
                                                        </div>

                                                        <div className="col-12 col-md-5 mt-3 mt-md-0">
                                                            <label htmlFor="number" className="form-label signup-label">Phone Number</label>
                                                            <input type="number" name="number" id="number" placeholder="80XXXXXXXX" className={`form-control signup-input ${submitted ? "is-valid" : ""} ${resultErrors.phone ? "is-invalid" : ""}`} {...register("phone", { maxLength: { value: 10, message: "Phone number must be 10" }, minLength: { value: 10, message: "Phone number must be 10" }, onChange: () => clearInput("phone") })} required />
                                                            <p className="text-danger mt-1 mb-0">{errors.phone?.message || resultErrors?.phone}</p>
                                                        </div>
                                                    </div>

                                                    <div className="row mt-3">
                                                        <div className="col-12 col-md-6">
                                                            <label htmlFor="password" className="form-label signup-label">Password</label>
                                                            <input type="password" name="password" id="password" className={`form-control signup-input ${submitted ? "is-valid" : ""} ${resultErrors.password ? "is-invalid" : ""}`} {...register("password", { minLength: { value: 8, message: "The password field must be at least 8 characters" }, onChange: () => clearInput("password") })} required />
                                                            <p className="text-danger mt-1 mb-0">{errors.password?.message || resultErrors?.password}</p>
                                                        </div>

                                                        <div className="col-12 col-md-6 mt-3 mt-md-0">
                                                            <label htmlFor="confirm-pass" className="form-label signup-label">Confirm Password</label>
                                                            <input type="password" name="confirm-pass" id="confirm-pass" className={`form-control signup-input ${submitted ? "is-valid" : ""}`} {...register("confirmPass")} required />
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className="custom-labels">
                                                        <label htmlFor="email" className="form-label">Email</label>
                                                        <div className="input-group">
                                                            <span className="input-group-text px-md-3">
                                                                <i className="bi bi-person-fill"></i>
                                                            </span>

                                                            <input type="email" id="email" className="form-control" placeholder="Email" {...register("loginEmail")} required />
                                                        </div>
                                                        <p className="text-danger mt-1 mb-0">{resultErrors?.error}</p>
                                                    </div>

                                                    <div className="custom-labels mt-3">
                                                        <label htmlFor="password" className="form-label">Password</label>
                                                        <div className="input-group">
                                                            <span className="input-group-text px-md-3">
                                                                <i className="bi bi-lock-fill"></i>
                                                            </span>

                                                            <input type="password" id="password" className="form-control" placeholder="Password" {...register("loginPassword")} required />
                                                        </div>
                                                    </div>
                                                </>
                                        }

                                        <div className="mt-3 d-flex">
                                            {
                                                mode === "signup" ?
                                                    <>
                                                        <input type="checkbox" id="checkbox" className={`form-check-input ${submitted ? "is-valid" : ""}`} required />
                                                        <label htmlFor="checkbox" className="form-check-label ms-2">I agree and accept the <span className="text-primary"><a href="#">terms and conditions</a></span></label>
                                                    </>
                                                    :
                                                    <>
                                                        <input type="checkbox" id="checkbox" className="form-check-input" />
                                                        <label htmlFor="checkbox" className="form-check-label ms-2 labelEL">Remember me</label>
                                                    </>
                                            }
                                        </div>

                                        <button type="submit" className={`btn btn-primary mt-3 ${mode === "login" ? "mb-4" : ""}`}>{mode === "signup" ? "Create Account" : "Sign In"}</button>

                                        {mode === "signup" ? <p className="ques mt-3">Already have an account? <button onClick={() => setMode("login")} className="text-primary ps-0">Sign In</button></p> : ""}
                                    </form>
                                </div>

                                <p className="copyright mt-3 mb-4 text-center">&copy; Copyright <span className="sgr">SGR</span> 2026</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ScrollTop />
        </div >
    )
}

export default Auth;