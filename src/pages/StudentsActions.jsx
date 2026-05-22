import { useForm } from "react-hook-form";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import ScrollTop from "../components/ScrollTop";
import { useState } from "react";
import { useStudent } from "../context/StudentContext";

function StudentsParams() {

    const { action } = useParams();
    const { id } = useParams();
    const { studentsData, setStudentsData, setIsActive } = useStudent();
    const [currentStudent, setCurrentStudent] = useState(studentsData.find((student) => student.id === Number(id)));
    const navigate = useNavigate();
    const adminDetails = localStorage.getItem('user-details') ? JSON.parse(localStorage.getItem('user-details')) : '';

    function handleSubmit(e) {
        e.preventDefault();

        if (action === 'edit') {
            setStudentsData(studentsData.map((data) => (data.id === Number(id)) ? currentStudent : data));
            navigate('/students');
        }
    }

    function deactivateStudent(id) {
        setStudentsData(studentsData.map((student) => student.id === Number(id) ? { ...student, status: 'inactive' } : student));
        navigate('/students');
    }


    return (
        <>
            <div className="page">
                <h4 className="page-title">Students</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container'><Link className='page-link' to="/dashboard">Home</Link ><span className="slash">/</span><Link className='page-link' to="/students">Students</Link ><span className="slash">/</span></span>
                    <span className="current-path"><span style={{ textTransform: 'capitalize' }}>{action}</span> Student</span>
                </p>
            </div>

            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-10 col-lg-8">
                        <div className="public-container">
                            {
                                action === 'edit' ?
                                    <>
                                        <h3 className="title-2 mt-3 text-center">Edit Student</h3>

                                        <form className="student-form" onSubmit={(e) => handleSubmit(e)}>
                                            <p className="title-4 mb-2">Student Information</p>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <label htmlFor="first" className="form-label mb-1">First Name <span className="text-danger">*</span></label>
                                                    <input type="text" id="first" className="form-control" value={currentStudent.fName} onChange={(e) => setCurrentStudent({ ...currentStudent, fName: e.target.value })} required />
                                                </div>
                                                <div className="col-md-4 mt-2 mt-md-0">
                                                    <label htmlFor="middle" className="form-label mb-1">Middle Name <span className="text-danger">*</span></label>
                                                    <input type="text" id="middle" className="form-control" value={currentStudent.mName} onChange={(e) => setCurrentStudent({ ...currentStudent, mName: e.target.value })} />
                                                </div>
                                                <div className="col-md-4 mt-2 mt-md-0">
                                                    <label htmlFor="last" className="form-label mb-1">Last Name <span className="text-danger">*</span></label>
                                                    <input type="text" id="last" className="form-control" value={currentStudent.lName} onChange={(e) => setCurrentStudent({ ...currentStudent, lName: e.target.value })} required />
                                                </div>
                                            </div>

                                            <div className="row mt-0 mt-md-2">
                                                <div className="col-md-4 mt-2 mt-md-0">
                                                    <label htmlFor="regno" className="form-label mb-1">Registration Number</label>
                                                    <input type="text" id="regno" className="form-control" value={currentStudent.regno} onChange={(e) => setCurrentStudent({ ...currentStudent, regno: e.target.value })} required />
                                                </div>
                                                <div className='col-md-4 mt-2 mt-md-0'>
                                                    <label htmlFor="dob" className="form-label mb-1">Date of birth <span className="text-danger">*</span></label>
                                                    <input type="date" id="dob" className="form-control" value={currentStudent.dob} onChange={(e) => setCurrentStudent({ ...currentStudent, dob: e.target.value })} required />
                                                </div>
                                                <div className='col-md-4 mt-2 mt-md-0'>
                                                    <label htmlFor="gender" className="form-label mb-1">Gender <span className="text-danger">*</span></label>
                                                    <select id="gender" className="form-select" value={currentStudent.gender} onChange={(e) => setCurrentStudent({ ...currentStudent, gender: e.target.value })} required>
                                                        <option>Choose..</option>
                                                        <option value='Female'>Female</option>
                                                        <option value='Male'>Male</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="row mt-0 mt-md-2">
                                                <div className="col-md-6 mt-2 mt-md-0">
                                                    <label htmlFor="state" className="form-label mb-1">State <span className="text-danger">*</span></label>
                                                    <select id="state" className="form-select" value={currentStudent.state} onChange={(e) => setCurrentStudent({ ...currentStudent, state: e.target.value })} required>
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
                                                    <select id="gender" className="form-select" value={currentStudent.lga} onChange={(e) => setCurrentStudent({ ...currentStudent, lga: e.target.value })} required>
                                                        <option>Choose..</option>
                                                        <option>Error loading LGAs</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <label htmlFor="address" className="form-label mb-1 mt-2">Address <span className="text-danger">*</span></label>
                                            <input type="text" id="address" className="form-control" value={currentStudent.address} onChange={(e) => setCurrentStudent({ ...currentStudent, address: e.target.value })} required />


                                            <p className="title-4 mt-4 mb-2">Guardian Information</p>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <label htmlFor="g-name" className="form-label mb-1">Name <span className="text-danger">*</span></label>
                                                    <input type="text" id="g-name" className="form-control" value={currentStudent.gName} onChange={(e) => setCurrentStudent({ ...currentStudent, gName: e.target.value })} required />
                                                </div>
                                                <div className="col-md-4 mt-2 mt-md-0">
                                                    <label htmlFor="relation" className="form-label mb-1">Relation <span className="text-danger">*</span></label>
                                                    <select id="relation" className="form-select" value={currentStudent.relation} onChange={(e) => setCurrentStudent({ ...currentStudent, relation: e.target.value })} required>
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
                                                <div className="col-md-12 mt-2">
                                                    <label htmlFor="p-number" className="form-label mb-1">Phone Number <span className="text-danger">*</span></label>
                                                    <input type="text" id="p-number" className="form-control" value={currentStudent.pNo} onChange={(e) => setCurrentStudent({ ...currentStudent, pNo: e.target.value })} required />
                                                </div>
                                                <div className="col-md-12 mt-2">
                                                    <label htmlFor="w-number" className="form-label mb-1">Whatsapp Number <span className="text-danger">*</span></label>
                                                    <input type="text" id="w-number" className="form-control" value={currentStudent.wNo} onChange={(e) => setCurrentStudent({ ...currentStudent, wNo: e.target.value })} required />
                                                </div>
                                            </div>

                                            <label htmlFor="email" className="form-label mb-1 mt-2">Email <span className="text-danger">*</span></label>
                                            <input type="email" id="email" className="form-control" value={currentStudent.email} onChange={(e) => setCurrentStudent({ ...currentStudent, email: e.target.value })} required />

                                            <label htmlFor="g-address" className="form-label mb-1 mt-2">Address <span className="text-danger">*</span></label>
                                            <input type="text" id="g-address" className="form-control" value={currentStudent.gAdd} onChange={(e) => setCurrentStudent({ ...currentStudent, gAdd: e.target.value })} required />

                                            <div className="text-center mt-3">
                                                <button type="submit" className="btn btn-primary text-center py-1 me-1">Submit</button>
                                                <Link to={`/students/view/${id}`} className="btn btn-primary text-center py-1 ms-1"><i className="bi bi-eye"></i> View</Link>
                                            </div>
                                        </form>
                                    </> :
                                    <>
                                        <h3 className="title-2 mt-3 text-center">Student Information</h3>

                                        <div className="student-form">
                                            <p className="title-4 mb-2">Personal Information</p>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="public-border">
                                                        <span className="public-label">First Name : </span>
                                                        <span className="public-input">{currentStudent.fName}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-3 mt-md-0">
                                                    <div className="public-border">
                                                        <span className="public-label">Middle Name : </span>
                                                        <span className="public-input">{currentStudent.mName}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-3 mt-md-0">
                                                    <div className="public-border">
                                                        <span className="public-label">Last Name : </span>
                                                        <span className="public-input">{currentStudent.lName}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mt-md-3">
                                                <div className="col-md-6 mt-3 mt-md-0">
                                                    <div className="public-border">
                                                        <span className="public-label">Date of Birth : </span>
                                                        <span className="public-input">{currentStudent.dob}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mt-3 mt-md-0">
                                                    <div className="public-border">
                                                        <span className="public-label">Gender : </span>
                                                        <span className="public-input">{currentStudent.gender}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mt-md-3">
                                                <div className="col-md-6 mt-3 mt-md-0">
                                                    <div className="public-border">
                                                        <span className="public-label">State : </span>
                                                        <span className="public-input">{currentStudent.state}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mt-3 mt-md-0">
                                                    <div className="public-border">
                                                        <span className="public-label">L.G.A : </span>
                                                        <span className="public-input">{currentStudent.lga}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="public-border mt-3">
                                                <span className="public-label">Address : </span>
                                                <span className="public-input">{currentStudent.address}</span>
                                            </div>


                                            <p className="title-4 mt-3 mb-2">Academic Information</p>
                                            <div className="row">
                                                <div className="col-md-6 mt-3 mt-md-0">
                                                    <div className="public-border">
                                                        <span className="public-label">Reg. No : </span>
                                                        <span className="public-input">{currentStudent.regno}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mt-3 mt-md-0">
                                                    <div className="public-border">
                                                        <span className="public-label">Current Class : </span>
                                                        <span className="public-input">{currentStudent.class}</span>
                                                    </div>
                                                </div>
                                            </div>


                                            <p className="title-4 mt-3 mb-2">Guardian Information</p>
                                            <div className="row">
                                                <div className="col-md-8 mt-3 mt-md-0">
                                                    <div className="public-border">
                                                        <span className="public-label">Name : </span>
                                                        <span className="public-input">{currentStudent.gName}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-3 mt-md-0">
                                                    <div className="public-border">
                                                        <span className="public-label">Relation : </span>
                                                        <span className="public-input">{currentStudent.relation}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mt-md-3">
                                                <div className="col-md-6 mt-3 mt-md-0">
                                                    <div className="public-border">
                                                        <span className="public-label">Phone Number : </span>
                                                        <span className="public-input">{currentStudent.pNo}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mt-3 mt-md-0">
                                                    <div className="public-border">
                                                        <span className="public-label">WhatsApp Number : </span>
                                                        <span className="public-input">{currentStudent.wNo}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="public-border mt-3">
                                                <span className="public-label">Email : </span>
                                                <span className="public-input">{currentStudent.email}</span>
                                            </div>

                                            <div className="public-border mt-3">
                                                <span className="public-label">Address : </span>
                                                <span className="public-input">{currentStudent.gAdd}</span>
                                            </div>

                                            <hr />

                                            <div className="row">
                                                <div className="col-md-6 mt-3 mt-md-0">
                                                    <div className="public-border">
                                                        <span className="public-label">Status : </span>
                                                        <span className="public-input">{currentStudent.status}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mt-3 mt-md-0">
                                                    <div className="public-border">
                                                        <span className="public-label">Added On : </span>
                                                        <span className="public-input">{currentStudent.status}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="public-border mt-3">
                                                <span className="public-label">Added By : </span>
                                                <span className="public-input">{adminDetails.email}</span>
                                            </div>

                                            <div className="text-center mt-3">
                                                <Link to={`/students/edit/${id}`} className="btn btn-sm btn-primary py-1 me-1"><i className="bi bi-pencil-square"></i> Edit</Link>
                                                <button onClick={() => {
                                                    deactivateStudent(id);
                                                    setIsActive((prev) => !prev);
                                                }} className="btn btn-sm btn-warning py-1 ms-1"><i className="bi bi-person-slash"></i> Deactivate</button>
                                            </div>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div >

            <ScrollTop />
        </>
    )
}

export default StudentsParams;