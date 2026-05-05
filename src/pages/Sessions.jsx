import { Link, useFormAction } from 'react-router-dom';
import ScrollTop from '../components/ScrollTop';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

function Sessions() {

    const [sessionsFormData, setSessionsFormData] = useState({ id: '', title: '', startDate: '', endDate: '', status: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [searchSession, setSearchSessions] = useState('');

    const [sessionsData, setSessionsData] = useState(localStorage.getItem('sessions-data') ? JSON.parse(localStorage.getItem('sessions-data')) : [
        {
            id: 1,
            title: "2025/2026",
            startDate: "2025-09-08",
            endDate: "2026-07-18",
            status: "active"
        },
        {
            id: 2,
            title: "2024/2025",
            startDate: "2024-08-06",
            endDate: "2025-07-10",
            status: "inactive"
        }
    ]);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const hanldeAddSessions = () => {
        setSessionsFormData({ id: '', title: '', startDate: '', endDate: '', status: '' });
        setIsEditing(false);
    }
    const handleEditSessions = (data) => {
        setSessionsFormData(data);
        setIsEditing(true);
    }
    const deleteSession = (id) => {
        setSessionsData(sessionsData.filter((data) => data.id !== id));
    }

    function onSubmit(e) {
        e.preventDefault();

        if (isEditing) {
            setSessionsData(sessionsData.map((data) => data.id === sessionsFormData.id ? { ...sessionsData, id: data.id, title: sessionsFormData.title, startDate: sessionsFormData.startDate, endDate: sessionsFormData.endDate, status: sessionsFormData.status } : data));
        } else {
            setSessionsData([...sessionsData, { ...sessionsFormData, id: sessionsData.length + 1, status: 'active' }]);
        }
    }

    useEffect(() => {
        localStorage.setItem('sessions-data', JSON.stringify(sessionsData));
    }, [sessionsData]);

    const filterSearchSessions = sessionsData.filter((data) => (data.title.includes(searchSession) || data.startDate.includes(searchSession) || data.endDate.includes(searchSession)));
    const showSessionFilter = (filterSearchSessions.length > 0) && (searchSession !== '');





    const [termsData, setTermsData] = useState(localStorage.getItem('terms-data') ? JSON.parse(localStorage.getItem('terms-data')) : [
        {
            id: 1,
            title: "Third term",
            status: "Inactive"
        },
        {
            id: 2,
            title: "Second term",
            status: "Active"
        },
        {
            id: 3,
            title: "First term",
            status: "Inactive"
        },
    ]);

    const [termsFormData, setTermsFormData] = useState({ id: '', title: '', status: '' });
    const [isEditingTerms, setIsEditingTerms] = useState(false);

    const handleAddTerms = () => {
        setTermsFormData({ id: '', title: '', status: '' });
        setIsEditingTerms(false);
    }
    const handleEditTerms = (data) => {
        setTermsFormData(data);
        setIsEditingTerms(true);
    }
    const deleteTermData = (id) => {
        setTermsData(termsData.filter((data) => data.id !== id));
    }
    const onSubmitTerms = (e) => {
        e.preventDefault();

        if (isEditingTerms) {
            setTermsData(termsData.map((data) => data.id === termsFormData.id ? { ...termsData, id: termsFormData.id, title: termsFormData.title, status: termsFormData.status } : data));
        } else {
            setTermsData([...termsData, { ...termsFormData, id: termsData.length + 1, status: 'active' }]);
        }
    }

    useEffect(() => {
        localStorage.setItem('terms-data', JSON.stringify(termsData));
    }, [termsData]);

    return (
        <>
            <div className="page pb-0">
                <h4 className="page-title">Sessions & Terms</h4>
                <p className="page-navigations">
                    <span className='link-container'><Link className='page-link' to="/dashboard">Home</Link ><span className="slash">/</span></span>
                    <span className="current-path">Sessions & Terms</span>
                </p>
            </div>

            <div className="container-fluid px-3 pb-4">
                <div className="row">
                    <div className="col-12 ">
                        <div className="sessions-container">
                            <div className="d-flex justify-content-between">
                                <h5 className="title-text">Sessions</h5>
                                <button type='button' className='btn btn-primary add-button' data-bs-toggle="modal" data-bs-target="#sessionsModal" onClick={hanldeAddSessions}><span className="plus-icon">+</span></button>
                            </div>


                            <div className="px-1">
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <label htmlFor="show" className="form-label my-1">Show:</label>
                                        <select name="show" id="show" degaultvalue={50} className='form-select p-1 px-2' style={{ width: "90px" }}>
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </div>

                                    <div className="col-12 col-sm-6">
                                        <label htmlFor="search" className="form-label my-1">Search:</label>
                                        <input type="search" name="search" id="search" className="form-control p-1 px-2" style={{ width: "250px" }} onChange={(e) => setSearchSessions(e.target.value)} />
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
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    searchSession !== '' ? (
                                                        filterSearchSessions.length > 0 ? filterSearchSessions.map((data) => (
                                                            <tr key={data.id}>
                                                                <th>{data.id}</th>
                                                                <td>{data.title}</td>
                                                                <td>{data.startDate}</td>
                                                                <td>{data.endDate}</td>
                                                                <td>{data.status}</td>
                                                                <td>
                                                                    <button className="btn btn-sm btn-primary px-1 me-1" data-bs-toggle="modal" data-bs-target="#sessionsModal" onClick={() => handleEditSessions(data)}>
                                                                        <i className="bi bi-pencil-square"></i>
                                                                    </button>

                                                                    <button className="btn btn-sm btn-danger px-1" onClick={() => deleteSession(data.id)}>
                                                                        <i className="bi bi-trash"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )) : <tr>
                                                            <td>No matching records found</td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                    ) : sessionsData.map((data) => (
                                                        <tr key={data.id}>
                                                            <th>{data.id}</th>
                                                            <td>{data.title}</td>
                                                            <td>{data.startDate}</td>
                                                            <td>{data.endDate}</td>
                                                            <td>{data.status}</td>
                                                            <td className='d-flex'>
                                                                <button className="btn btn-sm btn-primary px-1 me-1" data-bs-toggle="modal" data-bs-target="#sessionsModal" onClick={() => handleEditSessions(data)}>
                                                                    <i className="bi bi-pencil-square"></i>
                                                                </button>

                                                                <button className="btn btn-sm btn-danger px-1" onClick={() => deleteSession(data.id)}>
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <p className='entries-amount'>Showing 1 to {sessionsData.length} of {sessionsData.length} entries {showSessionFilter && `(filtered from ${filterSearchSessions.length} total entries)`}</p>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <nav>
                                                <ul className='pagination'>
                                                    <li className="page-item disabled">
                                                        <a href="#" className='page-link'>Previous</a>
                                                    </li>
                                                    <li className="page-item active">
                                                        <a href="#" className="page-link">1</a>
                                                    </li>
                                                    <li className="page-item disabled">
                                                        <a href="#" className="page-link">Next</a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="sessionsModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{isEditing ? "Edit Session" : "Add Session"}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <form onSubmit={onSubmit}>
                            <div className="modal-body">
                                <label htmlFor="title" className="form-label mb-1">Title <span className="text-danger">*</span></label>
                                <input type="text" id="title" value={sessionsFormData.title} onChange={(e) => setSessionsFormData({ ...sessionsFormData, title: e.target.value })} className="form-control" required />

                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <label htmlFor="start" className="form-label mb-1">Start Date <span className="text-danger">*</span></label>
                                        <input type="date" id="start" value={sessionsFormData.startDate} onChange={(e) => setSessionsFormData({ ...sessionsFormData, startDate: e.target.value })} className="form-control" required />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="end" className="form-label mb-1">End Date <span className="text-danger">*</span></label>
                                        <input type="date" id="end" value={sessionsFormData.endDate} onChange={(e) => setSessionsFormData({ ...sessionsFormData, endDate: e.target.value })} className="form-control" required />
                                    </div>
                                </div>

                                {
                                    isEditing && <>
                                        <label htmlFor="status" className="form-label mb-1 mt-2">Status <span className="text-danger">*</span></label>
                                        <select id="status" value={sessionsFormData.status} onChange={(e) => setSessionsFormData({ ...sessionsFormData, status: e.target.value })} className='form-select'>
                                            <option value={`${sessionsFormData.status === 'active' ? 'active' : 'inactive'}`}>{sessionsFormData.status === 'active' ? 'active' : 'inactive'}</option>
                                            <option value={`${sessionsFormData.status === 'active' ? 'inactive' : 'active'}`}>{sessionsFormData.status === 'active' ? 'inactive' : 'active'}</option>
                                        </select>
                                    </>
                                }
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">{isEditing ? 'Save Changes' : 'Submit'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="container-fluid px-3 pb-4">
                <div className="sessions-container">
                    <div className="d-flex justify-content-between">
                        <h5 className="title-text">Terms</h5>
                        <button className='btn btn-primary add-button' data-bs-toggle="modal" data-bs-target="#termsModal" onClick={handleAddTerms}><span className="plus-icon">+</span></button>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    termsData.map((data) => (
                                        <tr key={data.id}>
                                            <th>{data.id}</th>
                                            <td>{data.title}</td>
                                            <td>{data.status}</td>
                                            <td className='d-flex'>
                                                <button className="btn btn-sm btn-primary px-1 me-1" data-bs-toggle="modal" data-bs-target="#termsModal" onClick={() => handleEditTerms(data)}>
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>

                                                <button className="btn btn-sm btn-danger px-1" onClick={() => deleteTermData(data.id)}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="termsModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{isEditingTerms ? "Edit Term" : "Add Term"}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <form onSubmit={onSubmitTerms}>
                            <div className="modal-body">
                                <label htmlFor="title" className="form-label mb-1">Title <span className="text-danger">*</span></label>
                                <input type="text" id="title" value={termsFormData.title} onChange={(e) => setTermsFormData({ ...termsFormData, title: e.target.value })} className="form-control" required />

                                {
                                    isEditingTerms && <>
                                        <label htmlFor="status" className="form-label mb-1 mt-2">Status <span className="text-danger">*</span></label>
                                        <select id="status" value={termsFormData.status} onChange={(e) => setTermsFormData({ ...termsFormData, status: e.target.value })} className='form-select'>
                                            <option value={`${termsFormData.status === 'active' ? 'active' : 'inactive'}`}>{termsFormData.status === 'active' ? 'active' : 'inactive'}</option>
                                            <option value={`${termsFormData.status === 'active' ? 'inactive' : 'active'}`}>{termsFormData.status === 'active' ? 'inactive' : 'active'}</option>
                                        </select>
                                    </>
                                }
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">{isEditingTerms ? 'Save Changes' : 'Submit'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ScrollTop />
        </>
    )
}

export default Sessions;