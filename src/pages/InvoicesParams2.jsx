import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStudent } from "../context/StudentContext";
import SearchableSelect from "../components/SearchableSelect";
import { useInvoices } from "../context/InvoicesContext";
import ScrollTop from "../components/ScrollTop";

function InvoicesParams2() {

    const { action } = useParams();
    const navigate = useNavigate();

    const expectedParams = ['single', 'bulk', 'print-bulk-form', 'invoices_status', 'getpass'];
    useEffect(() => {
        if (!expectedParams.includes(action)) {
            navigate('/404');
        }
    }, [action, expectedParams, navigate]);

    const { studentsData } = useStudent();
    const { invoices, setInvoices, registration, setRegistration } = useInvoices();
    const [data, setData] = useState({});
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();

        if (action === 'single') {
            const currentData = {
                uniqueId: crypto.randomUUID(),
                id: `IN${Math.floor(Math.random() * 1000000) + 1}`,
                student: `${data.fName} ${data.mName} ${data.lName} `,
                regno: data.regno,
                class: data.class,
                category: data.category,
                price: data.price,
                total: data.totalAmount,
                totalAmount: data.totalAmount,
                session: data.session,
                term: data.term,
                status1: "Paid",
                status2: "Successful",
                paymentMethod: data.paymentMethod,
                account: data.bankAccount,
                title: data.title,
                date: `${new Date().getFullYear()}-${new Date().getMonth() + 1} ${new Date().getDate()}`,
                quantity: quantity
            }

            setInvoices([...invoices, currentData]);
        } else if (action === 'print-bulk-form') {
            alert('Successfully printed invoices');
        } else if (action === 'invoices_status') {
            alert('Invoices successfully found');
        } else if (action === 'getpass') {
            alert('Successfully generated get pass');
        }
        navigate('/invoices');
    }

    return (
        <>
            <div className="page">
                <h4 className="page-title">Invoices</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container'><Link className='page-link' to="/dashboard">Home</Link ><span className="slash">/</span></span>
                    <span className='link-container'><Link className='page-link' to="/invoices">Invoices</Link ><span className="slash">/</span></span>
                    <span className="current-path"><span style={{ textTransform: 'capitalize' }}></span> {action === 'print-bulk-form' ? 'Print Bulk' : action === 'invoices_status' ? 'Check Invoices' : action === 'getpass' ? 'Get Pass' : 'Generate'}</span>
                </p>
            </div>

            <div className="container-fluid px-3 pb-4">
                <form onSubmit={(e) => handleSubmit(e)}>
                    {
                        action !== 'print-bulk-form'
                            ? action === 'invoices_status'
                                ? <>
                                    <div className="public-container px-3 py-4">
                                        <h3 className="title-2 text-center mt-2 mb-3">Check Students Invoice</h3>

                                        <div className="row mt-md-2">
                                            <div className='col-md-6 mt-2 mt-md-0'>
                                                <label htmlFor="class" className="form-label labelEL mb-1">Class <span className="text-danger">*</span></label>
                                                <select id="class" className="form-select" required>
                                                    <option value=''>Choose..</option>
                                                    <option value="SS 3">SS 3</option>
                                                    <option value="SS 2">SS 2</option>
                                                    <option value="SS 1">SS 1</option>
                                                    <option value="Jss 3">Jss 3</option>
                                                    <option value="Jss 2">Jss 2</option>
                                                    <option value="Jss 1">Jss 1</option>
                                                    <option value="Primary 5">Primary 5</option>
                                                    <option value="Primary 4">Primary 4</option>
                                                    <option value="Primary 3">Primary 3</option>
                                                    <option value="Primary 2">Primary 2</option>
                                                    <option value="Primary 1">Primary 1</option>
                                                    <option value="Nursery 2">Nursery 2</option>
                                                    <option value="Nursery 1">Nursery 1</option>
                                                    <option value="Pre Nursery">Pre Nursery</option>
                                                </select>
                                            </div>

                                            <div className='col-md-6 mt-2 mt-md-0'>
                                                <label htmlFor="session" className="form-label labelEL mb-1">Session <span className="text-danger">*</span></label>
                                                <select id="session" className="form-select" required>
                                                    <option value=''>Choose..</option>
                                                    <option value="2024/2025">2024/2025</option>
                                                    <option value="2025/2026">2025/2026</option>
                                                </select>
                                            </div>

                                            <div className='col-md-4 mt-2'>
                                                <label htmlFor="term" className="form-label labelEL mb-1">Term <span className="text-danger">*</span></label>
                                                <select id="term" className="form-select" required>
                                                    <option value=''>Choose..</option>
                                                    <option value="First term">First term</option>
                                                    <option value="Second term">Second term</option>
                                                    <option value="Third term">Third term</option>
                                                </select>
                                            </div>

                                            <div className='col-md-4 mt-2'>
                                                <label htmlFor="category" className="form-label labelEL mb-1">Category <span className="text-danger">*</span></label>
                                                <select id="category" className="form-select" required>
                                                    <option value="All">All</option>
                                                    <option value="Speech">Speech</option>
                                                    <option value="CHARGES">CHARGES</option>
                                                    <option value="Registration">Registration</option>
                                                    <option value="PTA">PTA</option>
                                                    <option value="Exam Fee">Exam Fee</option>
                                                    <option value="School Fee">School Fee</option>
                                                </select>
                                            </div>

                                            <div className='col-md-4 mt-2'>
                                                <label htmlFor="paymentStatus" className="form-label labelEL mb-1">Payment Status <span className="text-danger">*</span></label>
                                                <select id="paymentStatus" className="form-select" required>
                                                    <option value="All">All</option>
                                                    <option value="Paid">Paid</option>
                                                    <option value="Partially Paid">Partially Paid</option>
                                                    <option value="Unpaid">Unpaid</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary mt-4 py-1">Submit</button>
                                        </div>
                                    </div>

                                    <p className="text-center mb-0 mt-4 text-muted">No inovices found. Please filter and submit the form.</p>
                                </>
                                : action === 'getpass'
                                    ? <>
                                        <div className="public-container px-3 py-4">
                                            <h3 className="title-2 text-center mt-2 mb-3">Generate Get Pass</h3>

                                            <div className="row mt-md-2">
                                                <div className='col-md-6 mt-2 mt-md-0'>
                                                    <label htmlFor="class" className="form-label labelEL mb-1">Class <span className="text-danger">*</span></label>
                                                    <select id="class" className="form-select" required>
                                                        <option value=''>Choose..</option>
                                                        <option value="SS 3">SS 3</option>
                                                        <option value="SS 2">SS 2</option>
                                                        <option value="SS 1">SS 1</option>
                                                        <option value="Jss 3">Jss 3</option>
                                                        <option value="Jss 2">Jss 2</option>
                                                        <option value="Jss 1">Jss 1</option>
                                                        <option value="Primary 5">Primary 5</option>
                                                        <option value="Primary 4">Primary 4</option>
                                                        <option value="Primary 3">Primary 3</option>
                                                        <option value="Primary 2">Primary 2</option>
                                                        <option value="Primary 1">Primary 1</option>
                                                        <option value="Nursery 2">Nursery 2</option>
                                                        <option value="Nursery 1">Nursery 1</option>
                                                        <option value="Pre Nursery">Pre Nursery</option>
                                                    </select>
                                                </div>

                                                <div className='col-md-6 mt-2 mt-md-0'>
                                                    <label htmlFor="session" className="form-label labelEL mb-1">Session <span className="text-danger">*</span></label>
                                                    <select id="session" className="form-select" required>
                                                        <option value=''>Choose..</option>
                                                        <option value="2024/2025">2024/2025</option>
                                                        <option value="2025/2026">2025/2026</option>
                                                    </select>
                                                </div>

                                                <div className='col-md-4 mt-2'>
                                                    <label htmlFor="term" className="form-label labelEL mb-1">Term <span className="text-danger">*</span></label>
                                                    <select id="term" className="form-select" required>
                                                        <option value=''>Choose..</option>
                                                        <option value="First term">First term</option>
                                                        <option value="Second term">Second term</option>
                                                        <option value="Third term">Third term</option>
                                                    </select>
                                                </div>

                                                <div className='col-md-4 mt-2'>
                                                    <label htmlFor="category" className="form-label labelEL mb-1">Category <span className="text-danger">*</span></label>
                                                    <select id="category" className="form-select" required>
                                                        <option value="All">All</option>
                                                        <option value="Speech">Speech</option>
                                                        <option value="CHARGES">CHARGES</option>
                                                        <option value="Registration">Registration</option>
                                                        <option value="PTA">PTA</option>
                                                        <option value="Exam Fee">Exam Fee</option>
                                                        <option value="School Fee">School Fee</option>
                                                    </select>
                                                </div>

                                                <div className='col-md-4 mt-2'>
                                                    <label htmlFor="paymentStatus" className="form-label labelEL mb-1">Payment Status <span className="text-danger">*</span></label>
                                                    <select id="paymentStatus" className="form-select" required>
                                                        <option value="All">All</option>
                                                        <option value="Paid">Paid</option>
                                                        <option value="Partially Paid">Partially Paid</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary mt-4 py-1">Submit</button>
                                            </div>
                                        </div>

                                        <p className="text-center mb-0 mt-4 text-muted">No inovices found. Please filter and submit the form.</p>
                                    </>
                                    : <>
                                        <div className="public-container px-3 py-4">
                                            <h3 className="title-2 text-center mt-2 mb-3">{action === 'single' ? 'Generate A Single Invoice' : 'Generate Bulk Invoice'}</h3>

                                            <div className="row mt-md-2">
                                                <div className={`${action === 'single' ? 'col-md-6' : 'col-md-8'} mt-2 mt-md-0`}>
                                                    <label htmlFor="title" className="form-label labelEL mb-1">Title <span className="text-danger">*</span></label>
                                                    <input type="text" id="title" className="form-control" onChange={(e) => setData({ ...data, title: e.target.value })} required />
                                                </div>
                                                <div className={`${action === 'single' ? 'col-md-6' : 'col-md-4'} mt-2 mt-md-0`}>
                                                    <label htmlFor="student" className="form-label labelEL mb-1">{action === 'single' ? 'Student' : 'Class'} <span className="text-danger">*</span></label>
                                                    {
                                                        action === 'single' ?
                                                            <SearchableSelect registration={studentsData} id={2} setData={setData} data={data} />
                                                            :
                                                            <select id="class" className="form-select" value={data.class || ''} onChange={(e) => setData({ ...data, class: e.target.value })} required>
                                                                <option value=''>Choose..</option>
                                                                <option value="SS 3">SS 3</option>
                                                                <option value="SS 2">SS 2</option>
                                                                <option value="SS 1">SS 1</option>
                                                                <option value="Jss 3">Jss 3</option>
                                                                <option value="Jss 2">Jss 2</option>
                                                                <option value="Jss 1">Jss 1</option>
                                                                <option value="Primary 5">Primary 5</option>
                                                                <option value="Primary 4">Primary 4</option>
                                                                <option value="Primary 3">Primary 3</option>
                                                                <option value="Primary 2">Primary 2</option>
                                                                <option value="Primary 1">Primary 1</option>
                                                                <option value="Nursery 2">Nursery 2</option>
                                                                <option value="Nursery 1">Nursery 1</option>
                                                                <option value="Pre Nursery">Pre Nursery</option>
                                                            </select>
                                                    }
                                                </div>
                                            </div>

                                            <div className="row mt-md-2">
                                                {
                                                    action === 'single' ?
                                                        <div className="col-md-3 mt-2 mt-md-0">
                                                            <label htmlFor="class" className="form-label labelEL mb-1">Class <span className="text-danger">*</span></label>
                                                            <select id="class" className="form-select" value={data.class || ''} onChange={(e) => setData({ ...data, class: e.target.value })} required>
                                                                <option value='' disabled>Choose..</option>
                                                                <option value="SS 3">SS 3</option>
                                                                <option value="SS 2">SS 2</option>
                                                                <option value="SS 1">SS 1</option>
                                                                <option value="Jss 3">Jss 3</option>
                                                                <option value="Jss 2">Jss 2</option>
                                                                <option value="Jss 1">Jss 1</option>
                                                                <option value="Primary 5">Primary 5</option>
                                                                <option value="Primary 4">Primary 4</option>
                                                                <option value="Primary 3">Primary 3</option>
                                                                <option value="Primary 2">Primary 2</option>
                                                                <option value="Primary 1">Primary 1</option>
                                                                <option value="Nursery 2">Nursery 2</option>
                                                                <option value="Nursery 1">Nursery 1</option>
                                                                <option value="Pre Nursery">Pre Nursery</option>
                                                            </select>
                                                        </div>
                                                        :
                                                        ''
                                                }

                                                <div className={`${action === 'single' ? 'col-md-3' : 'col-md-4'} mt-2 mt-md-0`}><label htmlFor="session" className="form-label labelEL mb-1">Session <span className="text-danger">*</span></label>
                                                    <select id="session" className="form-select" value={data.session || ''} onChange={(e) => setData({ ...data, session: e.target.value })} required>
                                                        <option value='' disabled>Choose..</option>
                                                        <option value="2025/2026">2025/2026</option>
                                                        <option value="2024/2025">2024/2025</option>
                                                        <option value="2025/2026">2025/2026</option>
                                                    </select>
                                                </div>

                                                <div className={`${action === 'single' ? 'col-md-3' : 'col-md-4'} mt-2 mt-md-0`}><label htmlFor="term" className="form-label labelEL mb-1">Term <span className="text-danger">*</span></label>
                                                    <select id="term" className="form-select" value={data.term || ''} onChange={(e) => setData({ ...data, term: e.target.value })} required>
                                                        <option value=''>Choose..</option>
                                                        <option value="First term">First term</option>
                                                        <option value="Second term">Second term</option>
                                                        <option value="Third term">Third term</option>
                                                    </select>
                                                </div>

                                                <div className={`${action === 'single' ? 'col-md-3' : 'col-md-4'} mt-2 mt-md-0`}><label htmlFor="category" className="form-label labelEL mb-1">Category <span className="text-danger">*</span></label>
                                                    <select id="category" className="form-select" value={data.category || ''} onChange={(e) => setData({ ...data, category: e.target.value })} required>
                                                        <option value=''>Choose..</option>
                                                        <option value="Speech">Speech</option>
                                                        <option value="CHARGES">CHARGES</option>
                                                        <option value="Registration">Registration</option>
                                                        <option value="PTA">PTA</option>
                                                        <option value="Exam Fee">Exam Fee</option>
                                                        <option value="School Fee">School Fee</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="public-container px-3 py-4 mt-4">
                                            <h3 className="title-2 text-center mt-2 mb-3">Invoice Items</h3>

                                            <div className="row mt-md-2 align-items-center">
                                                <div className="col-md-5 mt-2 mt-md-0">
                                                    <label htmlFor="invoice-item" className="form-label labelEL mb-1">Invoice Item</label>
                                                    <SearchableSelect registration={registration} id={1} setData={setData} data={data} />
                                                </div>
                                                <div className="col-md-2 mt-2 mt-md-0">
                                                    <label htmlFor="price" className="form-label labelEL mb-1">Price (&#8358;)</label>
                                                    <input type="number" id="price" value={data.amount ? Number(data.amount.replace(',', '')) : 0} onChange={(e) => setData({ ...data, price: e.target.value })} className="form-control" disabled />
                                                </div>
                                                <div className="col-md-2 mt-2 mt-md-0">
                                                    <label htmlFor="quantity" className="form-label labelEL mb-1">Quantity</label>
                                                    <input type="number" id="quantity" min={1} value={quantity} onChange={(e) => {
                                                        setQuantity(e.target.value);
                                                        setData({ ...data, totalAmount: Number(data.amount.replace(',', '')) * e.target.value })
                                                    }} className="form-control" required />
                                                </div>
                                                <div className="col-md-2 mt-2 mt-md-0">
                                                    <label htmlFor="total" className="form-label labelEL mb-1">Total (&#8358;)</label>
                                                    <input type="number" id="total" value={data.amount ? (Number(data.amount.replace(',', '')) * quantity) : ''} className="form-control" disabled />
                                                </div>
                                                <div className="col-md-1 mt-2 mt-md-0">
                                                    <label htmlFor=""></label>
                                                    <button type='button' className='btn btn-primary btn-lg add-button mt-2 d-block'><span className="plus-icon unique">+</span></button>
                                                </div>
                                            </div>

                                            <hr className="my-4" />

                                            <div className="container">
                                                <div className="row" style={{ height: '40px' }}>
                                                    <div className="col border border-end-0 d-flex align-items-center">
                                                        <div className="small-black-text">
                                                            Item
                                                        </div>
                                                    </div>
                                                    <div className="col border border-end-0 d-flex align-items-center">
                                                        <div className="small-black-text">
                                                            Price (&#8358;)
                                                        </div>
                                                    </div>
                                                    <div className="col border border-end-0 d-flex align-items-center">
                                                        <div className="small-black-text">
                                                            Qty
                                                        </div>
                                                    </div>
                                                    <div className="col border border-end-0 d-flex align-items-center">
                                                        <div className="small-black-text">
                                                            Total (&#8358;)
                                                        </div>
                                                    </div>
                                                    <div className="col border d-flex align-items-center">
                                                        <div className="small-black-text">
                                                            Action
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mt-md-3">
                                                <div className={`${action === 'single' ? 'col-md-3' : 'col-md-4'} mt-3 mt-md-0`}>
                                                    <label htmlFor="subtotal" className="form-label labelEL mb-1">Subtotal (&#8358;)</label>
                                                    <input type="number" id="subtotal" value={0} className="form-control" disabled />
                                                </div>
                                                <div className={`${action === 'single' ? 'col-md-3' : 'col-md-4'} mt-2 mt-md-0`}>
                                                    <label htmlFor="total" className="form-label labelEL mb-1">Total (&#8358;)</label>
                                                    <input type="number" id="total" value={0} className="form-control" disabled />
                                                </div>
                                                <div className={`${action === 'single' ? 'col-md-3' : 'col-md-4'} mt-2 mt-md-0`}>
                                                    <label htmlFor="payment-method" className="form-label labelEL mb-1">Payment Method</label>
                                                    <select id="payment-method" className="form-select" value={data.paymentMethod || ''} onChange={(e) => setData({ ...data, paymentMethod: e.target.value })} required>
                                                        <option value='' disabled>Choose..</option>
                                                        <option value="Cash">Cash</option>
                                                        <option value="Transfer">Transfer</option>
                                                    </select>
                                                </div>
                                                {
                                                    action === 'single' ?
                                                        <div className="col-md-3 mt-2 mt-md-0">
                                                            <label htmlFor="bank-account" className="form-label labelEL mb-1">Bank Account(Optional)</label>
                                                            <select id="bank-account" className="form-select" value={data.bankAccount} onChange={(e) => setData({ ...data, bankAccount: e.target.value })} required>
                                                                <option value='' disabled>Choose..</option>
                                                                <option value="Jaiz Bank - 0000000001">Jaiz Bank - 0000000001</option>
                                                                <option value="Taj Bank - 0004768813">Taj Bank - 0004768813</option>
                                                                <option value="Zenith Bank - 1012504768">Zenith Bank - 1012504768</option>
                                                            </select>
                                                        </div>
                                                        :
                                                        ''
                                                }
                                            </div>

                                            {
                                                action === 'bulk' ?
                                                    <div className="row mt-md-3 align-items-center">
                                                        <div className="col-md-4 mt-2 mt-md-0">
                                                            <label htmlFor="bank-account" className="form-label labelEL mb-1">Bank Account(Optional)</label>
                                                            <select id="bank-account" className="form-select" value={data.bankAccount} onChange={(e) => setData({ ...data, bankAccount: e.target.value })} required>
                                                                <option value='' disabled>Choose..</option>
                                                                <option value="Jaiz Bank - 0000000001">Jaiz Bank - 0000000001</option>
                                                                <option value="Taj Bank - 0004768813">Taj Bank - 0004768813</option>
                                                                <option value="Zenith Bank - 1012504768">Zenith Bank - 1012504768</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-md-8 mt-2 mt-md-0">
                                                            <label htmlFor="note" className="form-label labelEL mb-1 mt-2">Note(optional)</label>
                                                            <input type="text" id="note" className="form-control" />
                                                        </div>
                                                    </div>
                                                    :
                                                    ''
                                            }

                                            {
                                                action === 'single' ?
                                                    <>
                                                        <label htmlFor="note" className="form-label labelEL mb-1 mt-2">Note(optional)</label>
                                                        <input type="text" id="note" className="form-control" />
                                                    </>
                                                    :
                                                    ''
                                            }
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary mt-4">Submit</button>
                                        </div>
                                    </>
                            :
                            <div className="public-container px-3 py-4">
                                <h3 className="title-2 text-center mt-2 mb-3">Print Bulk Invoice</h3>

                                <div className="row mt-md-2">
                                    <div className='col-md-4 mt-2 mt-md-0'>
                                        <label htmlFor="class" className="form-label labelEL mb-1">Class <span className="text-danger">*</span></label>
                                        <select id="class" className="form-select" required>
                                            <option value=''>Choose..</option>
                                            <option value="SS 3">SS 3</option>
                                            <option value="SS 2">SS 2</option>
                                            <option value="SS 1">SS 1</option>
                                            <option value="Jss 3">Jss 3</option>
                                            <option value="Jss 2">Jss 2</option>
                                            <option value="Jss 1">Jss 1</option>
                                            <option value="Primary 5">Primary 5</option>
                                            <option value="Primary 4">Primary 4</option>
                                            <option value="Primary 3">Primary 3</option>
                                            <option value="Primary 2">Primary 2</option>
                                            <option value="Primary 1">Primary 1</option>
                                            <option value="Nursery 2">Nursery 2</option>
                                            <option value="Nursery 1">Nursery 1</option>
                                            <option value="Pre Nursery">Pre Nursery</option>
                                        </select>
                                    </div>

                                    <div className='col-md-4 mt-2 mt-md-0'>
                                        <label htmlFor="session" className="form-label labelEL mb-1">Session <span className="text-danger">*</span></label>
                                        <select id="session" className="form-select" required>
                                            <option value=''>Choose..</option>
                                            <option value="2024/2025">2024/2025</option>
                                            <option value="2025/2026">2025/2026</option>
                                        </select>
                                    </div>

                                    <div className='col-md-4 mt-2 mt-md-0'>
                                        <label htmlFor="term" className="form-label labelEL mb-1">Term <span className="text-danger">*</span></label>
                                        <select id="term" className="form-select" required>
                                            <option value=''>Choose..</option>
                                            <option value="First term">First term</option>
                                            <option value="Second term">Second term</option>
                                            <option value="Third term">Third term</option>
                                        </select>
                                    </div>

                                    <div className='col-md-4 mt-2'>
                                        <label htmlFor="category" className="form-label labelEL mb-1">Category <span className="text-danger">*</span></label>
                                        <select id="category" className="form-select" required>
                                            <option value="All">All</option>
                                            <option value="Speech">Speech</option>
                                            <option value="CHARGES">CHARGES</option>
                                            <option value="Registration">Registration</option>
                                            <option value="PTA">PTA</option>
                                            <option value="Exam Fee">Exam Fee</option>
                                            <option value="School Fee">School Fee</option>
                                        </select>
                                    </div>

                                    <div className='col-md-4 mt-2'>
                                        <label htmlFor="status" className="form-label labelEL mb-1">Status <span className="text-danger">*</span></label>
                                        <select id="status" className="form-select" required>
                                            <option value="All">All</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Cancelled">Cancelled</option>
                                            <option value="Successful">Successful</option>
                                        </select>
                                    </div>

                                    <div className='col-md-4 mt-2'>
                                        <label htmlFor="paymentStatus" className="form-label labelEL mb-1">Payment Status <span className="text-danger">*</span></label>
                                        <select id="paymentStatus" className="form-select" required>
                                            <option value="All">All</option>
                                            <option value="Paid">Paid</option>
                                            <option value="Partially Paid">Partially Paid</option>
                                            <option value="Unpaid">Unpaid</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary mt-4 py-1">Print</button>
                                </div>
                            </div>
                    }
                </form >
            </div>

            <ScrollTop />
        </>
    )
}

export default InvoicesParams2;