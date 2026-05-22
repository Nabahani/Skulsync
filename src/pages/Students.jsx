import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useStudent } from "../context/StudentContext";

function Students() {

    const { studentsData, setStudentsData, setCurrentStudent, setCurrentStudentId } = useStudent();
    const [searchStudents, setSearchStudents] = useState('');
    const [showStudentsFilter, setShowStudentsFilter] = useState(false);
    const filterSearchStudents = studentsData.filter((data) => {
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
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentPageItems = filterSearchStudents.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filterSearchStudents.length / itemsPerPage);
    const isFiltered =searchStudents.trim() !== '';
    const [toggleActions, setToggleActions] = useState(false);
    const [toggleActionsById, setToggleActionsById] = useState(0);
    const [add, setAdd] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const navigate = useNavigate();

    const deleteStudent = (id) => {
        setStudentsData(studentsData.filter((data) => data.id !== id))
    }
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


    useEffect(() => {
        localStorage.setItem('students', JSON.stringify(studentsData));
    }, [studentsData]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchStudents]);


    return (
        <>
            <div className="page">
                <h4 className="page-title">Students</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container'><Link className='page-link' to="/dashboard">Home</Link ><span className="slash">/</span></span>
                    <span className="current-path">Students</span>
                </p>
            </div>

            <div className="container-fluid px-3 pb-4">
                <div className="row g-4">
                    <div className="col-sm-6 col-lg-3">
                        <div className="small-container">
                            <Link className='inner-link' to='/students'>
                                <div className="inner-container">
                                    <h5 className="title-text">All Students</h5>

                                    <div className="d-flex align-items-center">
                                        <i className='bi bi-people-fill'></i>
                                        <div>
                                            <p className="bold-text">277</p>
                                            <p className="light-text"><span className="green-text">277</span> Students</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="small-container">
                            <Link className='inner-link' to='/students/active'>
                                <div className="inner-container">
                                    <h5 className="title-text">Active Students</h5>

                                    <div className="d-flex align-items-center">
                                        <i className='bi bi-people-fill'></i>
                                        <div>
                                            <p className="bold-text">254</p>
                                            <p className="light-text"><span className="green-text">254</span> Students</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="small-container">
                            <Link className='inner-link' to='/students/inactive'>
                                <div className="inner-container">
                                    <h5 className="title-text">Inactive Students</h5>

                                    <div className="d-flex align-items-center">
                                        <i className='bi bi-people-fill'></i>
                                        <div>
                                            <p className="bold-text">23</p>
                                            <p className="light-text"><span className="green-text">23</span> Students</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="small-container">
                            <Link className='inner-link' to='/students/alumni'>
                                <div className="inner-container">
                                    <h5 className="title-text">Alumni Students</h5>

                                    <div className="d-flex align-items-center">
                                        <i className='bi bi-people-fill'></i>
                                        <div>
                                            <p className="bold-text">0</p>
                                            <p className="light-text"><span className="green-text">0</span> Students</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
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
                                                    <Link><span className="add-icon">+</span> <span className="add-text">Add Student</span></Link>
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
                                                        currentPageItems.map((data) => (
                                                            <tr key={data.id}>
                                                                <th>{data.id}</th>
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
                </div>
            </div>
        </>
    )
}

export default Students;