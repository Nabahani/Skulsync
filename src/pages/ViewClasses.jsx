import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import ScrollTop from "../components/ScrollTop";
import { useStudent } from "../context/StudentContext";

function ViewClasses() {

    const { cls } = useParams();
    const navigate = useNavigate();
    let currentClass;
    switch (cls) {
        case 'ss3':
            currentClass = 'SS 3';
            break;
        case 'ss2':
            currentClass = 'SS 2';
            break;
        case 'ss1':
            currentClass = 'SS 1';
            break;
        case 'jss3':
            currentClass = 'Jss 3';
            break;
        case 'jss2':
            currentClass = 'Jss 2';
            break;
        case 'jss1':
            currentClass = 'Jss 1';
            break;
        case 'primary5':
            currentClass = 'Primary 5';
            break;
        case 'primary4':
            currentClass = 'Primary 4';
            break;
        case 'primary3':
            currentClass = 'Primary 3';
            break;
        case 'primary2':
            currentClass = 'Primary 2';
            break;
        case 'primary1':
            currentClass = 'Primary 1';
            break;
        case 'nursery2':
            currentClass = 'Nursery 2';
            break;
        case 'nursery1':
            currentClass = 'Nursery 1';
            break;
        case 'prenursery':
            currentClass = 'Pre Nursery';
            break;
        default:
            currentClass = cls;
    }


    const { studentsData, setStudentsData } = useStudent();
    const [add, setAdd] = useState(false);
    const currentClassStudent = studentsData.filter((students) => students.class === currentClass);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const [toggleActions, setToggleActions] = useState(false);
    const [toggleActionsById, setToggleActionsById] = useState(0);
    const [searchStudents, setSearchStudents] = useState('');
    const filteredStudents = currentClassStudent.filter((data) => {
        const searchString = searchStudents.toLowerCase().trim();

        if (!searchString) return true;

        return (
            String(data.id ?? '').toLowerCase().includes(searchString) ||
            (data.regno ?? '').toLowerCase().includes(searchString) ||
            (data.fName ?? '').toLowerCase().includes(searchString) ||
            (data.mName ?? '').toLowerCase().includes(searchString) ||
            (data.lName ?? '').toLowerCase().includes(searchString) ||
            (data.gender ?? '').toLowerCase().includes(searchString) ||
            (data.dob ?? '').toLowerCase().includes(searchString) ||
            (data.class ?? '').toLowerCase().includes(searchString) ||
            (data.status ?? '').toLowerCase().includes(searchString)
        );
    });
    const currentPageItems = filteredStudents.slice(firstIndex, lastIndex);
    const isFiltered = searchStudents !== '';
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
    const [num, setNum] = useState(1);
    const sessions = localStorage.getItem('sessions-data') ? JSON.parse(localStorage.getItem('sessions-data')) : [];
    const currentSession = sessions.find((session) => session.status === 'active');
    const activeSession = `${new Date().getFullYear() - 1}/${new Date().getFullYear()}`;
    const terms = localStorage.getItem('terms-data') ? JSON.parse(localStorage.getItem('terms-data')) : [];
    const currentTerm = terms.find((term) => term.status === 'Active');

    const deactivateStudent = (id) => {
        setStudentsData((data) => {
            return data.map((student) => {
                if (student.id === id) {
                    const modifiedStatus = student.status === 'active' ? 'inactive' : 'active';
                    return { ...student, status: modifiedStatus }
                }

                return student;
            })
        });
    };

    const deleteStudent = (id) => {
        setStudentsData(studentsData.filter(data => data.id !== id));
    }

    useEffect(() => {
        setCurrentPage(1);
    }, [searchStudents]);

    return (
        <>
            <div className="page">
                <h4 className="page-title">Classes</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container'><Link className='page-link' to="/dashboard">Home</Link ><span className="slash">/</span></span>
                    <span className='link-container'><Link className='page-link' to="/classes">Classes</Link ><span className="slash">/</span></span>
                    <span className="current-path"><span style={{ textTransform: 'capitalize' }}></span> {currentClass}</span>
                </p>
            </div>

            <div className="container-fluid px-3 pb-4">
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="small-container">
                            <div className="inner-container">
                                <h5 className="title-text">Class</h5>

                                <div className="d-flex align-items-center">
                                    <i className='bi bi-house-door-fill'></i>
                                    <div>
                                        <p className="bold-text small-text">{currentClass}</p>
                                        <p className="light-text"><span className="green-text text-info fw-semibold">Section:</span> Primary</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="small-container">
                            <div className="inner-container">
                                <h5 className="title-text">Students</h5>

                                <div className="d-flex align-items-center">
                                    <i className='bi bi-people-fill'></i>
                                    <div>
                                        <p className="bold-text small-text">{currentClassStudent.length}</p>
                                        <p className="light-text"><span className="green-text text-info fw-semibold">Master:</span> Unknown</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="small-container">
                            <div className="inner-container">
                                <h5 className="title-text">Session</h5>

                                <div className="d-flex align-items-center">
                                    <i className='bi bi-calendar-fill'></i>
                                    <div>
                                        <p className="bold-text small-text">{currentSession.title ?? ''}</p>
                                        <p className="light-text"><span className="green-text text-info fw-semibold">Term</span> {currentTerm.title ?? ''}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="public-container">
                            <div className="d-flex justify-content-between relative-container">
                                <h5 className="title-text">Students</h5>
                                <button type='button' className='actions' onClick={() => setAdd(prev => !prev)}>
                                    <i className="bi bi-three-dots-vertical"></i>
                                </button>

                                {
                                    add && <div className="add-student-container">
                                        <nav>
                                            <ul>
                                                <li onClick={() => {
                                                    navigate('/students/add');
                                                }}>
                                                    <Link><span className="add-icon custom text-black">+</span> <span className="add-text ms-4 fw-semibold">Add Student</span></Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                }
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
                                                        currentPageItems.map((data, index) => {

                                                            const isActive = data.status === 'active';
                                                            return (
                                                                <tr key={data.id}>
                                                                    <th>{firstIndex + index + 1}</th>
                                                                    <td>{data.regno}</td>
                                                                    <td>{data.fName} {data.mName} {data.lName}</td>
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
                                                                                    <button><i className={`bi bi-${isActive ? 'arrow-down' : 'arrow-up'}`}></i> {isActive ? 'Deactivate' : 'Activate'}</button>
                                                                                </li>
                                                                                <li>
                                                                                    <Link><i className="bi bi-x"></i> Suspend</Link>
                                                                                </li>
                                                                                <li onClick={() => deleteStudent(data.id)}>
                                                                                    <button><i className="bi bi-trash"></i> Delete</button>
                                                                                </li>
                                                                            </ul>
                                                                        </nav>}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
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
                                            <p className='entries-amount'>Showing {filteredStudents.length === 0 ? 0 : firstIndex + 1} to {Math.min(lastIndex, filteredStudents.length)} of {filteredStudents.length} entries {isFiltered && `(filtered from ${currentClassStudent.length} total entries)`}</p>
                                        </div>

                                        <div className="col-12 col-md-6 table-responsive">
                                            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ScrollTop />
        </>
    )
}

export default ViewClasses;