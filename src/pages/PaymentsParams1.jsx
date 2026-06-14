import { useParams, Link, useNavigate } from "react-router-dom";
import ScrollTop from "../components/ScrollTop";
import { useInvoices } from "../context/InvoicesContext";
import { useEffect, useState } from "react";
import { useStudent } from "../context/StudentContext";
import SearchableSelect from "../components/SearchableSelect";

function PaymentsParams1() {

    const { action } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (action !== 'add') {
            navigate('/404');
        }
    }, [action, navigate]);

    const { invoices, setInvoices } = useInvoices();
    const { studentsData } = useStudent();
    const [data, setData] = useState({});
    const titles = [
        'Registration Form - N15,000.00',
        'Speech & Prize - N5,000.00',
        'Secondary School Fee - N80,000.00',
        'Primary School Fee - N70,000.00',
        'Nursery School Fee - N55,000.00',
        'Exam - N2,500.00',
        'PTA - N1,000.00',
    ];
    const classes = [
        "Pre-Nursery",
        "Nursery 1",
        "Nursery 2",
        "Primary 1",
        "Primary 2",
        "Primary 3",
        "Primary 4",
        "Primary 5",
        "Primary 6",
        "JSS 1",
        "JSS 2",
        "JSS 3",
        "SS 1",
        "SS 2",
        "SS 3"
    ];

    function handleSubmit(e) {
        e.preventDefault();

        const now = new Date();
        console.log(data);
        const newPayment = {
            title: titles[Math.floor(Math.random() * titles.length) + 1],
            id: `IN${Math.floor(Math.random() * 9999999) + 1}`,
            quantity: Math.floor(Math.random() * 8) + 1,
            uniqueId: crypto.randomUUID(),
            student: `${data.fName} ${data.mName} ${data.lName}`,
            regno: data.regno,
            class: classes[Math.floor(Math.random() * 15)],
            paymentMethod: data.paymentMethod,
            account: data.assetAcc,
            category: 'Registration',
            total: data.amount,
            session: `${now.getFullYear() - 1}/${now.getFullYear()}`,
            term: 'Second term',
            status1: 'Paid',
            status2: 'Successful',
            date: data.date,
            incomeAcc: data.incomeAcc,
            payer: data.payer
        }

        setInvoices([...invoices, newPayment]);
        navigate('/payments');
    }

    return (
        <>
            <div className="page">
                <h4 className="page-title">Payments</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container' style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}><a className='page-link'>Home</a><span className="slash">/</span></span>
                    <span className='link-container' style={{ cursor: 'pointer' }} onClick={() => navigate('/payments')}><Link to='/payments' className='page-link'>Payments</Link><span className="slash">/</span></span>
                    <span className="current-path" style={{ textTransform: 'capitalize' }}>New Payment</span>
                </p>
            </div>

            <div className="container-fluid pb-4">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-8">
                        <div className="public-container">
                            <h3 className="title-4 mt-3 text-center">Record New Payment</h3>

                            <form className="student-form" onSubmit={(e) => handleSubmit(e)}>
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="student" className="form-label labelEL mb-1">Student <span className="text-danger">*</span></label>
                                        <SearchableSelect registration={studentsData} id={2} setData={setData} data={data} />
                                    </div>

                                    <div className="col-md-12 mt-2">
                                        <label htmlFor="payer" className="form-label mb-1">Payer <span className="text-danger">*</span></label>
                                        <input type="text" id="payer" className="form-control" onChange={(e) => setData({ ...data, payer: e.target.value })} placeholder="Parent Name" required />
                                    </div>

                                    <div className="col-md-6 mt-2">
                                        <label htmlFor="payableAmount" className="form-label mb-1">Amount Payable(Balance) <span className="text-danger">*</span></label>
                                        <input type="number" id="payableAmount" value={0} className="form-control" readOnly />
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        <label htmlFor="amount" className="form-label mb-1">Amount <span className="text-danger">*</span></label>
                                        <input type="number" id="amount" className="form-control" onChange={(e) => setData({ ...data, amount: Number(e.target.value) })} required />
                                    </div>

                                    <div className="col-md-6 mt-2">
                                        <label htmlFor="paymentMethod" className="form-label mb-1">Payment Method <span className="text-danger">*</span></label>
                                        <select id="paymentMethod" className="form-select" onChange={(e) => setData({ ...data, paymentMethod: e.target.value })} required >
                                            <option value=''>Choose..</option>
                                            <option value='Cash'>Cash</option>
                                            <option value='Transfer'>Transfer</option>
                                            <option value='Cash & Transfer'>Cash & Transfer</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        <label htmlFor="date" className="form-label mb-1">Date <span className="text-danger">*</span></label>
                                        <input type="date" id="date" className="form-control" onChange={(e) => setData({ ...data, date: e.target.value })} required />
                                    </div>

                                    <div className="col-md-6 mt-2">
                                        <label htmlFor="assetAcc" className="form-label mb-1">Asset Account</label>
                                        <select id="assetAcc" className="form-select" onChange={(e) => setData({ ...data, assetAcc: e.target.value })} >
                                            <option value=''>Select asset account</option>
                                            <option value='New Standard - Taj Bank - 1500'>New Standard - Taj Bank - 1500</option>
                                            <option value='Kazeem Fabunm - Opay - 1400'>Kazeem Fabunm - Opay - 1400</option>
                                            <option value='Kazeem Fabunmi - Taj Bank - 1300'>Kazeem Fabunmi - Taj Bank - 1300</option>
                                            <option value='Zenith Bank 2 - 1200'>Zenith Bank 2 - 1200</option>
                                            <option value='Zenith Bank 1 - 1100'>Zenith Bank 1 - 1100</option>
                                            <option value='Asset Account - 1000'>Asset Account - 1000</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        <label htmlFor="incomeAcc" className="form-label mb-1">Income Account</label>
                                        <select id="incomeAcc" className="form-select" onChange={(e) => setData({ ...data, incomeAcc: e.target.value })} >
                                            <option value=''>Select income account</option>
                                            <option value='Income Account - 4000'>Income Account - 4000</option>
                                            <option value='School Fees Income - 4100'>School Fees Income - 4100</option>
                                        </select>
                                    </div>
                                </div>

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

export default PaymentsParams1;