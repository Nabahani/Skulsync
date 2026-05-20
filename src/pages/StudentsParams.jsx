import { useForm } from "react-hook-form";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import ScrollTop from "../components/ScrollTop";
import { useState } from "react";
import { useStudent } from "../context/StudentContext";

function StudentsParams() {

    const { studentsData, setStudentsData, currentStudent, setCurrentStudent } = useStudent();
    const navigate = useNavigate();
    const { action } = useParams();
    const data = {};

    function handleSubmit(e) {
        if (action === 'add') {
            e.preventDefault();
            setCurrentStudent({...currentStudent, status: 'active'});
            setCurrentStudent({...currentStudent, id: studentsData.length + 1});
            setStudentsData([...studentsData, currentStudent]);
            navigate('/students');
        } else if (action === 'edit') {

        }
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
                            <h3 className="title-2 mt-3 text-center">{action === 'add' ? 'Admit' : 'Edit'} Student</h3>

                            <form className="student-form" onSubmit={(e) => handleSubmit(e)}>
                                <p className="title-4 mb-2">Student Information</p>

                                <div className="row">
                                    <div className="col-md-4">
                                        <label htmlFor="first" className="form-label mb-1">First Name <span className="text-danger">*</span></label>
                                        <input type="text" id="first" className="form-control" value={currentStudent.fName} onChange={(e) => setCurrentStudent({...currentStudent, fName: e.target.value})} required />
                                    </div>
                                    <div className="col-md-4 mt-2 mt-md-0">
                                        <label htmlFor="middle" className="form-label mb-1">Middle Name <span className="text-danger">*</span></label>
                                        <input type="text" id="middle" className="form-control" value={currentStudent.mName} onChange={(e) => setCurrentStudent({...currentStudent, mName: e.target.value})} />
                                    </div>
                                    <div className="col-md-4 mt-2 mt-md-0">
                                        <label htmlFor="last" className="form-label mb-1">Last Name <span className="text-danger">*</span></label>
                                        <input type="text" id="last" className="form-control" value={currentStudent.lName} onChange={(e) => setCurrentStudent({...currentStudent, lName: e.target.value})} required />
                                    </div>
                                </div>

                                <div className="row mt-0 mt-md-2">
                                    { action === 'edit' && <div className="col-md-4 mt-2 mt-md-0">
                                        <label htmlFor="regno" className="form-label mb-1">Registration Number</label>
                                        <input type="text" id="regno" className="form-control" value={currentStudent.regno} onChange={(e) => setCurrentStudent({...currentStudent, regno: e.target.value})} required />
                                    </div>
                                    }
                                    <div className={`${action === 'edit' ? 'col-md-4' : 'col-md-6'} mt-2 mt-md-0`}>
                                        <label htmlFor="dob" className="form-label mb-1">Date of birth <span className="text-danger">*</span></label>
                                        <input type="date" id="dob" className="form-control" value={currentStudent.dob} onChange={(e) => setCurrentStudent({...currentStudent, dob: e.target.value})} required />
                                    </div>
                                    <div className={`${action === 'edit' ? 'col-md-4' : 'col-md-6'} mt-2 mt-md-0`}>
                                        <label htmlFor="gender" className="form-label mb-1">Gender <span className="text-danger">*</span></label>
                                        <select id="gender" className="form-select" value={currentStudent.gender} onChange={(e) => setCurrentStudent({...currentStudent, gender: e.target.value})} required>
                                            <option>Choose..</option>
                                            <option value='Female'>Female</option>
                                            <option value='Male'>Male</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row mt-0 mt-md-2">
                                    <div className="col-md-6 mt-2 mt-md-0">
                                        <label htmlFor="state" className="form-label mb-1">State <span className="text-danger">*</span></label>
                                        <select id="state" className="form-select" value={currentStudent.state} onChange={(e) => setCurrentStudent({...currentStudent, state: e.target.value})} required>
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
                                        <select id="gender" className="form-select" value={currentStudent.lga} onChange={(e) => setCurrentStudent({...currentStudent, lga: e.target.value})} required>
                                            <option>Choose..</option>
                                            <option>Error loading LGAs</option>
                                        </select>
                                    </div>
                                </div>

                                <label htmlFor="address" className="form-label mb-1 mt-2">Address <span className="text-danger">*</span></label>
                                <input type="text" id="address" className="form-control" value={currentStudent.address} onChange={(e) => setCurrentStudent({...currentStudent, address: e.target.value})} required />


                                <p className="title-4 mt-4 mb-2">Admission Information</p>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label htmlFor="regno" className="form-label mb-1">Registration Number</label>
                                        <input type="text" id="regno" className="form-control" value={currentStudent.regno} onChange={(e) => setCurrentStudent({...currentStudent, regno: e.target.value})} required />
                                    </div>
                                    <div className="col-md-4 mt-2 mt-md-0">
                                        <label htmlFor="class" className="form-label mb-1">Class <span className="text-danger">*</span></label>
                                        <select id="class" className="form-select" onChange={(e) => setCurrentStudent({...currentStudent, class: e.target.value})} required>
                                            <option>Choose..</option>
                                            <option value="ss3">SS 3</option>
                                            <option value="ss2">SS 2</option>
                                            <option value="ss1">SS 1</option>
                                            <option value="jss3">Jss 3</option>
                                            <option value="jss2">Jss 2</option>
                                            <option value="jss1">Jss 1</option>
                                            <option value="primary5">Primary 5</option>
                                            <option value="primary4">Primary 4</option>
                                            <option value="primary3">Primary 3</option>
                                            <option value="primary2">Primary 2</option>
                                            <option value="primary1">Primary 1</option>
                                            <option value="nursery2">Nursery 2</option>
                                            <option value="nursery1">Nursery 1</option>
                                            <option value="pre-nursery">Pre Nursery</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 mt-2 mt-md-0">
                                        <label htmlFor="session" className="form-label mb-1">Sessions <span className="text-danger">*</span></label>
                                        <input type="date" id="session" className="form-control" onChange={(e) => setCurrentStudent({...currentStudent, session: e.target.value})} required />
                                    </div>
                                </div>

                                <p className="title-4 mt-4 mb-2">Guardian Information</p>
                                <div className="row">
                                    <div className="col-md-8">
                                        <label htmlFor="g-name" className="form-label mb-1">Name <span className="text-danger">*</span></label>
                                        <input type="text" id="g-name" className="form-control" onChange={(e) => setCurrentStudent({...currentStudent,gName: e.target.value})} required />
                                    </div>
                                    <div className="col-md-4 mt-2 mt-md-0">
                                        <label htmlFor="relation" className="form-label mb-1">Relation <span className="text-danger">*</span></label>
                                        <select id="relation" className="form-select" onChange={(e) => setCurrentStudent({...currentStudent, gender: e.target.value})} required>
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
                                        <input type="text" id="p-number" className="form-control" onChange={(e) => setCurrentStudent({...currentStudent, pNo: e.target.value})} required />
                                    </div>
                                    <div className="col-md-12 mt-2">
                                        <label htmlFor="w-number" className="form-label mb-1">Whatsapp Number <span className="text-danger">*</span></label>
                                        <input type="text" id="w-number" className="form-control" onChange={(e) => setCurrentStudent({...currentStudent, wNo: e.target.value})} required />
                                    </div>
                                </div>

                                <label htmlFor="email" className="form-label mb-1 mt-2">Email <span className="text-danger">*</span></label>
                                <input type="email" id="email" className="form-control" onChange={(e) => setCurrentStudent({...currentStudent, email: e.target.value})} required />

                                <label htmlFor="g-address" className="form-label mb-1 mt-2">Address <span className="text-danger">*</span></label>
                                <input type="text" id="g-address" className="form-control" onChange={(e) => setCurrentStudent({...currentStudent, gAdd: e.target.value})} required />

                                <div className="text-center mt-3">
                                    <button type="submit" className="btn btn-primary text-center">Submit</button>
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

export default StudentsParams;