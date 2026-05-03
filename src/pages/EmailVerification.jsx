import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function EmailVerification() {

    const [num, setNum] = useState(7);
    const navigate = useNavigate();

    useEffect(() => {
        if (num === 0) {
            navigate('/dashboard');
        }

        const timer = setTimeout(() => {
            setNum(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [num]);

    return (
        <div className="row justify-content-center align-items-center min-vh-100">
            <div className="col-10 col-md-6 col-xl-4">
                <div className="email-verification text-center">
                    <img className="mb-4" src="https://dev.skulsync.com.ng/assets/general/img/skulsync-x.png" alt="" />

                    <div className="verify-container">
                        <h3 className="mt-3 title">Verify Account</h3>
                        <p>Before you can use Skulpay we need to verify your email. Wait some seconds for verification.</p>
                        <p>If you're facing a problem click on the button below to verify again.</p>

                        <button className="btn mt-2 mb-3 px-3" disabled>Verifying... ({num})</button>
                        <p className="mt-2 mb-0">Back to <Link className="text-decoration-none" to={'/auth'}>Sign In</Link></p>
                    </div>

                    <p className="copyright mt-3 mb-4">&copy; Copyright <span className="sgr">SGR</span> 2026</p>
                </div>
            </div>
        </div>
    )
}

export default EmailVerification;