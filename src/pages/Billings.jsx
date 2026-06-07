import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import ScrollTop from "../components/ScrollTop";
import { useBillings } from "../context/BillingsContext";

function Billings() {

    const navigate = useNavigate();
    const { billings } = useBillings();

    const [searchBillings, setSearchBillings] = useState('');
    const filteredBillings = billings.filter((data) => {
        const searchString = searchBillings.toLowerCase().trim();

        if (!searchString) return true;

        return (
            data?.title.toLowerCase().includes(searchString) ||
            data?.category.toLowerCase().includes(searchString) ||
            data?.section.toLowerCase().includes(searchString) ||
            String(data?.price).includes(searchString) ||
            data?.status.toLowerCase().includes(searchString)
        )
    });
    const isFiltered = searchBillings.trim() !== '';
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const pageData = filteredBillings.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredBillings.length / itemsPerPage) || 1;

    useEffect(() => {
        setCurrentPage(1);
    }, [searchBillings, itemsPerPage]);


    return (
        <>
            <div className="page">
                <h4 className="page-title">Billing</h4>
                <p className="page-navigations mb-0">
                    <span className='link-container' onClick={() => navigate('/dashboard')}><Link className='page-link'>Home</Link ><span className="slash">/</span></span>
                    <span className="current-path"><span style={{ textTransform: 'capitalize' }}></span> Billing Items</span>
                </p>
            </div>

            <div className="container-fluid px-3 pb-4">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="public-container px-3">
                            <div className="d-flex justify-content-between relative-container">
                                <h5 className="title-text">Billing Items</h5>
                                <button type='button' className='btn btn-sm btn-primary' onClick={() => navigate('/billings/items/add')} style={{ position: 'relative' }}>
                                    <span className="add-icon ps-2">+</span> <span className="ms-3">Items</span>
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
                                        <input type="search" name="search" id="search" className="form-control p-1 px-2" style={{ width: "250px" }} onChange={(e) => setSearchBillings(e.target.value)} />
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
                                                    <th>Category</th>
                                                    <th>Section</th>
                                                    <th>Price</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    pageData.length > 0 ?
                                                        pageData.map((data, index) => (
                                                            <tr key={data.id}>
                                                                <th>{firstIndex + index + 1}</th>
                                                                <td>{data.title}</td>
                                                                <td>{data.category}</td>
                                                                <td>{data.section}</td>
                                                                <td>&#8358;{data.price.toLocaleString()}</td>
                                                                <td>{data.status}</td>
                                                                <td className="actions d-flex">
                                                                    <button className="btn btn-sm btn-info px-1 me-1" onClick={() => navigate(`/billings/items/view/${data.id}`)}>
                                                                        <i className="bi bi-eye-fill"></i>
                                                                    </button>

                                                                    <button className="btn btn-sm btn-primary px-1 me-1" onClick={() => navigate(`/billings/items/edit/${data.id}`)}>
                                                                        <i className="bi bi-pencil-square"></i>
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
                                            <p className='entries-amount'>Showing {filteredBillings.length === 0 ? 0 : firstIndex + 1} to {Math.min(lastIndex, filteredBillings.length)} of {filteredBillings.length} entries {isFiltered && `(filtered from ${billings.length} total entries)`}</p>
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

export default Billings;