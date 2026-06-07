import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useBillings } from "../context/BillingsContext";
import ScrollTop from "../components/ScrollTop";

function BillingsParams3() {

    const { action1, action2, id } = useParams();
    const navigate = useNavigate();
    const { billings, setBillings, discount, setDiscount } = useBillings();

    const expectedActions1 = ['items', 'discount'];
    const expectedActions2 = ['edit', 'view'];
    useEffect(() => {
        if (!expectedActions2.includes(action2) || !expectedActions1.includes(action1)) {
            navigate('/404');
        }

        if (action1 === 'items' && !billings.some((bills) => bills.id === Number(id))) {
            navigate('/404');
        } else if (action1 === 'discount' && !discount.some((items) => items.id === Number(id))) {
            navigate('/404');
        }
    }, [action1, action2, id, discount, billings, navigate]);

    const currentbill = action1 === 'items' ?
        billings.find((bill) => bill.id === Number(id))
        :
        discount.find((item) => item.id === Number(id));
    const [data, setData] = useState(currentbill);
    function handleSubmit(e) {
        e.preventDefault();

        if (action1 === 'items') {
            setBillings(billings.map((bill) => bill.id === Number(id) ? data : bill));
            navigate('/billings');
        } else if (action1 === 'discount') {
            setDiscount((prev) => prev.map((item) => item.id === Number(id) ? data : item));
            navigate('/billings/discount');
        }
    }

    const currentBillDetails = billings.find((bill) => bill.id === Number(id));

    function deleteBill(id) {
        setBillings((prev) => prev.filter((bills) => bills.id !== Number(id)));
        navigate('/billings')
    }

    function deactivateBill(id) {
        const updatedStatus = currentBillDetails.status === 'Active' ? 'Inactive' : 'Active';
        setBillings((prev) => prev.map((bill) => bill.id === Number(id) ? { ...bill, status: updatedStatus } : bill));
    }

    let content;
    if (action1 === 'items') {
        content = (
            action2 === 'edit' ?
                <div className="col-11 col-md-8">
                    <div className="public-container">
                        <h3 className="title-4 mt-3 text-center">Add Billing Item</h3>

                        <form className="student-form" onSubmit={(e) => handleSubmit(e)}>

                            <div className="row">
                                <div className="col-12">
                                    <label htmlFor="title" className="form-label mb-1">Title <span className="text-danger">*</span></label>
                                    <input type="text" id="title" className="form-control" value={data?.title ?? ''} value={data?.title ?? ''} onChange={(e) => setData({ ...data, title: e.target.value })} required />
                                </div>
                                <div className="col-md-6 mt-2">
                                    <label htmlFor="category" className="form-label mb-1">Category <span className="text-danger">*</span></label>
                                    <select id="category" className="form-select" value={data?.title ?? ''} value={data.category} onChange={(e) => setData({ ...data, category: e.target.value })} required>
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
                                    <input type="number" id="price" className="form-control" value={data?.title ?? ''} value={data.price} onChange={(e) => setData({ ...data, price: Number(e.target.value) })} required />
                                </div>
                            </div>

                            <div className="row mt-0 mt-md-2">
                                <div className="col-md-6 mt-2 mt-md-0">
                                    <label htmlFor="class" className="form-label mb-1">Class <span className="text-danger">*</span></label>
                                    <select id="class" className="form-select" value={data?.title ?? ''} value={data.class} onChange={(e) => setData({ ...data, class: e.target.value })}>
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
                                    <select id="program" className="form-select" value={data?.title ?? ''} value={data.program} onChange={(e) => setData({ ...data, program: e.target.value })}>
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
                                    <select id="section" className="form-select" value={data?.title ?? ''} value={data.section} onChange={(e) => setData({ ...data, section: e.target.value })}>
                                        <option value=''>Choose..</option>
                                        <option value='Secondary'>Secondary</option>
                                        <option value='Primary'>Primary</option>
                                        <option value='Nursery'>Nursery</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mt-2 mt-md-0">
                                    <label htmlFor="status" className="form-label mb-1 mt-2">Status <span className="text-danger">*</span></label>
                                    <select id="status" className="form-select" value={data?.title ?? ''} value={data.status} onChange={(e) => setData({ ...data, status: e.target.value })} required>
                                        <option value=''>Select Status</option>
                                        <option value='Active'>Active</option>
                                        <option value='Inactive'>Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="text-center mt-3">
                                <button type="submit" className="btn btn-primary text-center py-1 me-1">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                :
                <div className="col-11 col-md-10 col-lg-8">
                    <div className="public-container px-3 py-4">

                        <div className="text-center">
                            <h3 className="title-2 text-center mt-2 mb-1">Billing Item Details</h3>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="public-border public-bg mt-3">
                                    <span className="public-label">Title : </span>
                                    <span className="public-input">{currentBillDetails?.title ?? ''}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="public-border public-bg mt-3">
                                    <span className="public-label">Category : </span>
                                    <span className="public-input">{currentBillDetails?.category ?? ''}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="public-border public-bg mt-3">
                                    <span className="public-label">Price : </span>
                                    <span className="public-input">&#8358;{currentBillDetails?.price ?? ''}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="public-border public-bg mt-3">
                                    <span className="public-label">Section : </span>
                                    <span className="public-input">{currentBillDetails?.section ?? ''}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="public-border public-bg mt-3">
                                    <span className="public-label">Program : </span>
                                    <span className="public-input">{currentBillDetails?.program ?? ''}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="public-border public-bg mt-3">
                                    <span className="public-label">Class </span>
                                    <span className="public-input">{currentBillDetails?.class ?? ''}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="public-border public-bg mt-3">
                                    <span className="public-label">Status </span>
                                    <span className="public-input">{currentBillDetails?.status ?? ''}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="public-border public-bg mt-3">
                                    <span className="public-label">Added On </span>
                                    <span className="public-input">{currentBillDetails?.addedOn ?? ''}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="public-border public-bg mt-3">
                                    <span className="public-label">Updated On </span>
                                    <span className="public-input">{currentBillDetails?.updatedOn ?? ''}</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-2">
                            <button className="btn btn-primary me-2 mt-2 py-1" onClick={() => navigate(`/billings/items/edit/${id}`)}><i className="bi bi-pencil-square"></i> Edit</button>
                            <button className="btn btn-warning me-2 mt-2 py-1" onClick={() => deactivateBill(id)}><i className="bi bi-arrow-down"></i> Deactivate</button>
                            <button className="btn btn-danger mt-2 py-1" onClick={() => deleteBill(id)}> <i className="bi bi-trash"></i> Delete</button>
                        </div>
                    </div>
                </div>
        )
    } else if (action1 === 'discount') {
        content = (
            <div className="col-11 col-md-8">
                <div className="public-container">
                    <h3 className="title-4 mt-3 text-center">Edit Student Discount</h3>

                    <form className="student-form" onSubmit={(e) => handleSubmit(e)}>
                        <div className="row">
                            <div className="col-12">
                                <label htmlFor="title" className="form-label mb-1">Title <span className="text-danger">*</span></label>
                                <input type="text" id="title" className="form-control" value={data?.title ?? ''} onChange={(e) => setData({ ...data, title: e.target.value })} required />
                            </div>
                            <div className="col-md-4 mt-2">
                                <label htmlFor="category" className="form-label mb-1">Category <span className="text-danger">*</span></label>
                                <select id="category" className="form-select" value={data?.category ?? ''} onChange={(e) => setData({ ...data, category: e.target.value })} required>
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
                                <select id="appliesTo" className="form-select" value={data?.appliesTo ?? ''} onChange={(e) => setData({ ...data, appliesTo: e.target.value })} required>
                                    <option value="">Choose..</option>
                                    <option value="Student">Student</option>
                                    <option value="Class">Class</option>
                                </select>
                            </div>
                            <div className="col-md-4 mt-2">
                                <label htmlFor="tenure" className="form-label mb-1">Tenure <span className="text-danger">*</span></label>
                                <select id="tenure" className="form-select" value={data?.tenure ?? ''} onChange={(e) => setData({ ...data, tenure: e.target.value })} required>
                                    <option value="">Choose..</option>
                                    <option value="Continuous">Continuous</option>
                                    <option value="Once">Once</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mt-0 mt-md-2">
                            <div className="col-md-6 mt-2 mt-md-0">
                                <label htmlFor="type" className="form-label mb-1">Discount Type <span className="text-danger">*</span></label>
                                <select id="type" onChange={(e) => setData({ ...data, type: e.target.value })} className="form-select" value={data?.type ?? ''}>
                                    <option value=''>Choose..</option>
                                    <option value='flat'>flat</option>
                                    <option value='percentage'>percentage</option>
                                </select>
                            </div>

                            <div className="col-md-6 mt-2 mt-md-0">
                                <label htmlFor="amount" className="form-label mb-1 mt-2">Amount <span className="text-danger">*</span></label>
                                <input type="number" id="amount" onChange={(e) => setData({ ...data, amount: Number(e.target.value) })} className="form-control" value={data?.amount ?? ''} required />
                            </div>
                        </div>

                        <div className="row mt-0 mt-md-2">
                            <div className="col-md-6 mt-2 mt-md-0">
                                <label htmlFor="startDate" className="form-label mb-1">Start Date</label>
                                <input type="date" id="startDate" className="form-control" value={data?.startDate ?? ''} onChange={(e) => setData({ ...data, startDate: e.target.value })} />
                            </div>

                            <div className="col-md-6 mt-2 mt-md-0">
                                <label htmlFor="endDate" className="form-label mb-1">End Date</label>
                                <input type="date" id="endDate" className="form-control" value={data?.endDate ?? ''} onChange={(e) => setData({ ...data, startDate: e.target.value })} />
                            </div>
                        </div>

                        <div className="row mt-0 mt-md-2">
                            <div className="col-md-6 mt-2 mt-md-0">
                                <label htmlFor="status" className="form-label mb-1">Status <span className="text-danger">*</span></label>
                                <select id="status" onChange={(e) => setData({ ...data, status: e.target.value })} className="form-select" value={data?.status ?? ''}>
                                    <option value=''>Choose..</option>
                                    <option value='Active'>Active</option>
                                    <option value='Inactive'>Inactive</option>
                                </select>
                            </div>

                            <div className="col-md-6 mt-2 mt-md-0">
                                <label htmlFor="admittedBefore" className="form-label mb-1 mt-2">Admitted Before (optional)</label>
                                <input type="date" id="admittedBefore" onChange={(e) => setData({ ...data, admittedBefore: e.target.value })} className="form-control" value={data?.admittedBefore ?? ''} />
                            </div>
                        </div>

                        <label htmlFor="description" className="form-label mb-1 mt-2">Description</label>
                        <textarea id="description" onChange={(e) => setData({ ...data, description: e.target.value })} className="form-control" value={data?.description ?? ''} />

                        <div className="text-center mt-3">
                            <button type="submit" className="btn btn-primary text-center py-1 me-1">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="page">
                <h4 className="page-title">Billings</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container' onClick={() => navigate('/dashboard')}><a className='page-link'>Home</a><span className="slash">/</span></span>
                    <span className='link-container' onClick={() => action1 === 'items' ? navigate('/billings') : navigate('/billings/discount')}><a className='page-link'>{action1 === 'items' ? 'Billings' : 'Discount'}</a><span className="slash">/</span></span>
                    <span className="current-path" style={{ textTransform: 'capitalize' }}>{action2} Item</span>
                </p>
            </div>

            <div className="container-fluid">
                <div className="row justify-content-center">
                    {content}
                </div>
            </div >

            <ScrollTop />
        </>
    )
}

export default BillingsParams3;