import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useBillings } from "../context/BillingsContext";
import ScrollTop from "../components/ScrollTop";
import { useAuth } from "../context/AuthContext";

function BillingsParams2() {

    const { action1, action2 } = useParams();
    const navigate = useNavigate();

    const expectedActions1 = ['items', 'discount'];
    const expectedActions2 = ['add'];
    useEffect(() => {
        if (!expectedActions2.includes(action2) || !expectedActions1.includes(action1)) {
            navigate('/404');
        }
    }, [action1, action2, navigate]);


    const { billings, setBillings, discount, setDiscount } = useBillings();
    const { userDetails } = useAuth();
    const [data, setData] = useState({});

    function handleSubmit(e) {
        e.preventDefault();

        if (action1 === 'items') {
            const uniqueId = billings.length > 0
                ? Math.max(...billings.map(item => item.id)) + 1
                : 1;

            const currentData = {
                ...data,
                id: uniqueId,
                addedOn: `${(new Date).getFullYear()}-${String((new Date).getMonth() + 1).padStart(2, '0')}-${String((new Date).getDate()).padStart(2, '0')} ${String((new Date).getHours()).padStart(2, '0')}:${String((new Date).getMinutes()).padStart(2, '0')}:${String((new Date).getSeconds()).padStart(2, '0')}`,
                updatedOn: `${(new Date).getFullYear()}-${String((new Date).getMonth() + 1).padStart(2, '0')}-${String((new Date).getDate()).padStart(2, '0')} ${String((new Date).getHours()).padStart(2, '0')}:${String((new Date).getMinutes()).padStart(2, '0')}:${String((new Date).getSeconds()).padStart(2, '0')}`
            };

            setBillings([...billings, currentData]);
            navigate('/billings');
        } else if (action1 === 'discount') {
            const uniqueId = discount.length > 0
                ? Math.max(...discount.map(item => item.id)) + 1
                : 1;

            const currentData = {
                ...data,
                id: uniqueId,
                target: `${userDetails?.fName ?? ''} ${userDetails?.mName ?? ''} ${userDetails?.lName ?? ''}`
            }

            setDiscount((prev) => [...prev, currentData]);
            navigate('/billings/discount');
        }
    }

    let content;
    if (action1 === 'items') {
        content = (
            <>
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="title" className="form-label mb-1">Title <span className="text-danger">*</span></label>
                        <input type="text" id="title" className="form-control" onChange={(e) => setData({ ...data, title: e.target.value })} required />
                    </div>
                    <div className="col-md-6 mt-2">
                        <label htmlFor="category" className="form-label mb-1">Category <span className="text-danger">*</span></label>
                        <select id="category" className="form-select" onChange={(e) => setData({ ...data, category: e.target.value })} required>
                            <option value="">Choose..</option>
                            <option value="Speech">Speech</option>
                            <option value="CHARGES">CHARGES</option>
                            <option value="Registration">Registration</option>
                            <option value=''>Choose..</option>
                            <option value="PTA">PTA</option>
                            <option value="Exam Fee">Exam Fee</option>
                            <option value="School Fee">School Fee</option>
                        </select>
                    </div>
                    <div className="col-md-6 mt-2">
                        <label htmlFor="price" className="form-label mb-1">Price(&#8358;) <span className="text-danger">*</span></label>
                        <input type="number" id="price" className="form-control" onChange={(e) => setData({ ...data, price: Number(e.target.value) })} required />
                    </div>
                </div>

                <div className="row mt-0 mt-md-2">
                    <div className="col-md-6 mt-2 mt-md-0">
                        <label htmlFor="class" className="form-label mb-1">Class <span className="text-danger">*</span></label>
                        <select id="class" className="form-select" onChange={(e) => setData({ ...data, class: e.target.value })}>
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

                    <div className="col-md-6 mt-2 mt-md-0">
                        <label htmlFor="program" className="form-label mb-1">Program <span className="text-danger">*</span></label>
                        <select id="program" onChange={(e) => setData({ ...data, program: e.target.value })} className="form-select">
                            <option value=''>Choose..</option>
                            <option value={'Art'}>Art</option>
                            <option value={'General'}>General</option>
                            <option value={'Science'}>Science</option>
                        </select>
                    </div>
                </div>

                <div className="row mt-0 mt-md-2">
                    <div className="col-md-6 mt-2 mt-md-0">
                        <label htmlFor="section" className="form-label mb-1">Section <span className="text-danger">*</span></label>
                        <select id="section" onChange={(e) => setData({ ...data, section: e.target.value })} className="form-select">
                            <option value=''>Choose..</option>
                            <option value='Secondary'>Secondary</option>
                            <option value='Primary'>Primary</option>
                            <option value='Nursery'>Nursery</option>
                        </select>
                    </div>

                    <div className="col-md-6 mt-2 mt-md-0">
                        <label htmlFor="status" className="form-label mb-1 mt-2">Status <span className="text-danger">*</span></label>
                        <select id="status" onChange={(e) => setData({ ...data, status: e.target.value })} className="form-select" required>
                            <option value=''>Select Status</option>
                            <option value='Active'>Active</option>
                            <option value='Inactive'>Inactive</option>
                        </select>
                    </div>
                </div>
            </>
        )
    } else if (action1 === 'discount') {
        content = (
            <>
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="title" className="form-label mb-1">Title <span className="text-danger">*</span></label>
                        <input type="text" id="title" className="form-control" onChange={(e) => setData({ ...data, title: e.target.value })} required />
                    </div>
                    <div className="col-md-4 mt-2">
                        <label htmlFor="category" className="form-label mb-1">Category <span className="text-danger">*</span></label>
                        <select id="category" className="form-select" onChange={(e) => setData({ ...data, category: e.target.value })} required>
                            <option value="">Choose..</option>
                            <option value="Speech">Speech</option>
                            <option value="CHARGES">CHARGES</option>
                            <option value="Registration">Registration</option>
                            <option value=''>Choose..</option>
                            <option value="PTA">PTA</option>
                            <option value="Exam Fee">Exam Fee</option>
                            <option value="School Fee">School Fee</option>
                        </select>
                    </div>
                    <div className="col-md-4 mt-2">
                        <label htmlFor="appliesTo" className="form-label mb-1">Applies To <span className="text-danger">*</span></label>
                        <select id="appliesTo" className="form-select" onChange={(e) => setData({ ...data, appliesTo: e.target.value })} required>
                            <option value="">Choose..</option>
                            <option value="Student">Student</option>
                            <option value="Class">Class</option>
                        </select>
                    </div>
                    <div className="col-md-4 mt-2">
                        <label htmlFor="tenure" className="form-label mb-1">Tenure <span className="text-danger">*</span></label>
                        <select id="tenure" className="form-select" onChange={(e) => setData({ ...data, tenure: e.target.value })} required>
                            <option value="">Choose..</option>
                            <option value="Continuous">Continuous</option>
                            <option value="Once">Once</option>
                        </select>
                    </div>
                </div>

                <div className="row mt-0 mt-md-2">
                    <div className="col-md-6 mt-2 mt-md-0">
                        <label htmlFor="session" className="form-label mb-1">Session (if tenure=once)</label>
                        <select id="session" className="form-select" onChange={(e) => setData({ ...data, session: e.target.value })}>
                            <option value=''>Choose..</option>
                            <option value="2025/2026">2025/2026</option>
                            <option value="2024/2025">2024/2025</option>
                        </select>
                    </div>

                    <div className="col-md-6 mt-2 mt-md-0">
                        <label htmlFor="term" className="form-label mb-1">Term (if tenure=once)</label>
                        <select id="term" className="form-select" onChange={(e) => setData({ ...data, term: e.target.value })}>
                            <option value=''>Choose..</option>
                            <option value='Third term'>Third term</option>
                            <option value='Second term'>Second term</option>
                            <option value='First term'>First term</option>
                        </select>
                    </div>
                </div>

                <div className="row mt-0 mt-md-2">
                    <div className="col-md-6 mt-2 mt-md-0">
                        <label htmlFor="type" className="form-label mb-1">Discount Type <span className="text-danger">*</span></label>
                        <select id="type" onChange={(e) => setData({ ...data, type: e.target.value })} className="form-select" required>
                            <option value=''>Choose..</option>
                            <option value='flat'>flat</option>
                            <option value='percentage'>percentage</option>
                        </select>
                    </div>

                    <div className="col-md-6 mt-2 mt-md-0">
                        <label htmlFor="amount" className="form-label mb-1 mt-2">Amount <span className="text-danger">*</span></label>
                        <input type="number" id="amount" onChange={(e) => setData({ ...data, amount: Number(e.target.value) })} className="form-control" required />
                    </div>
                </div>

                <div className="row mt-0 mt-md-2">
                    <div className="col-md-6 mt-2 mt-md-0">
                        <label htmlFor="status" className="form-label mb-1">Status <span className="text-danger">*</span></label>
                        <select id="status" onChange={(e) => setData({ ...data, status: e.target.value })} className="form-select">
                            <option value=''>Choose..</option>
                            <option value='Active'>Active</option>
                            <option value='Inactive'>Inactive</option>
                        </select>
                    </div>

                    <div className="col-md-6 mt-2 mt-md-0">
                        <label htmlFor="admittedBefore" className="form-label mb-1 mt-2">Admitted Before (optional)</label>
                        <input type="date" id="admittedBefore" onChange={(e) => setData({ ...data, admittedBefore: e.target.value })} className="form-control" />
                    </div>
                </div>

                <label htmlFor="description" className="form-label mb-1 mt-2">Description</label>
                <textarea id="description" onChange={(e) => setData({ ...data, description: e.target.value })} className="form-control" />
            </>
        )
    }

    return (
        <>
            <div className="page">
                <h4 className="page-title">Billings</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container' style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}><a className='page-link'>Home</a><span className="slash">/</span></span>
                    <span className='link-container' style={{ cursor: 'pointer' }} onClick={() => { action1 === 'items' ? navigate('/billings') : navigate('/billings/discount') }}><a className='page-link'>{action1 === 'items' ? 'Billings' : 'Discount'}</a><span className="slash">/</span></span>
                    <span className="current-path" style={{ textTransform: 'capitalize' }}>{action1 === 'items' ? `${action2} Item` : 'Student Discount'}</span>
                </p>
            </div>

            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-8">
                        <div className="public-container">
                            <h3 className="title-4 mt-3 text-center">{action1 === 'items' ? 'Add Billing Item' : 'Add Student Discount'}</h3>

                            <form className="student-form" onSubmit={(e) => handleSubmit(e)}>

                                {content}

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

export default BillingsParams2;