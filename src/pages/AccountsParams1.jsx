import { useParams, Link, useNavigate } from "react-router-dom";
import ScrollTop from "../components/ScrollTop";
import { useAccounts } from "../context/AccountsContext";
import { useEffect, useState } from "react";

function AccountsParams1() {

    const { action } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (action !== 'add') {
            navigate('/404');
        }
    }, [action, navigate]);

    const { accounts, setAccounts } = useAccounts();
    const [data, setData] = useState({});

    function handleSubmit(e) {
        e.preventDefault();

        const newAccount = {
            ...data,
            id: accounts.length > 0
                ? Math.max(...accounts.map(item => item.id)) + 1
                : 1,
            currentBal: data.previousBal,
            status: 'Active',
            createdOn: `${(new Date()).getFullYear()}-${String((new Date()).getMonth() + 1).padStart(2, '0')}-${String((new Date()).getDate()).padStart(2, '0')} ` +
                `${String((new Date()).getHours()).padStart(2, '0')}:${String((new Date()).getMinutes()).padStart(2, '0')}:${String((new Date()).getSeconds()).padStart(2, '0')}`,
            createdBy: ''
        }
        setAccounts((prev) => [...prev, newAccount]);
        navigate('/accounts');
    }

    return (
        <>
            <div className="page">
                <h4 className="page-title">Accounts</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container' style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}><a className='page-link'>Home</a><span className="slash">/</span></span>
                    <span className='link-container' style={{ cursor: 'pointer' }} onClick={() => navigate('/accounts')}><Link to='/accounts' className='page-link'>Accounts</Link><span className="slash">/</span></span>
                    <span className="current-path" style={{ textTransform: 'capitalize' }}>Add</span>
                </p>
            </div>

            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-8">
                        <div className="public-container">
                            <h3 className="title-4 mt-3 text-center">Add Account</h3>

                            <form className="student-form" onSubmit={(e) => handleSubmit(e)}>
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="title" className="form-label mb-1">Title <span className="text-danger">*</span></label>
                                        <input type="text" id="title" className="form-control" onChange={(e) => setData({ ...data, title: e.target.value })} required />
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        <label htmlFor="code" className="form-label mb-1">Code <span className="text-danger">*</span></label>
                                        <input type="text" id="code" className="form-control" onChange={(e) => setData({ ...data, code: e.target.value })} required />
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        <label htmlFor="type" className="form-label mb-1">Type <span className="text-danger">*</span></label>
                                        <select id="type" className="form-select" onChange={(e) => setData({ ...data, type: e.target.value })} required >
                                            <option value=''>Choose..</option>
                                            <option value="Income">Income</option>
                                            <option value="Asset">Asset</option>
                                            <option value="Expense">Expense</option>
                                            <option value="Liability">Liability</option>
                                            <option value="Equity">Equity</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row mt-0 mt-md-2">
                                    <div className="col-md-6 mt-2 mt-md-0">
                                        <label htmlFor="previousBal" className="form-label mb-1">Opening Balance (&#8358;) <span className="text-danger">*</span></label>
                                        <input type="number" id="previousBal" className="form-control" onChange={(e) => setData({ ...data, previousBal: e.target.value })} required />
                                    </div>

                                    <div className="col-md-6 mt-2 mt-md-0">
                                        <label htmlFor="parent" className="form-label mb-1">Parent Account (Optional)</label>
                                        <select id="parent" className="form-select" onChange={(e) => setData({ ...data, parent: e.target.value })} >
                                            <option value=''>Choose..</option>
                                            <option value='School Fees Income - Income'>School Fees Income - Income</option>
                                            <option value='Income Account - Income'>Income Account - Income</option>
                                            <option value='Asset Account - Asset'>Asset Account - Asset</option>
                                            <option value='Zenith Bank 1'>Zenith Bank 1</option>
                                            <option value='Zenith Bank 2'>Zenith Bank 2</option>
                                            <option value='Kazeem Fabunmi - Taj Bank - Asset'>Kazeem Fabunmi - Taj Bank - Asset</option>
                                            <option value='Kazeem Fabunm - Opay - Asset'>Kazeem Fabunm - Opay - Asset</option>
                                            <option value='New Standard - Taj Bank - Asset'>New Standard - Taj Bank - Asset</option>
                                            <option value='Expense Account - Expense'>Expense Account - Expense</option>
                                        </select>
                                    </div>
                                </div>

                                <label htmlFor="description" className="form-label mb-1 mt-2">Discription <span className="text-danger">*</span></label>
                                <textarea id="description" className="form-control" onChange={(e) => setData({ ...data, description: e.target.value })} ></textarea>

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

export default AccountsParams1;