import { useForm } from "react-hook-form";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import ScrollTop from "../components/ScrollTop";
import { useState, useEffect } from "react";
import { useStudent } from "../context/StudentContext";
import Pagination from "../components/Pagination";

function StudentsAdd() {
    const { action } = useParams();
    const { studentsData, setStudentsData } = useStudent();

    let currentStudents;
    if (action === 'active') {
        currentStudents = studentsData.filter((students) => students.status === 'active');
    } else if (action === 'inactive') {
        currentStudents = studentsData.filter((students) => students.status === 'inactive');
    } else if (action === 'alumni') {
        currentStudents = studentsData.filter((students) => students.status === 'alumni');
    }

    const [searchStudents, setSearchStudents] = useState('');
    const filterSearchStudents = currentStudents.filter((data) => {
        const searchString = searchStudents.toLowerCase().trim();

        if (!searchString) return true;

        return (
            String(data.id).includes(searchString) ||
            (data.regno.toLowerCase()).includes(searchString) ||
            (data.fName.toLowerCase()).includes(searchString) ||
            (data.mName.toLowerCase()).includes(searchString) ||
            (data.lName.toLowerCase()).includes(searchString) ||
            (data.gender.toLowerCase()).includes(searchString) ||
            (data.dob.toLowerCase()).includes(searchString) ||
            (data.class.toLowerCase()).includes(searchString) ||
            (data.status.toLowerCase()).includes(searchString)
        );
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentPageItems = filterSearchStudents.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filterSearchStudents.length / itemsPerPage) || 1;
    const isFiltered = searchStudents.trim() !== '';
    const [toggleActions, setToggleActions] = useState(false);
    const [toggleActionsById, setToggleActionsById] = useState(0);
    const [data, setData] = useState({});
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (action === 'add') {
            const newStudent = { ...data, id: studentsData.length + 1, status: 'active' };
            setStudentsData([...studentsData, newStudent]);
            navigate('/students');
        } else {
        }
    }

    let content;
    if (action === 'add') {
        content = (
            <>
                <div className="col-11 col-md-10 col-lg-8">
                    <div className="public-container">
                        <h3 className="title-2 mt-3 text-center">{action === 'add' ? 'Admit' : 'Edit'} Student</h3>

                        <form className="student-form" onSubmit={(e) => handleSubmit(e)}>
                            <p className="title-4 mb-2">Student Information</p>

                            <div className="row">
                                <div className="col-md-4">
                                    <label htmlFor="first" className="form-label mb-1">First Name <span className="text-danger">*</span></label>
                                    <input type="text" id="first" className="form-control" onChange={(e) => setData({ ...data, fName: e.target.value })} required />
                                </div>
                                <div className="col-md-4 mt-2 mt-md-0">
                                    <label htmlFor="middle" className="form-label mb-1">Middle Name <span className="text-danger">*</span></label>
                                    <input type="text" id="middle" className="form-control" onChange={(e) => setData({ ...data, mName: e.target.value })} />
                                </div>
                                <div className="col-md-4 mt-2 mt-md-0">
                                    <label htmlFor="last" className="form-label mb-1">Last Name <span className="text-danger">*</span></label>
                                    <input type="text" id="last" className="form-control" onChange={(e) => setData({ ...data, lName: e.target.value })} required />
                                </div>
                            </div>

                            <div className="row mt-0 mt-md-2">
                                <div className='col-md-6 mt-2 mt-md-0'>
                                    <label htmlFor="dob" className="form-label mb-1">Date of birth <span className="text-danger">*</span></label>
                                    <input type="date" id="dob" className="form-control" onChange={(e) => setData({ ...data, dob: e.target.value })} required />
                                </div>
                                <div className='col-md-6 mt-2 mt-md-0'>
                                    <label htmlFor="gender" className="form-label mb-1">Gender <span className="text-danger">*</span></label>
                                    <select id="gender" className="form-select" onChange={(e) => setData({ ...data, gender: e.target.value })} required>
                                        <option>Choose..</option>
                                        <option value='Female'>Female</option>
                                        <option value='Male'>Male</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row mt-0 mt-md-2">
                                <div className="col-md-6 mt-2 mt-md-0">
                                    <label htmlFor="state" className="form-label mb-1">State <span className="text-danger">*</span></label>
                                    <select id="state" className="form-select" onChange={(e) => setData({ ...data, state: e.target.value })} required>
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
                                    <select id="gender" className="form-select" onChange={(e) => setData({ ...data, lga: e.target.value })} required>
                                        <option>Choose..</option>
                                        <option>Error loading LGAs</option>
                                    </select>
                                </div>
                            </div>

                            <label htmlFor="address" className="form-label mb-1 mt-2">Address <span className="text-danger">*</span></label>
                            <input type="text" id="address" className="form-control" onChange={(e) => setData({ ...data, address: e.target.value })} required />


                            <p className="title-4 mt-4 mb-2">Admission Information</p>
                            <div className="row">
                                <div className="col-md-4">
                                    <label htmlFor="regno" className="form-label mb-1">Registration Number</label>
                                    <input type="text" id="regno" className="form-control" onChange={(e) => setData({ ...data, regno: e.target.value })} required />
                                </div>
                                <div className="col-md-4 mt-2 mt-md-0">
                                    <label htmlFor="class" className="form-label mb-1">Class <span className="text-danger">*</span></label>
                                    <select id="class" className="form-select" onChange={(e) => setData({ ...data, class: e.target.value })} required>
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
                                    <input type="date" id="session" className="form-control" onChange={(e) => setData({ ...data, session: e.target.value })} required />
                                </div>
                            </div>

                            <p className="title-4 mt-4 mb-2">Guardian Information</p>
                            <div className="row">
                                <div className="col-md-8">
                                    <label htmlFor="g-name" className="form-label mb-1">Name <span className="text-danger">*</span></label>
                                    <input type="text" id="g-name" className="form-control" onChange={(e) => setData({ ...data, gName: e.target.value })} required />
                                </div>
                                <div className="col-md-4 mt-2 mt-md-0">
                                    <label htmlFor="relation" className="form-label mb-1">Relation <span className="text-danger">*</span></label>
                                    <select id="relation" className="form-select" onChange={(e) => setData({ ...data, relation: e.target.value })} required>
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
                                    <input type="text" id="p-number" className="form-control" onChange={(e) => setData({ ...data, pNo: e.target.value })} required />
                                </div>
                                <div className="col-md-12 mt-2">
                                    <label htmlFor="w-number" className="form-label mb-1">Whatsapp Number <span className="text-danger">*</span></label>
                                    <input type="text" id="w-number" className="form-control" onChange={(e) => setData({ ...data, wNo: e.target.value })} required />
                                </div>
                            </div>

                            <label htmlFor="email" className="form-label mb-1 mt-2">Email <span className="text-danger">*</span></label>
                            <input type="email" id="email" className="form-control" onChange={(e) => setData({ ...data, email: e.target.value })} required />

                            <label htmlFor="g-address" className="form-label mb-1 mt-2">Address <span className="text-danger">*</span></label>
                            <input type="text" id="g-address" className="form-control" onChange={(e) => setData({ ...data, gAdd: e.target.value })} required />

                            <div className="text-center mt-3">
                                <button type="submit" className="btn btn-primary text-center py-1 me-1">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    } else if (action === 'active' || action === 'inactive' || action === 'alumni') {
        content = (
            <>
                <div className="col-12">
                    <div className="public-container mx-1">
                        <div className="d-flex justify-content-between relative-container">
                            <h5 className="title-text">Students</h5>
                            <button type='button' className='btn btn-sm btn-primary' style={{ position: 'relative' }} onClick={() => navigate('/students/add')}>
                                <span className="add-icon">+</span> <span className="ms-4">Add Student</span>
                            </button>
                        </div>

                        <div className="px-1">
                            <div className="row">
                                <div className="col-12 col-sm-6">
                                    <label htmlFor="show" className="form-label my-1">Show:</label>
                                    <select name="show" id="show" value={itemsPerPage} className='form-select p-1 px-2' style={{ width: "90px" }} onChange={(e) => setItemsPerPage(e.target.value)}>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>

                                <div className="col-12 col-sm-6">
                                    <label htmlFor="search" className="form-label my-1">Search:</label>
                                    <input type="search" name="search" id="search" className="form-control p-1 px-2" style={{ width: "250px" }} onChange={(e) => setSearchStudents(e.target.value)} />
                                </div>
                            </div>

                            <div className="entries mt-3">
                                <label className="form-label entries-text mb-1">entries</label>

                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead>
                                            <tr>
                                                <th>S/N</th>
                                                <th>Reg No.</th>
                                                <th>Name</th>
                                                <th></th>
                                                <th></th>
                                                <th>Gender</th>
                                                <th>D.O.B</th>
                                                <th>Class</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                currentPageItems.length > 0 ?
                                                    currentPageItems.map((data) => (
                                                        <tr key={data.id}>
                                                            <th>{data.id}</th>
                                                            <td>{data.regno}</td>
                                                            <td>{data.name}</td>
                                                            <td></td>
                                                            <td></td>
                                                            <td>{data.gender}</td>
                                                            <td>{data.dob}</td>
                                                            <td>{data.class}</td>
                                                            <td><span className="green-status bg-success text-white rounded-pill fw-semibold">{data.status}</span></td>
                                                            <td className="actions">
                                                                <button type="button" className="actions" onClick={() => {
                                                                    setToggleActionsById(data.id);
                                                                    setToggleActions((prev) => !prev);
                                                                }}>
                                                                    <i className="bi bi-three-dots-vertical"></i>
                                                                </button>

                                                                {toggleActions && <nav className={`actions-button-container ${toggleActionsById === data.id ? 'd-block' : 'd-none'}`}>
                                                                    <ul>
                                                                        <li onClick={() => navigate(`/students/view/${data.id}`)}>
                                                                            <Link><i className="bi bi-eye"></i> View</Link>
                                                                        </li>
                                                                        <li onClick={() => navigate(`/students/edit/${data.id}`)}>
                                                                            <Link><i className="bi bi-pencil-square"></i> Edit</Link>
                                                                        </li>
                                                                        <li onClick={() => deactivateStudent(data.id)}>
                                                                            <button><i className="bi bi-arrow-down"></i> Deactivate</button>
                                                                        </li>
                                                                        <li>
                                                                            <Link><i className="bi bi-x"></i> Suspend</Link>
                                                                        </li>
                                                                        <li>
                                                                            <button><i className="bi bi-trash"></i> Delete</button>
                                                                        </li>
                                                                    </ul>
                                                                </nav>}
                                                            </td>
                                                        </tr>
                                                    ))
                                                    :
                                                    <tr>
                                                        <td colSpan={10}>No matching records found</td>
                                                    </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <p className='entries-amount'>Showing {filterSearchStudents.length === 0 ? 0 : firstIndex + 1} to {Math.min(lastIndex, filterSearchStudents.length)} of {filterSearchStudents.length} entries {isFiltered && `(filtered from ${studentsData.length} total entries)`}</p>
                                    </div>

                                    <div className="col-12 col-md-6 table-responsive">
                                        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    useEffect(() => {
        setCurrentPage(1);
    }, [searchStudents]);



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
                    {content}
                </div>
            </div>

            <ScrollTop />
        </>
    )
}

export default StudentsAdd;