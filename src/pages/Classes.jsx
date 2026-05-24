import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import ScrollTop from "../components/ScrollTop";

function Classes() {

    const navigate = useNavigate();
    const [classes, setClasses] = useState(localStorage.getItem('classes') ? JSON.parse(localStorage.getItem('classes')) : [
        {
            id: 1,
            title: 'SS 3',
            section: 'Secondary',
            program: 'General',
            status: 'active',
        },
        {
            id: 2,
            title: 'SS 2',
            section: 'Secondary',
            program: 'General',
            status: 'active',
        },
        {
            id: 3,
            title: 'SS 1',
            section: 'Secondary',
            program: 'General',
            status: 'active',
        },
        {
            id: 4,
            title: 'Jss 3',
            section: 'Secondary',
            program: 'General',
            status: 'active',
        },
        {
            id: 5,
            title: 'Jss 2',
            section: 'Secondary',
            program: 'General',
            status: 'active',
        },
        {
            id: 6,
            title: 'Jss 1',
            section: 'Secondary',
            program: 'General',
            status: 'active',
        },
        {
            id: 7,
            title: 'Primary 5',
            section: 'Primary',
            program: 'General',
            status: 'active',
        },
        {
            id: 8,
            title: 'Primary 4',
            section: 'Primary',
            program: 'General',
            status: 'active',
        },
        {
            id: 9,
            title: 'Primary 3',
            section: 'Primary',
            program: 'General',
            status: 'active',
        },
        {
            id: 10,
            title: 'Primary 2',
            section: 'Primary',
            program: 'General',
            status: 'active',
        },
        {
            id: 11,
            title: 'Primary 1',
            section: 'Primary',
            program: 'General',
            status: 'active',
        },
        {
            id: 12,
            title: 'Nursery 2',
            section: 'Nursery',
            program: 'General',
            status: 'active',
        },
        {
            id: 13,
            title: 'Nursery 1',
            section: 'Nursery',
            program: 'General',
            status: 'active',
        },
        {
            id: 14,
            title: 'Pre Nursery',
            section: 'Nursery',
            program: 'General',
            status: 'active',
        },
    ])

    const [searchClasses, setSearchClasses] = useState('');
    const filteredClasses = classes.filter((data) => {
        const searchString = searchClasses.toLowerCase().trim();

        if (!searchString) return true;

        return (
            String(data.id).includes(searchString) ||
            data.title.toLowerCase().includes(searchString) ||
            data.section.toLowerCase().includes(searchString) ||
            data.program.toLowerCase().includes(searchString) ||
            data.status.toLowerCase().includes(searchString)
        )
    });
    const isFiltered = searchClasses.trim() !== '';
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const pageData = filteredClasses.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);

    useEffect(() => {
        localStorage.setItem('classes', JSON.stringify(classes));
    }, [classes]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchClasses]);

    const [formData, setFormData] = useState({ id: '', title: '', section: '', program: '', status: '' });
    const [isEditingClass, setIsEditingClass] = useState(false);
    const handleAddClass = () => {
        setFormData({ id: '', title: '', section: '', program: '', status: '' });
        setIsEditingClass(false);
    }
    const handleEditClass = (data) => {
        setFormData(data);
        setIsEditingClass(true);
    }
    const deleteClass = (id) => {
        setClasses(classes.filter((cls) => cls.id !== id));
    }

    function onSubmitClass(e) {
        e.preventDefault();

        if (isEditingClass) {
            setClasses(classes.map((cls) => cls.id === formData.id ? formData : cls));
        } else {
            const newClass = {
                ...formData,
                id: classes.length + 1
            }
            setClasses(prevClasses => [...prevClasses, newClass]);
            setFormData({ id: '', title: '', section: '', program: '', status: '' });
        }
    }


    return (
        <>
            <div className="page">
                <h4 className="page-title">Classes</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container'><Link className='page-link' to="/dashboard">Home</Link ><span className="slash">/</span></span>
                    <span className="current-path"><span style={{ textTransform: 'capitalize' }}></span> Classes</span>
                </p>
            </div>

            <div className="container-fluid px-3 pb-4">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="public-container">
                            <div className="d-flex justify-content-between relative-container">
                                <h5 className="title-text">Classes</h5>
                                <button type='button' className='btn btn-sm btn-primary' data-bs-toggle="modal" data-bs-target="#classModal" onClick={() => handleAddClass()} style={{ position: 'relative' }}>
                                    <span className="add-icon">+</span> <span className="ms-4">Class</span>
                                </button>
                            </div>

                            <div>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <label htmlFor="show" className="form-label my-1">Show:</label>
                                        <select name="show" id="show" value={itemsPerPage} className='form-select p-1 px-2' style={{ width: "90px" }} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </div>

                                    <div className="col-12 col-sm-6">
                                        <label htmlFor="search" className="form-label my-1">Search:</label>
                                        <input type="search" name="search" id="search" className="form-control p-1 px-2" style={{ width: "250px" }} onChange={(e) => setSearchClasses(e.target.value)} />
                                    </div>
                                </div>

                                <div className="entries mt-3">
                                    <label className="form-label entries-text mb-1">entries</label>

                                    <div className="table-responsive">
                                        <table className="table table-hover align-middle">
                                            <thead>
                                                <tr>
                                                    <th>S/N</th>
                                                    <th>Title</th>
                                                    <th>Section</th>
                                                    <th>Program</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    pageData.length > 0 ?
                                                        pageData.map((data) => (
                                                            <tr key={data.id}>
                                                                <th>{data.id}</th>
                                                                <td>{data.title}</td>
                                                                <td>{data.section}</td>
                                                                <td>{data.program}</td>
                                                                <td>{data.status}</td>
                                                                <td className="actions d-flex">
                                                                    <button className="btn btn-sm btn-info px-1 me-1" onClick={() => navigate(`/classes/view/${data.title.replace(' ', '').toLowerCase()}`)}>
                                                                        <i className="bi bi-eye-fill"></i>
                                                                    </button>

                                                                    <button className="btn btn-sm btn-primary px-1 me-1" data-bs-toggle="modal" data-bs-target="#classModal" onClick={() => handleEditClass(data)}>
                                                                        <i className="bi bi-pencil-square"></i>
                                                                    </button>

                                                                    <button className="btn btn-sm btn-danger px-1" onClick={() => deleteClass(data.id)}>
                                                                        <i className="bi bi-trash"></i>
                                                                    </button>
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
                                            <p className='entries-amount'>Showing {filteredClasses.length === 0 ? 0 : firstIndex + 1} to {Math.min(lastIndex, filteredClasses.length)} of {filteredClasses.length} entries {isFiltered && `(filtered from ${classes.length} total entries)`}</p>
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

            <div className="modal fade" id="classModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{isEditingClass ? "Edit Class" : "Add Class"}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <form onSubmit={(e) => onSubmitClass(e)}>
                            <div className="modal-body">
                                <label htmlFor="title" className="form-label mb-1">Title <span className="text-danger">*</span></label>
                                <input type="text" id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="form-control" required />

                                <div className="row mt-0 mt-md-2">
                                    <div className="col-md-6 mt-2 mt-md-0">
                                        <label htmlFor="section" className="form-label mb-1">Section <span className="text-danger">*</span></label>
                                        <select id="section" value={formData.section} onChange={(e) => setFormData({ ...formData, section: e.target.value })} className="form-select" required>
                                            <option>Choose..</option>
                                            <option value={'Secondary'}>Secondary</option>
                                            <option value={'Primary'}>Primary</option>
                                            <option value={'Nursery'}>Nursery</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mt-2 mt-md-0">
                                        <label htmlFor="program" className="form-label mb-1">Program <span className="text-danger">*</span></label>
                                        <select id="program" value={formData.program} onChange={(e) => setFormData({ ...formData, program: e.target.value })} className="form-select" required>
                                            <option>Choose..</option>
                                            <option value={'Art'}>Art</option>
                                            <option value={'General'}>General</option>
                                            <option value={'Science'}>Science</option>
                                        </select>
                                    </div>
                                </div>


                                <label htmlFor="status" className="form-label mb-1 mt-2">Status <span className="text-danger">*</span></label>
                                <select id="status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="form-select" required>
                                    <option>Select Status</option>
                                    <option value={'active'}>Active</option>
                                    <option value={'inactive'}>Inactive</option>
                                </select>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">{isEditingClass ? 'Save Changes' : 'Submit'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ScrollTop />
        </>
    )
}

export default Classes;