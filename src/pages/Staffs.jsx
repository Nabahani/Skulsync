import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useStaffs } from "../context/StaffsContext";

function Staffs() {

    const { staffsData, setStaffsData, activeStaffs, academicStaffs, nonAcademicStaffs } = useStaffs();
    const [searchStaffs, setSearchStaffs] = useState('');
    const filterSearchStaffs = staffsData.filter((data) => {
        const searchString = searchStaffs.toLowerCase().trim();
        if (!searchString) return true;

        return (
            String(data.uniqueId ?? '').includes(searchString) ||
            (data.id ?? '').toLowerCase().includes(searchString) ||
            (data.fName ?? '').toLowerCase().includes(searchString) ||
            (data.mName ?? '').toLowerCase().includes(searchString) ||
            (data.lName ?? '').toLowerCase().includes(searchString) ||
            (data.department ?? '').toLowerCase().includes(searchString) ||
            (data.position ?? '').toLowerCase().includes(searchString) ||
            (data.category ?? '').toLowerCase().includes(searchString) ||
            (data.type ?? '').toLowerCase().includes(searchString) ||
            (data.status ?? '').toLowerCase().includes(searchString)
        );
    });


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentPageItems = filterSearchStaffs.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filterSearchStaffs.length / itemsPerPage) || 1;
    const isFiltered = searchStaffs.trim() !== '';
    const [toggleActions, setToggleActions] = useState(false);
    const [toggleActionsById, setToggleActionsById] = useState(0);
    const [add, setAdd] = useState(false);
    const navigate = useNavigate();

    const deleteStaff = (id) => {
        setStaffsData((prev) => prev.filter((data) => data.uniqueId !== id))
    }
    const changeStaffStatus = (id) => {
        setStaffsData((data) => {
            return data.map((staff) => {
                if (staff.uniqueId === id) {
                    const modifiedStatus = staff.status === 'Active' ? 'Inactive' : 'Active';
                    return { ...staff, status: modifiedStatus }
                }

                return staff;
            })
        });
    };


    useEffect(() => {
        localStorage.setItem('staffs', JSON.stringify(staffsData));
    }, [staffsData]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchStaffs, itemsPerPage]);


    return (
        <>
            <div className="page">
                <h4 className="page-title">Staffs</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container'><Link className='page-link' to="/dashboard">Home</Link ><span className="slash">/</span></span>
                    <span className="current-path">Staffs</span>
                </p>
            </div>

            <div className="container-fluid px-3 pb-4">
                <div className="row g-4">
                    <div className="col-sm-6 col-lg-3">
                        <div className="small-container">
                            <Link className='inner-link' to='/staffs'>
                                <div className="inner-container">
                                    <h5 className="title-text">All Staffs</h5>

                                    <div className="d-flex align-items-center">
                                        <i className='bi bi-people-fill'></i>
                                        <div>
                                            <p className="bold-text">{staffsData.length}</p>
                                            <p className="light-text"><span className="green-text">{staffsData.length}</span> Staffs</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="small-container">
                            <Link className='inner-link' to='/staffs/active'>
                                <div className="inner-container">
                                    <h5 className="title-text">Active Staffs</h5>

                                    <div className="d-flex align-items-center">
                                        <i className='bi bi-people-fill'></i>
                                        <div>
                                            <p className="bold-text">{activeStaffs.length}</p>
                                            <p className="light-text"><span className="green-text">{activeStaffs.length}</span> Staffs</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="small-container">
                            <Link className='inner-link' to='/staffs/academic'>
                                <div className="inner-container">
                                    <h5 className="title-text">Academic Staffs</h5>

                                    <div className="d-flex align-items-center">
                                        <i className='bi bi-people-fill'></i>
                                        <div>
                                            <p className="bold-text">{academicStaffs.length}</p>
                                            <p className="light-text"><span className="green-text">{academicStaffs.length}</span> Staffs</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="small-container">
                            <Link className='inner-link' to='/staffs/non-academic'>
                                <div className="inner-container">
                                    <h5 className="title-text">Non Academic Staffs</h5>

                                    <div className="d-flex align-items-center">
                                        <i className='bi bi-people-fill'></i>
                                        <div>
                                            <p className="bold-text">{nonAcademicStaffs.length}</p>
                                            <p className="light-text"><span className="green-text">{nonAcademicStaffs.length}</span> Staffs</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="public-container">
                            <div className="d-flex justify-content-between relative-container">
                                <h5 className="title-text">Staffs</h5>
                                <button type='button' className='actions' onClick={() => setAdd(prev => !prev)}>
                                    <i className="bi bi-three-dots-vertical"></i>
                                </button>

                                {
                                    add && <div className="add-student-container">
                                        <nav>
                                            <ul>
                                                <li onClick={() => {
                                                    navigate('/staffs/add');
                                                }}>
                                                    <Link><span className="add-icon text-black">+</span> <span className="add-text ps-4 fw-semibold">Add Staff</span></Link>
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
                                        <input type="search" name="search" id="search" className="form-control p-1 px-2" style={{ width: "250px" }} onChange={(e) => setSearchStaffs(e.target.value)} />
                                    </div>
                                </div>

                                <div className="entries mt-3">
                                    <label className="form-label entries-text mb-1">entries</label>

                                    <div className="table-responsive">
                                        <table className="table table-hover align-middle">
                                            <thead>
                                                <tr>
                                                    <th>S/N</th>
                                                    <th>#StaffID.</th>
                                                    <th>Name</th>
                                                    <th>Department</th>
                                                    <th>Position</th>
                                                    <th>Category</th>
                                                    <th>Type</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    currentPageItems.length > 0 ?
                                                        currentPageItems.map((data, index) => {
                                                            const isActive = data.status === 'Active';

                                                            return (
                                                                <tr key={data.uniqueId}>
                                                                    <th>{firstIndex + index + 1}</th>
                                                                    <td>{data.id}</td>
                                                                    <td>{data.fName} {data.mName} {data.lName}</td>
                                                                    <td>{data.department}</td>
                                                                    <td>{data.position}</td>
                                                                    <td>{data.category}</td>
                                                                    <td>{data.type}</td>
                                                                    <td><span className="green-status bg-success text-white rounded-pill fw-semibold">{data.status}</span></td>
                                                                    <td className="actions">
                                                                        <button type="button" className="actions" onClick={() => {
                                                                            setToggleActionsById(data.uniqueId);
                                                                            setToggleActions((prev) => !prev);
                                                                        }}>
                                                                            <i className="bi bi-three-dots-vertical"></i>
                                                                        </button>

                                                                        {
                                                                            toggleActions && <nav className={`actions-button-container ${toggleActionsById === data.uniqueId ? 'd-block' : 'd-none'}`}>
                                                                                <ul>
                                                                                    <li onClick={() => navigate(`/staffs/view/${data.id}`)}>
                                                                                        <Link><i className="bi bi-eye"></i> View</Link>
                                                                                    </li>
                                                                                    <li onClick={() => navigate(`/staffs/edit/${data.id}`)}>
                                                                                        <Link><i className="bi bi-pencil-square"></i> Edit</Link>
                                                                                    </li>
                                                                                    <li onClick={() => {
                                                                                        changeStaffStatus(data.uniqueId);
                                                                                    }}>
                                                                                        <button><i className={`bi bi-${isActive ? 'arrow-down' : 'arrow-up'}`}></i> {isActive ? 'Deactivate' : 'Activate'}</button>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link><i className="bi bi-x"></i> Suspend</Link>
                                                                                    </li>
                                                                                    <li onClick={() => deleteStaff(data.uniqueId)}>
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
                                            <p className='entries-amount'>Showing {filterSearchStaffs.length === 0 ? 0 : firstIndex + 1} to {Math.min(lastIndex, filterSearchStaffs.length)} of {filterSearchStaffs.length} entries {isFiltered && `(filtered from ${staffsData.length} total entries)`}</p>
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
            </div >
        </>
    )
}

export default Staffs;