import { useForm } from "react-hook-form";
import { useParams, Link, useNavigate } from "react-router-dom";
import ScrollTop from "../components/ScrollTop";
import { useState, useEffect } from "react";
import { useStaffs } from "../context/StaffsContext";
import Pagination from "../components/Pagination";

function StaffsParams2() {
    const { action } = useParams();
    const navigate = useNavigate();
    const { staffsData, setStaffsData } = useStaffs();

    const expectedActions = [
        'add',
        'active',
        'academic',
        'non-academic',
        'full-time',
        'part-time'
    ];

    useEffect(() => {
        if (!expectedActions.includes(action)) {
            navigate('/404');
        }
    }, [action, navigate]);


    let currentStaffs = [];
    if (action === 'active') {
        currentStaffs = staffsData.filter((staffs) => staffs.status === 'Active');
    } else if (action === 'academic') {
        currentStaffs = staffsData.filter((staffs) => staffs.category === 'Academic');
    } else if (action === 'non-academic') {
        currentStaffs = staffsData.filter((staffs) => staffs.category === 'Non Academic');
    } else if (action === 'full-time') {
        currentStaffs = staffsData.filter((staffs) => staffs.type === 'Full-Time');
    } else if (action === 'part-time') {
        currentStaffs = staffsData.filter((staffs) => staffs.type === 'Part-Time');
    }

    const [searchStaffs, setSearchStaffs] = useState('');
    const filterSearchStaffs = currentStaffs.filter((data) => {
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
    const [data, setData] = useState({});
    const changeStaffStatus = (id) => {
        setStaffsData(staffsData.map((staff) => {
            if (staff.uniqueId === id) {
                const modifiedStatus = staff.status === 'Active' ? 'Inactive' : 'Active';
                return ({ ...staff, status: modifiedStatus });
            }

            return staff;
        }))
    };
    const deleteStaff = (id) => {
        setStaffsData(staffsData.filter((staffs) => staffs.uniqueId !== id));
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (action === 'add') {
            const newStaff = { ...data, id: `NSC-${new Date().getFullYear()}-${staffsData.length + 1}`, uniqueId: crypto.randomUUID(), status: 'Active' };
            setStaffsData([...staffsData, newStaff]);
            navigate('/staffs');
        }
    }

    let content;
    if (action === 'add') {
        content = (
            <>
                <div className="col-11 col-md-10 col-lg-8">
                    <div className="public-container">
                        <h3 className="title-2 mt-3 text-center">Add Staff</h3>

                        <form className="staff-form" onSubmit={(e) => handleSubmit(e)}>
                            <p className="title-4 mb-2">Personal Information</p>

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
                                <div className='col-md-4 mt-2 mt-md-0'>
                                    <label htmlFor="dob" className="form-label mb-1">Date of birth <span className="text-danger">*</span></label>
                                    <input type="date" id="dob" className="form-control" onChange={(e) => setData({ ...data, dob: e.target.value })} required />
                                </div>
                                <div className='col-md-4 mt-2 mt-md-0'>
                                    <label htmlFor="gender" className="form-label mb-1">Gender <span className="text-danger">*</span></label>
                                    <select id="gender" className="form-select" onChange={(e) => setData({ ...data, gender: e.target.value })} required>
                                        <option>Choose..</option>
                                        <option value='Female'>Female</option>
                                        <option value='Male'>Male</option>
                                    </select>
                                </div>
                                <div className='col-md-4 mt-2 mt-md-0'>
                                    <label htmlFor="marital-status" className="form-label mb-1">Marital Status <span className="text-danger">*</span></label>
                                    <select id="marital-status" className="form-select" onChange={(e) => setData({ ...data, maritalStatus: e.target.value })} required>
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
                                    <input type="text" id="phoneNo1" className="form-control" onChange={(e) => setData({ ...data, phoneNo1: e.target.value })} required />
                                </div>
                                <div className="col-md-6 mt-2 mt-md-0">
                                    <label htmlFor="phoneNo2" className="form-label mb-1">Phone Number 2 <span className="text-danger">*</span></label>
                                    <input type="text" id="phoneNo2" className="form-control" onChange={(e) => setData({ ...data, phoneNo2: e.target.value })} required />
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
                                        <option>Error Loading LGAs</option>
                                    </select>
                                </div>
                            </div>

                            <label htmlFor="address" className="form-label mb-1 mt-2">Address <span className="text-danger">*</span></label>
                            <input type="text" id="address" className="form-control" onChange={(e) => setData({ ...data, address: e.target.value })} required />


                            <p className="title-4 mt-4 mb-2">Other Information</p>
                            <div className="row">
                                <div className="col-md-4">
                                    <label htmlFor="nin" className="form-label mb-1">NIN <span className="text-danger">*</span></label>
                                    <input type="text" id="nin" className="form-control" onChange={(e) => setData({ ...data, nin: e.target.value })} />
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
                                    <select id="qualification" className="form-select" onChange={(e) => setData({ ...data, qualification: e.target.value })} required>
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
                                    <input type="text" id="course" className="form-control" onChange={(e) => setData({ ...data, course: e.target.value })} required />
                                </div>
                            </div>

                            <label htmlFor="school" className="form-label mb-1 mt-2">School <span className="text-danger">*</span></label>
                            <input type="text" id="school" className="form-control" onChange={(e) => setData({ ...data, school: e.target.value })} required />



                            <p className="title-4 mt-4 mb-2">Next Of Kin Information</p>
                            <div className="row">
                                <div className="col-md-8">
                                    <label htmlFor="k-name" className="form-label mb-1">Name <span className="text-danger">*</span></label>
                                    <input type="text" id="k-name" className="form-control" onChange={(e) => setData({ ...data, kName: e.target.value })} required />
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
                                <div className="col-md-6 mt-2">
                                    <label htmlFor="k-number" className="form-label mb-1">Phone Number <span className="text-danger">*</span></label>
                                    <input type="text" id="k-number" className="form-control" onChange={(e) => setData({ ...data, kNo: e.target.value })} required />
                                </div>
                                <div className="col-md-6 mt-2">
                                    <label htmlFor="occupation" className="form-label mb-1">Occupation <span className="text-danger">*</span></label>
                                    <input type="text" id="occupation" className="form-control" onChange={(e) => setData({ ...data, occupation: e.target.value })} required />
                                </div>
                            </div>

                            <label htmlFor="k-address" className="form-label mb-1 mt-2">Address <span className="text-danger">*</span></label>
                            <input type="text" id="k-address" className="form-control" onChange={(e) => setData({ ...data, kAdd: e.target.value })} required />



                            <p className="title-4 mt-4 mb-2">Employment Information</p>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="department" className="form-label mb-1">Department <span className="text-danger">*</span></label>
                                    <input type="text" id="department" className="form-control" onChange={(e) => setData({ ...data, department: e.target.value })} required />
                                </div>
                                <div className="col-md-6 mt-2 mt-md-0">
                                    <label htmlFor="position" className="form-label mb-1">Position <span className="text-danger">*</span></label>
                                    <select id="position" className="form-select" onChange={(e) => setData({ ...data, position: e.target.value })} required>
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
                                    <select id="type" className="form-select" onChange={(e) => setData({ ...data, type: e.target.value })} required>
                                        <option>Choose..</option>
                                        <option value="Full-Time">Full-Time</option>
                                        <option value="Part-Time">Part-Time</option>
                                    </select>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <label htmlFor="category" className="form-label mb-1">Category <span className="text-danger">*</span></label>
                                    <select id="category" className="form-select" onChange={(e) => setData({ ...data, category: e.target.value })} required>
                                        <option>Choose..</option>
                                        <option value="Academic">Academic</option>
                                        <option value="Non Academic">Non Academic</option>
                                    </select>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <label htmlFor="date" className="form-label mb-1">Employment Date <span className="text-danger">*</span></label>
                                    <input type="date" id="date" className="form-control" onChange={(e) => setData({ ...data, date: e.target.value })} required />
                                </div>
                            </div>

                            <div className="text-center mt-3">
                                <button type="submit" className="btn btn-primary text-center py-1 me-1">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    } else if (action === 'active' || action === 'academic' || action === 'non-academic' || action === 'full-time' || action === 'part-time') {
        content = (
            <>
                <div className="col-12">
                    <div className="public-container mx-1">
                        <div className="d-flex justify-content-between relative-container">
                            <h5 className="title-text">Staffs</h5>
                            <button type='button' className='btn btn-sm btn-primary' style={{ position: 'relative' }} onClick={() => navigate('/staffs/add')}>
                                <span className="add-icon">+</span> <span className="ms-4">Add Staff</span>
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
                                        <p className='entries-amount'>Showing {filterSearchStaffs.length === 0 ? 0 : firstIndex + 1} to {Math.min(lastIndex, filterSearchStaffs.length)} of {filterSearchStaffs.length} entries {isFiltered && `(filtered from ${currentStaffs.length} total entries)`}</p>
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
    }, [searchStaffs, itemsPerPage]);



    return (
        <>
            <div className="page">
                <h4 className="page-title">Staffs</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container'><Link className='page-link' to="/dashboard">Home</Link ><span className="slash">/</span><Link className='page-link' to="/staffs">Staffs</Link ><span className="slash">/</span></span>
                    <span className="current-path"><span style={{ textTransform: 'capitalize' }}>{action.replace('-', ' ')}</span></span>
                </p>
            </div>

            <div className="container-fluid pb-4">
                <div className="row justify-content-center">
                    {content}
                </div>
            </div>

            <ScrollTop />
        </>
    )
}

export default StaffsParams2;