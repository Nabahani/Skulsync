import { useForm } from "react-hook-form";
import { useParams, Link, useNavigate } from "react-router-dom";
import ScrollTop from "../components/ScrollTop";
import { useEffect, useState } from "react";
import { useStaffs } from "../context/StaffsContext";

function StaffsParams3() {

    const { action, id } = useParams();
    const navigate = useNavigate();
    const { staffsData, setStaffsData } = useStaffs();


    const expectedActions = [
        'view',
        'edit'
    ]
    useEffect(() => {
        const isValidId = staffsData.some((staffs) => staffs.id === id);
        console.log(isValidId)

        if (!expectedActions.includes(action) || !isValidId) {
            navigate('/404');
        }
    }, [action, id, navigate]);

    const currentStaff = staffsData.find((staff) => staff.id === id);
    const adminDetails = localStorage.getItem('user-details') ? JSON.parse(localStorage.getItem('user-details')) : '';
    const [data, setData] = useState(currentStaff);

    function handleSubmit(e) {
        e.preventDefault();

        if (action === 'edit') {
            setStaffsData(staffsData.map((staff) => (staff.uniqueId === currentStaff.uniqueId) ? data : staff));
            navigate('/staffs');
        }
    }

    function deactivateStaff(id) {
        setStaffsData(staffsData.map((staff) => staff.uniqueId === id ? { ...staff, status: 'Inactive' } : staff));
        navigate('/staffs');
    }

    function activateStaff(id) {
        setStaffsData(staffsData.map((staff) => staff.uniqueId === id ? { ...staff, status: 'Active' } : staff));
        navigate('/staffs');
    }

    function deleteStaff(id) {
        if (window.confirm(`Are you sure you want to delete ${currentStaff?.fName ?? ''} ${currentStaff?.mName ?? ''} ${currentStaff?.lName ?? ''} form the staffs list?`)) {
            setStaffsData(staffsData.filter((staffs) => staffs.uniqueId !== id));
            navigate('/staffs');
        }
    }

    let content;
    if (action === 'view') {
        content = (
            <>
                <div className="picture text-center">
                    <i className="bi bi-person-circle"></i>
                </div>
                <h3 className="title-2 mt-2 text-center">Staff Information</h3>

                <div className="staff-form">
                    <p className="title-4 mb-2">Personal Information</p>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="public-border">
                                <span className="public-label">First Name : </span>
                                <span className="public-input">{currentStaff?.fName ?? ''}</span>
                            </div>
                        </div>
                        <div className="col-md-4 mt-3 mt-md-0">
                            <div className="public-border">
                                <span className="public-label">Middle Name : </span>
                                <span className="public-input">{currentStaff?.mName ?? ''}</span>
                            </div>
                        </div>
                        <div className="col-md-4 mt-3 mt-md-0">
                            <div className="public-border">
                                <span className="public-label">Last Name : </span>
                                <span className="public-input">{currentStaff?.lName ?? ''}</span>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-md-3">
                        <div className="col-md-4 mt-3 mt-md-0">
                            <div className="public-border">
                                <span className="public-label">Date of Birth : </span>
                                <span className="public-input">{currentStaff?.dob ?? ''}</span>
                            </div>
                        </div>
                        <div className="col-md-4 mt-3 mt-md-0">
                            <div className="public-border">
                                <span className="public-label">Gender : </span>
                                <span className="public-input">{currentStaff?.gender ?? ''}</span>
                            </div>
                        </div>
                        <div className="col-md-4 mt-3 mt-md-0">
                            <div className="public-border">
                                <span className="public-label">Marital Status : </span>
                                <span className="public-input">{currentStaff?.maritalStatus ?? ''}</span>
                            </div>
                        </div>
                    </div>


                    <p className="title-4 mt-3 mb-2">Contact Information</p>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="public-border">
                                <span className="public-label">Phone Number 1 : </span>
                                <span className="public-input">{currentStaff?.phoneNo1 ?? ''}</span>
                            </div>
                        </div>
                        <div className="col-md-6 mt-3 mt-md-0">
                            <div className="public-border">
                                <span className="public-label">Phone Number 2 : </span>
                                <span className="public-input">{currentStaff?.phoneNo2 ?? ''}</span>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-md-3">
                        <div className="col-md-6 mt-3 mt-md-0">
                            <div className="public-border">
                                <span className="public-label">State : </span>
                                <span className="public-input" style={{ textTransform: 'capitalize' }}>{currentStaff?.state ?? ''}</span>
                            </div>
                        </div>
                        <div className="col-md-6 mt-3 mt-md-0">
                            <div className="public-border">
                                <span className="public-label">L.G.A : </span>
                                <span className="public-input">{currentStaff?.lga ?? ''}</span>
                            </div>
                        </div>
                    </div>

                    <div className="public-border mt-3">
                        <span className="public-label">Address : </span>
                        <span className="public-input">{currentStaff?.address ?? ''}</span>
                    </div>


                    <p className="title-4 mt-3 mb-2">Identity Information</p>
                    <div className="public-border">
                        <span className="public-label">NIN : </span>
                        <span className="public-input">{currentStaff?.nin ?? ''}</span>
                    </div>


                    <p className="title-4 mt-3 mb-2">Educational Information</p>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="public-border">
                                <span className="public-label">Highest Qualification : </span>
                                <span className="public-input">{currentStaff?.qualification ?? ''}</span>
                            </div>
                        </div>
                        <div className="col-md-6 mt-3 mt-md-0">
                            <div className="public-border">
                                <span className="public-label">Course : </span>
                                <span className="public-input">{currentStaff?.course ?? ''}</span>
                            </div>
                        </div>
                    </div>

                    <div className="public-border mt-3">
                        <span className="public-label">School : </span>
                        <span className="public-input">{currentStaff?.school ?? ''}</span>
                    </div>


                    <p className="title-4 mt-3 mb-2">Next of Kin Information</p>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="public-border">
                                <span className="public-label">Name : </span>
                                <span className="public-input">{currentStaff?.kName ?? ''}</span>
                            </div>
                        </div>
                        <div className="col-md-4 mt-3 mt-md-0">
                            <div className="public-border">
                                <span className="public-label">Relation : </span>
                                <span className="public-input">{currentStaff?.relation ?? ''}</span>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-md-3">
                        <div className="col-md-6 mt-3 mt-md-0">
                            <div className="public-border">
                                <span className="public-label">Phone Number : </span>
                                <span className="public-input">{currentStaff?.kNo ?? ''}</span>
                            </div>
                        </div>
                        <div className="col-md-6 mt-3 mt-md-0">
                            <div className="public-border">
                                <span className="public-label">Occupation : </span>
                                <span className="public-input">{currentStaff?.occupation ?? ''}</span>
                            </div>
                        </div>
                    </div>

                    <div className="public-border mt-3">
                        <span className="public-label">Address : </span>
                        <span className="public-input">{currentStaff?.kAdd ?? ''}</span>
                    </div>


                    <p className="title-4 mt-3 mb-2">Employment Information</p>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="public-border">
                                <span className="public-label">Staff #ID : </span>
                                <span className="public-input">{currentStaff?.id ?? ''}</span>
                            </div>
                        </div>
                        <div className="col-md-6 mt-3 mt-md-0">
                            <div className="public-border">
                                <span className="public-label">Employment Date : </span>
                                <span className="public-input">{currentStaff?.date ?? ''}</span>
                            </div>
                        </div>
                        <div className="col-md-6 mt-3">
                            <div className="public-border">
                                <span className="public-label">Category : </span>
                                <span className="public-input">{currentStaff?.category ?? ''}</span>
                            </div>
                        </div>
                        <div className="col-md-6 mt-3">
                            <div className="public-border">
                                <span className="public-label">Type : </span>
                                <span className="public-input">{currentStaff?.type ?? ''}</span>
                            </div>
                        </div>
                        <div className="col-md-6 mt-3">
                            <div className="public-border">
                                <span className="public-label">Position : </span>
                                <span className="public-input">{currentStaff?.position ?? ''}</span>
                            </div>
                        </div>
                        <div className="col-md-6 mt-3">
                            <div className="public-border">
                                <span className="public-label">Department : </span>
                                <span className="public-input">{currentStaff?.department ?? ''}</span>
                            </div>
                        </div>
                    </div>

                    <hr className="my-4" />

                    <div className="row">
                        <div className="col-md-6">
                            <div className="public-border">
                                <span className="public-label">Status : </span>
                                <span className="public-input">{currentStaff?.status ?? ''}</span>
                            </div>
                        </div>
                        <div className="col-md-6 mt-3 mt-md-0">
                            <div className="public-border">
                                <span className="public-label">Added On : </span>
                                <span className="public-input">{currentStaff?.date ?? ''}</span>
                            </div>
                        </div>
                    </div>

                    <div className="public-border mt-3">
                        <span className="public-label">Added By : </span>
                        <span className="public-input">yusufabdulrahman5677@gmail.com</span>
                    </div>

                    <div className="text-center">
                        <Link to={`/staffs/edit/${id}`} className="btn btn-sm btn-primary me-1 mt-3"><i className="bi bi-pencil-square"></i> Edit</Link>
                        <button onClick={() => {
                            if (currentStaff?.status === 'Active') {
                                deactivateStaff(currentStaff.uniqueId);
                            } else {
                                activateStaff(currentStaff.uniqueId);
                            }
                        }} className="btn btn-sm btn-warning me-1 mt-3"><i className={`bi bi-person${currentStaff?.status === 'Active' ? '-slash' : ''}`}></i> {currentStaff?.status === "Active" ? 'Deactivate' : 'Activate'}</button>
                        <button className="btn btn-sm btn-danger mt-3" onClick={() => deleteStaff(currentStaff.uniqueId)}><i className="bi bi-trash"></i> Delete</button>
                    </div>
                </div>
            </>
        )
    } else {
        content = (
            <>
                <h3 className="title-2 mt-3 text-center">Edit Staff</h3>

                <form className="staff-form" onSubmit={(e) => handleSubmit(e)}>
                    <p className="title-4 mb-2">Personal Information</p>

                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="first" className="form-label mb-1">First Name <span className="text-danger">*</span></label>
                            <input type="text" id="first" className="form-control" value={data.fName} onChange={(e) => setData({ ...data, fName: e.target.value })} required />
                        </div>
                        <div className="col-md-4 mt-2 mt-md-0">
                            <label htmlFor="middle" className="form-label mb-1">Middle Name <span className="text-danger">*</span></label>
                            <input type="text" id="middle" className="form-control" value={data.mName} onChange={(e) => setData({ ...data, mName: e.target.value })} />
                        </div>
                        <div className="col-md-4 mt-2 mt-md-0">
                            <label htmlFor="last" className="form-label mb-1">Last Name <span className="text-danger">*</span></label>
                            <input type="text" id="last" className="form-control" value={data.lName} onChange={(e) => setData({ ...data, lName: e.target.value })} required />
                        </div>
                    </div>

                    <div className="row mt-0 mt-md-2">
                        <div className='col-md-4 mt-2 mt-md-0'>
                            <label htmlFor="dob" className="form-label mb-1">Date of birth <span className="text-danger">*</span></label>
                            <input type="date" id="dob" className="form-control" value={data.dob} onChange={(e) => setData({ ...data, dob: e.target.value })} required />
                        </div>
                        <div className='col-md-4 mt-2 mt-md-0'>
                            <label htmlFor="gender" className="form-label mb-1">Gender <span className="text-danger">*</span></label>
                            <select id="gender" className="form-select" value={data.gender} onChange={(e) => setData({ ...data, gender: e.target.value })} required>
                                <option>Choose..</option>
                                <option value='Female'>Female</option>
                                <option value='Male'>Male</option>
                            </select>
                        </div>
                        <div className='col-md-4 mt-2 mt-md-0'>
                            <label htmlFor="marital-status" className="form-label mb-1">Marital Status <span className="text-danger">*</span></label>
                            <select id="marital-status" className="form-select" value={data.maritalStatus} onChange={(e) => setData({ ...data, maritalStatus: e.target.value })} required>
                                <option>Choose..</option>
                                <option value='Single'>Single</option>
                                <option value='Mariage'>Mariage</option>
                                <option value='Divorced'>Divorced</option>
                            </select>
                        </div>
                    </div>


                    <p className="title-4 mt-4 mb-2">Contact Information</p>
                    <div className="row mt-0 mt-md-2">
                        <div className="col-md-6 mt-2 mt-md-0">
                            <label htmlFor="phoneNo1" className="form-label mb-1">Phone Number 1 <span className="text-danger">*</span></label>
                            <input type="text" id="phoneNo1" className="form-control" value={data.phoneNo1} onChange={(e) => setData({ ...data, phoneNo1: e.target.value })} required />
                        </div>
                        <div className="col-md-6 mt-2 mt-md-0">
                            <label htmlFor="phoneNo2" className="form-label mb-1">Phone Number 2 <span className="text-danger">*</span></label>
                            <input type="text" id="phoneNo2" className="form-control" value={data.phoneNo2} onChange={(e) => setData({ ...data, phoneNo2: e.target.value })} required />
                        </div>
                    </div>

                    <div className="row mt-0 mt-md-2">
                        <div className="col-md-6 mt-2 mt-md-0">
                            <label htmlFor="state" className="form-label mb-1">State <span className="text-danger">*</span></label>
                            <select id="state" className="form-select" value={data.state} onChange={(e) => setData({ ...data, state: e.target.value })} required>
                                <option>Choose..</option>
                                <option value='abia'>Abia</option>
                                <option value='adamawa'>Adamawa</option>
                                <option value='akwa ibom'>Akwa Ibom</option>
                                <option value='anambra'>Anambra</option>
                                <option value='bauchi'>Bauchi</option>
                                <option value='bayelsa'>Bayelsa</option>
                                <option value='benue'>Benue</option>
                                <option value='borno'>Borno</option>
                                <option value='cross river'>Cross River</option>
                                <option value='delta'>Delta</option>
                                <option value='ebonyi'>Ebonyi</option>
                                <option value='edo'>Edo</option>
                                <option value='enugu'>Ekiti</option>
                                <option value='enugu'>Enugu</option>
                                <option value='fct'>FCT</option>
                                <option value='gombe'>Gombe</option>
                                <option value='imo'>Imo</option>
                                <option value='jigawa'>Jigawa</option>
                                <option value='kaduna'>Kaduna</option>
                                <option value='kano'>Kano</option>
                                <option value='katsina'>Katsina</option>
                                <option value='kebbi'>Kebbi</option>
                                <option value='kogi'>Kogi</option>
                                <option value='kwara'>Kwara</option>
                                <option value='lagos'>Lagos</option>
                                <option value='nassarawa'>Nassarawa</option>
                                <option value='niger'>Niger</option>
                                <option value='ogun'>Ogun</option>
                                <option value='odo'>Odo</option>
                                <option value='osun'>Osun</option>
                                <option value='oyo'>Oyo</option>
                                <option value='plateau'>Plateau</option>
                                <option value='rivers'>Rivers</option>
                                <option value='sokoto'>Sokoto</option>
                                <option value='taraba'>Taraba</option>
                                <option value='yobe'>Yobe</option>
                                <option value='zamfara'>Zamfara</option>
                            </select>
                        </div>
                        <div className="col-md-6 mt-2 mt-md-0">
                            <label htmlFor="gender" className="form-label mb-1">Local Government Area <span className="text-danger">*</span></label>
                            <select id="gender" className="form-select" value={data.lga} onChange={(e) => setData({ ...data, lga: e.target.value })} required>
                                <option>Choose..</option>
                                <option>Error Loading LGAs</option>
                            </select>
                        </div>
                    </div>

                    <label htmlFor="address" className="form-label mb-1 mt-2">Address <span className="text-danger">*</span></label>
                    <input type="text" id="address" className="form-control" value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} required />


                    <p className="title-4 mt-4 mb-2">Other Information</p>
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="nin" className="form-label mb-1">NIN <span className="text-danger">*</span></label>
                            <input type="text" id="nin" className="form-control" value={data.nin} onChange={(e) => setData({ ...data, nin: e.target.value })} />
                        </div>
                        <div className="col-md-8 mt-2 mt-md-0">
                            <label htmlFor="picture" className="form-label mb-1">Picture <span className="text-danger">*</span></label>
                            <input type="file" id="picture" className="form-control" onChange={(e) => setData({ ...data, picture: e.target.value })} />
                        </div>
                    </div>


                    <p className="title-4 mt-4 mb-2">Education Information</p>
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="qualification" className="form-label mb-1">Highest Qualification <span className="text-danger">*</span></label>
                            <select id="qualification" className="form-select" value={data.qualification} onChange={(e) => setData({ ...data, qualification: e.target.value })} required>
                                <option>Choose..</option>
                                <option value="Masters Degree">Masters Degree</option>
                                <option value="Bachelor's Degree">Bachelor's Degree</option>
                                <option value="HND">HND</option>
                                <option value="ND">ND</option>
                                <option value="NCE">NCE</option>
                                <option value="SSCE">SSCE</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className="col-md-8 mt-2 mt-md-0">
                            <label htmlFor="course" className="form-label mb-1">Course / Specialization <span className="text-danger">*</span></label>
                            <input type="text" id="course" className="form-control" value={data.course} onChange={(e) => setData({ ...data, course: e.target.value })} required />
                        </div>
                    </div>

                    <label htmlFor="school" className="form-label mb-1 mt-2">School <span className="text-danger">*</span></label>
                    <input type="text" id="school" className="form-control" value={data.school} onChange={(e) => setData({ ...data, school: e.target.value })} required />



                    <p className="title-4 mt-4 mb-2">Next Of Kin Information</p>
                    <div className="row">
                        <div className="col-md-8">
                            <label htmlFor="k-name" className="form-label mb-1">Name <span className="text-danger">*</span></label>
                            <input type="text" id="k-name" className="form-control" value={data.kName} onChange={(e) => setData({ ...data, kName: e.target.value })} required />
                        </div>
                        <div className="col-md-4 mt-2 mt-md-0">
                            <label htmlFor="relation" className="form-label mb-1">Relation <span className="text-danger">*</span></label>
                            <select id="relation" className="form-select" value={data.relation} onChange={(e) => setData({ ...data, relation: e.target.value })} required>
                                <option>Choose..</option>
                                <option value="father">Father</option>
                                <option value="mother">Mother</option>
                                <option value="grandfather">GrandFather</option>
                                <option value="grandmother">GrandMother</option>
                                <option value="uncle">Uncle</option>
                                <option value="aunty">Aunty</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mt-2">
                            <label htmlFor="k-number" className="form-label mb-1">Phone Number <span className="text-danger">*</span></label>
                            <input type="text" id="k-number" className="form-control" value={data.kNo} onChange={(e) => setData({ ...data, kNo: e.target.value })} required />
                        </div>
                        <div className="col-md-6 mt-2">
                            <label htmlFor="occupation" className="form-label mb-1">Occupation <span className="text-danger">*</span></label>
                            <input type="text" id="occupation" className="form-control" value={data.occupation} onChange={(e) => setData({ ...data, occupation: e.target.value })} required />
                        </div>
                    </div>

                    <label htmlFor="k-address" className="form-label mb-1 mt-2">Address <span className="text-danger">*</span></label>
                    <input type="text" id="k-address" className="form-control" value={data.kAdd} onChange={(e) => setData({ ...data, kAdd: e.target.value })} required />



                    <p className="title-4 mt-4 mb-2">Employment Information</p>
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="department" className="form-label mb-1">Department <span className="text-danger">*</span></label>
                            <input type="text" id="department" className="form-control" value={data.department} onChange={(e) => setData({ ...data, department: e.target.value })} required />
                        </div>
                        <div className="col-md-6 mt-2 mt-md-0">
                            <label htmlFor="position" className="form-label mb-1">Position <span className="text-danger">*</span></label>
                            <select id="position" className="form-select" value={data.position} onChange={(e) => setData({ ...data, position: e.target.value })} required>
                                <option>Choose..</option>
                                <option value="MD">MD</option>
                                <option value="Principal">Principal</option>
                                <option value="Vice Principal">Vice Principal</option>
                                <option value="Headmaster">Headmaster</option>
                                <option value="Deputy Headmaster">Deputy Headmaster</option>
                                <option value="Senior Officer">Senior Officer</option>
                                <option value="Exam Officer">Exam Officer</option>
                                <option value="IT Officer">IT Officer</option>
                                <option value="Teacher">Teacher</option>
                                <option value="Other">Other</option>
                                <option value="Nanny">Nanny</option>
                                <option value="Security">Security</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 mt-2">
                            <label htmlFor="type" className="form-label mb-1">Type <span className="text-danger">*</span></label>
                            <select id="type" className="form-select" value={data.type} onChange={(e) => setData({ ...data, type: e.target.value })} required>
                                <option>Choose..</option>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                            </select>
                        </div>
                        <div className="col-md-4 mt-2">
                            <label htmlFor="category" className="form-label mb-1">Category <span className="text-danger">*</span></label>
                            <select id="category" className="form-select" value={data.category} onChange={(e) => setData({ ...data, category: e.target.value })} required>
                                <option>Choose..</option>
                                <option value="Academic">Academic</option>
                                <option value="Non Academic">Non Academic</option>
                            </select>
                        </div>
                        <div className="col-md-4 mt-2">
                            <label htmlFor="date" className="form-label mb-1">Employment Date <span className="text-danger">*</span></label>
                            <input type="date" id="date" className="form-control" value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} required />
                        </div>
                    </div>

                    <div className="text-center mt-3">
                        <button type="submit" className="btn btn-primary text-center py-1 me-1">Submit</button>
                    </div>
                </form>
            </>
        )
    }


    return (
        <>
            <div className="page">
                <h4 className="page-title">Staffs</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container'><Link className='page-link' to="/dashboard">Home</Link ><span className="slash">/</span><Link className='page-link' to="/staffs">Staffs</Link ><span className="slash">/</span></span>
                    <span className="current-path"><span style={{ textTransform: 'capitalize' }}>{action}</span></span>
                </p>
            </div>

            <div className="container-fluid pb-4">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-10 col-lg-8">
                        <div className="public-container">
                            {content}
                        </div>
                    </div>
                </div>
            </div>

            <ScrollTop />
        </>
    )
}

export default StaffsParams3;