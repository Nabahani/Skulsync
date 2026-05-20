function Pagination({currentPage, totalPages, setCurrentPage}) {
    const items = [];
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
            items.push(i);
        }
    } else {
        items.push(1);

        if (currentPage >= 5) {
            items.push('...');

            const start = Math.min(currentPage - 1, totalPages - 3);
            const end = Math.min(currentPage + 1, totalPages - 1);

            for (let i = start; i <= end; i++) {
                if (i > 1) items.push(i);
            }

            if (currentPage < totalPages - 2) {
                items.push('...');
            }
        } else {
            for (let i = 2; i <= 5; i++) {
                items.push(i)
            }
            items.push('...');
        }

        items.push(totalPages);
    }

    return (
        <nav>
            <ul className='pagination'>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className='page-link' onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
                </li>
                {
                    items.map((item, index) => (
                        <li key={index} className={`page-item ${currentPage === item ? 'active' : ''} ${item === '...' ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(item)}>{item}</button>
                        </li>
                    ))
                }
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;