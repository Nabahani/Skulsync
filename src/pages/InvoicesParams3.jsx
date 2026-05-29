import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useInvoices } from '../context/InvoicesContext';
import SearchableSelect from '../components/SearchableSelect';
import { useStudent } from '../context/StudentContext';
import ScrollTop from '../components/ScrollTop';

function InvoicesParams3() {

    const { action, id } = useParams();
    const navigate = useNavigate();
    const validActions = ['view', 'edit'];

    useEffect(() => {
        if (!validActions.includes(action)) {
            navigate('/404');
        }
    }, [action, navigate]);


    const { studentsData } = useStudent();
    const { invoices, setInvoices, registration } = useInvoices();
    const [quantity, setQuantity] = useState(1);
    const currentStudentDetails = invoices.find((invoice) => invoice.id === id);
    const [data, setData] = useState(currentStudentDetails);
    const [openCol, setOpenCol] = useState(true);
    const [discount, setDiscount] = useState(0);;

    function handleSubmit(e) {
        e.preventDefault();

        const currentData = {
            uniqueId: data.uniqueId,
            id: data.id,
            student: `${data.fName ?? data.student} ${data.mName ?? ''} ${data.lName ?? ''} `,
            regno: data.regno,
            class: data.class,
            category: data.category,
            price: data.price,
            total: data.totalAmount,
            totalAmount: data.totalAmount,
            session: data.session,
            term: data.term,
            status1: data.status1,
            status2: data.status2,
            paymentMethod: data.paymentMethod,
            account: data.bankAccount,
            title: data.title,
            date: `${new Date().getFullYear()}-${new Date().getMonth() + 1} ${new Date().getDate()}`,
            quantity: quantity
        };

        setInvoices(invoices.map((invs) => invs.id === currentData.id ? currentData : invs));
        navigate('/invoices');
    }

    let content;
    if (action === 'view') {
        content = (
            <div className="container-fluid px-3 pb-2">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-10">
                        <div className="public-container">
                            <div className="row">
                                <div className='col-sm-6'>
                                    <h3 className="title-2">Student Information</h3>
                                    <p className="title-5">Name : {currentStudentDetails.student}</p>
                                    <p className="title-5">Reg. Number : {currentStudentDetails.regno}</p>
                                    <p className="title-5">Class : {currentStudentDetails.class}</p>
                                    <p className="title-5">Session : {currentStudentDetails.session} {currentStudentDetails.term}</p>
                                </div>
                                <div className='col-sm-6 text-sm-end mt-4 mt-sm-0'>
                                    <h3 className="title-2">Invoice Information</h3>
                                    <p className="title-5">Category : {currentStudentDetails.category}</p>
                                    <p className="title-5">#ID : {currentStudentDetails.id}</p>
                                    <p className="title-5">Date : {currentStudentDetails.date}</p>
                                    <p className="title-5">Status : <span className={`text6 px-1 text-white bg-${currentStudentDetails.status1 === 'Paid' ? 'success' : 'danger'}`}>{currentStudentDetails.status1}</span> <span className={`text6 px-1 text-white bg-${currentStudentDetails.status2 === 'Active' ? 'info' : 'success'}`}>{currentStudentDetails.status2}</span></p>
                                </div>
                            </div>

                            <h3 className="title-2 text-center mt-5">Title: testing</h3>

                            <label className="form-label entries-text mb-1">Items</label>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>Item</th>
                                            <th></th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr key={currentStudentDetails.id} style={{ borderBottom: '1px' }}>
                                            <th>1</th>
                                            <td>{currentStudentDetails.title}</td>
                                            <td></td>
                                            <td className='text-center'>{currentStudentDetails.quantity}</td>
                                            <td>{currentStudentDetails.total}</td>
                                            <td>{currentStudentDetails.totalAmount ?? currentStudentDetails.total}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <th>Total Quantity : </th>
                                            <td className='text-center'>{currentStudentDetails.quantity}</td>
                                            <th>Sub Total : </th>
                                            <td>&#8358;{currentStudentDetails.total}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <th>Discount : </th>
                                            <td className='text-center'>&#8358;0</td>
                                            <th>Total : </th>
                                            <td>&#8358;{currentStudentDetails.total}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <th></th>
                                            <td></td>
                                            <th>Balance : </th>
                                            <td>&#8358;{currentStudentDetails.total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <label className="form-label entries-text mb-1 mt-3">Payments</label>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>Reference</th>
                                            <th>Method</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>

                            <label className="form-label entries-text mb-1 mt-3">Outstanding Invoices</label>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead>
                                        <tr>
                                            <th>InvoiceID</th>
                                            <th>Student</th>
                                            <th>Category</th>
                                            <th>Balance</th>
                                            <th>Session</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr key={currentStudentDetails.id}>
                                            <td>{currentStudentDetails.id}</td>
                                            <td>{currentStudentDetails.student}</td>
                                            <td>{currentStudentDetails.category}</td>
                                            <td>&#8358;{currentStudentDetails.total}</td>
                                            <td>{currentStudentDetails.session}</td>
                                            <td>{currentStudentDetails.status2}</td>
                                            <td>{currentStudentDetails.date}</td>
                                            <td className='text-center'><i className="bi bi-eye-fill text-info custom-font"></i></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={6}></td>
                                            <th>Outstanding Balance : </th>
                                            <th>&#8358;{currentStudentDetails.total}</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <div className="public-border public-bg">
                                        <span className="public-label">Payment Method : </span>
                                        <span className="public-input">{currentStudentDetails.paymentMethod}</span>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-3 mt-md-0">
                                    <div className="public-border public-bg">
                                        <span className="public-label">Bank : </span>
                                        <span className="public-input">{currentStudentDetails.account}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="public-border public-bg mt-3">
                                <span className="public-label">Note : </span>
                                <span className="public-input">testing from Nabahani</span>
                            </div>

                            <div className="row mt-md-3">
                                <div className="col-md-6 mt-3 mt-md-0">
                                    <div className="public-border public-bg">
                                        <span className="public-label">Status : </span>
                                        <span className="public-input">{currentStudentDetails.status2}</span>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-3 mt-md-0">
                                    <div className="public-border public-bg">
                                        <span className="public-label">Created On </span>
                                        <span className="public-input">2026-05-28 20:40:20</span>
                                    </div>
                                </div>
                            </div>

                            <div className="public-border public-bg mt-3">
                                <span className="public-label">Created By </span>
                                <span className="public-input">yusufabdulrahman5677@gmail.com</span>
                            </div>

                            <div className="text-center mt-4">
                                <button className="btn btn-warning ps-3 py-1 me-2 position-relative" onClick={() => navigate('/invoices')}>
                                    <i className="bi bi-x small-icon"></i>
                                    <span className="ps-3">Back</span>
                                </button>
                                <button className="btn btn-primary py-1 me-2" onClick={() => navigate(`/invoices/edit/${id}`)}><i className="bi bi-pencil-square" onClick={() => navigate(`/invoices/edit/${id}`)}></i> Edit</button>
                                <button className="btn btn-info py-1"><i className="bi bi-credit-card-fill"></i> Payment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (action === 'edit') {
        content = (
            <div className="container-fluid px-3 pb-2">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="public-container px-3 py-4">
                        <h3 className="title-2 text-center mt-2 mb-3">Edit Invoice</h3>

                        <div className="row mt-md-2">
                            <div className='col-md-6 mt-2 mt-md-0'>
                                <label htmlFor="title" className="form-label labelEL mb-1">Title <span className="text-danger">*</span></label>
                                <input type="text" id="title" className="form-control" value='testing' onChange={(e) => setData({ ...data, title: e.target.value })} required />
                            </div>
                            <div className='col-md-6 mt-2 mt-md-0'>
                                <label htmlFor="student" className="form-label labelEL mb-1">Student <span className="text-danger">*</span></label>
                                <SearchableSelect registration={studentsData} id={2} setData={setData} data={data} />
                            </div>
                        </div>

                        <div className="row mt-md-2">
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

                            <div className='col-md-3 mt-2 mt-md-0'><label htmlFor="session" className="form-label labelEL mb-1">Session <span className="text-danger">*</span></label>
                                <select id="session" className="form-select" value={data.session || ''} onChange={(e) => setData({ ...data, session: e.target.value })} required>
                                    <option value='' disabled>Choose..</option>
                                    <option value="2025/2026">2025/2026</option>
                                    <option value="2024/2025">2024/2025</option>
                                    <option value="2025/2026">2025/2026</option>
                                </select>
                            </div>

                            <div className='col-md-3 mt-2 mt-md-0'><label htmlFor="term" className="form-label labelEL mb-1">Term <span className="text-danger">*</span></label>
                                <select id="term" className="form-select" value={data.term || ''} onChange={(e) => setData({ ...data, term: e.target.value })} required>
                                    <option value=''>Choose..</option>
                                    <option value="First term">First term</option>
                                    <option value="Second term">Second term</option>
                                    <option value="Third term">Third term</option>
                                </select>
                            </div>

                            <div className='col-md-3 mt-2 mt-md-0'><label htmlFor="category" className="form-label labelEL mb-1">Category <span className="text-danger">*</span></label>
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



                        <div className="container">
                            <div className="table-responsive">
                                <div className="row m-0" style={{ height: '40px', minWidth: '600px' }}>
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

                                {
                                    openCol && <div className="row m-0" style={{ height: '70px', minWidth: '600px' }}>
                                        <div className="col border border-end-0 border-top-0 d-flex align-items-center">
                                            <div className="small-black-text fw-normal">
                                                {data.title}
                                            </div>
                                        </div>
                                        <div className="col border border-end-0 border-top-0 d-flex align-items-center">
                                            <div className="small-black-text fw-normal">
                                                {data.total}
                                            </div>
                                        </div>
                                        <div className="col border border-end-0 border-top-0 d-flex align-items-center">
                                            <div className="small-black-text fw-normal">
                                                {data.quantity}
                                            </div>
                                        </div>
                                        <div className="col border border-end-0 border-top-0 d-flex align-items-center">
                                            <div className="small-black-text fw-normal">
                                                {data.total}
                                            </div>
                                        </div>
                                        <div className="col border border-top-0 d-flex align-items-center">
                                            <div className="small-black-text fw-normal">
                                                <button className="btn btn-danger py-1" onClick={() => setOpenCol(false)}>X</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="row mt-md-4 align-items-center">
                            <div className='col-md-3 mt-3 mt-md-0'>
                                <label htmlFor="subtotal" className="form-label labelEL mb-1">Subtotal (&#8358;)</label>
                                <input type="text" id="subtotal" value={data.total} className="form-control" disabled />
                            </div>
                            <div className='col-md-3 mt-2 mt-md-0'>
                                <label htmlFor="total" className="form-label labelEL mb-1">Discount (&#8358;)</label>
                                <input type="number" id="total" onChange={(e) => setDiscount(e.target.value)} className="form-control" />
                            </div>
                            <div className='col-md-3 mt-2 mt-md-0'>
                                <label htmlFor="total" className="form-label labelEL mb-1">Total (&#8358;)</label>
                                <input type="number" id="total" value={(typeof (data.total) === 'string' ? data.total.replace(',', '') : data.total) - discount} className="form-control" disabled />
                            </div>
                            <div className='col-md-3 mt-2 mt-md-0'>
                                <label htmlFor="payment-method" className="form-label labelEL mb-1">Payment Method</label>
                                <select id="payment-method" className="form-select" value={data.paymentMethod || ''} onChange={(e) => setData({ ...data, paymentMethod: e.target.value })} required>
                                    <option value='' disabled>Choose..</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Transfer">Transfer</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mt-md-3 align-items-center">
                            <div className="col-md-5 mt-2 mt-md-0">
                                <label htmlFor="bank-account" className="form-label labelEL mb-1">Bank Account(Optional)</label>
                                <select id="bank-account" className="form-select" value={data.bankAccount} onChange={(e) => setData({ ...data, bankAccount: e.target.value })} required>
                                    <option value='' disabled>Choose..</option>
                                    <option value="Jaiz Bank - 0000000001">Jaiz Bank - 0000000001</option>
                                    <option value="Taj Bank - 0004768813">Taj Bank - 0004768813</option>
                                    <option value="Zenith Bank - 1012504768">Zenith Bank - 1012504768</option>
                                </select>
                            </div>

                            <div className="col-md-7 mt-2 mt-md-0">
                                <label htmlFor="note" className="form-label labelEL mb-1 mt-2">Note(optional)</label>
                                <input type="text" id="note" value={'testing from Nabahani'} onChange={(e) => setData({ ...data, note: e.target.value })} className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-success mt-4">Update Invoice</button>
                    </div>
                </form >
            </div >
        )
    }

    return (
        <>
            <div className="page">
                <h4 className="page-title">Invoices</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container' onClick={() => navigate('/dashboard')}><Link className='page-link'>Home</Link ><span className="slash">/</span></span>
                    <span className='link-container' onClick={() => navigate('/invoices')}><Link className='page-link'>Invoices</Link ><span className="slash">/</span></span>
                    <span className="current-path"><span style={{ textTransform: 'capitalize' }}>{action}</span></span>
                </p>
            </div>

            {content}

            <ScrollTop />
        </>
    )
}

export default InvoicesParams3;