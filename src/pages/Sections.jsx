import { useNavigate } from "react-router-dom";
import ScrollTop from "../components/ScrollTop";
import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import { useSections } from "../context/SectionsContext";


function Sections() {

    const navigate = useNavigate();
    const { sections, setSections } = useSections();

    const [searchSections, setSearchSections] = useState('');
    const filterSearchSections = sections.filter((data) => {
        const searchString = searchSections.toLowerCase().trim();

        if (!searchString) return true;

        return (
            String(data.id || '').includes(searchString) ||
            (String(data.title || '').toLowerCase()).includes(searchString) ||
            (String(data.status || '').toLowerCase()).includes(searchString) ||
            (String(data.date || '').toLowerCase()).includes(searchString)
        );
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentPageItems = filterSearchSections.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filterSearchSections.length / itemsPerPage) || 1;
    const isFiltered = searchSections.trim() !== '';
    const [sectionsFormData, setSectionsFormData] = useState({ id: '', title: '', status: '', date: '' });
    const [isEditing, setIsEditing] = useState(false);

    const deleteSection = (id) => {
        const section = sections.find((section) => section.id === id);

        if (section && window.confirm(`Are you sure you want to delete ${section.title ?? 'this'} section?`)) {
            setSections(prev => prev.filter((section) => section.id !== id));
        }
    }
    const handleAddSections = () => {
        setSectionsFormData({ title: '', status: '' });
        setIsEditing(false);
        return;
    }
    const handleEditSections = (data) => {
        setSectionsFormData(data);
        setIsEditing(true);
        return;
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isEditing) {
            const newSectionData = {
                title: sectionsFormData.title,
                status: sectionsFormData.status,
                id: String(crypto.randomUUID()),
                date: new Date().toISOString().split('T')[0]
            }
            setSections([...sections, newSectionData]);
            return;
        } else {
            setSections((prev) => prev.map(
                (section) => section.id === sectionsFormData.id ? sectionsFormData : section
            ));
            return;
        }
    }

    useEffect(() => {
        setCurrentPage(1);
    }, [searchSections, itemsPerPage]);

    return (
        <>
            <div className="page">
                <h4 className="page-title font-tt">Sections</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container' onClick={() => navigate('/dashboard')}><span className='page-link'>Home</span ><span className="slash">/</span></span>
                    <span className="current-path">Sections</span>
                </p>
            </div>

            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="public-container mx-1">
                            <div className="d-flex justify-content-between relative-container">
                                <h5 className="title-text">Sections</h5>
                                <button type='button' className='btn btn-sm btn-primary' style={{ position: 'relative' }} data-bs-toggle="modal" data-bs-target="#sectionsModal" onClick={() => handleAddSections()}>
                                    <span className="add-icon">+</span> <span className="ms-4 fw-semibold">Sections</span>
                                </button>
                            </div>

                            <div className="px-1">
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <label htmlFor="show" className="form-label my-1">Show:</label>
                                        <select name="show" id="show" className='form-select p-1 px-2' style={{ width: "90px" }} value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </div>

                                    <div className="col-12 col-sm-6">
                                        <label htmlFor="search" className="form-label my-1">Search:</label>
                                        <input type="search" name="search" id="search" className="form-control p-1 px-2" style={{ width: "250px" }} onChange={(e) => setSearchSections(e.target.value)} />
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
                                                    <th></th>
                                                    <th>Status</th>
                                                    <th>Created On</th>
                                                    <th></th>
                                                    <th></th>
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
                                                                    <td>{data.title}</td>
                                                                    <td></td>
                                                                    <td>{data.status}</td>
                                                                    <td>{data.date}</td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td className='d-flex'>
                                                                        <button className="btn btn-sm btn-primary px-1 me-1" data-bs-toggle="modal" data-bs-target="#sectionsModal" onClick={() => handleEditSections(data)}>
                                                                            <i className="bi bi-pencil-square"></i>
                                                                        </button>

                                                                        <button className="btn btn-sm btn-danger px-1" onClick={() => deleteSection(data.id)}>
                                                                            <i className="bi bi-trash"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        :
                                                        <tr>
                                                            <td colSpan={8}>No matching records found</td>
                                                        </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <p className='entries-amount'>Showing {filterSearchSections.length === 0 ? 0 : firstIndex + 1} to {Math.min(lastIndex, filterSearchSections.length)} of {filterSearchSections.length} entries {isFiltered && `(filtered from ${sections.length} total entries)`}</p>
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

            <div className="modal fade" id="sectionsModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{isEditing ? "Edit Section" : "Add Section"}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <label htmlFor="title" className="form-label mb-1">Title <span className="text-danger">*</span></label>
                                <input type="text" id="title" value={sectionsFormData.title} onChange={(e) => setSectionsFormData({ ...sectionsFormData, title: e.target.value })} className="form-control" required />

                                <label htmlFor="status" className="form-label mb-1 mt-2">Status <span className="text-danger">*</span></label>
                                <select id="status" value={sectionsFormData.status} onChange={(e) => setSectionsFormData({ ...sectionsFormData, status: e.target.value })} className='form-select'>
                                    <option value="">Select Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">{isEditing ? 'Save Changes' : 'Submit'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ScrollTop />
        </>
    )
}

export default Sections;