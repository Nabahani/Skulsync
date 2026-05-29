import { useState } from "react";

export default function SearchableSelect({ registration, id, setData, data }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState(data);

    const filteredRegistration = id === 1 ? registration.filter((reg) =>
        reg.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) : registration.filter((reg) =>
        (reg.fName ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (reg.mName ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (reg.lName ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (reg.regno ?? '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="position-relative">
            <div
                className="form-select d-flex justify-content-between align-items-center myFont"
                onClick={() => setIsOpen(!isOpen)}
                style={{ cursor: 'pointer' }}
            >
                {selectedItem
                    ? `${id === 1 ? `${selectedItem.title ?? 'Select an option...'}${selectedItem.amount ? ' - ₦' : ''}${selectedItem.amount ?? ''}` : `${selectedItem.regno ?? 'Select an option...'} ${selectedItem.fName ?? selectedItem.student ?? ''} ${selectedItem.mName ?? ''} ${selectedItem.lName ?? ''}`}`
                    : "Select an option..."
                }
            </div>

            <input
                type="text"
                required
                value={selectedItem.id ?? ""}
                onChange={() => { }}
                style={{ opacity: 0, position: 'absolute', bottom: 0, left: '50%', width: '1px', height: '1px', pointerEvents: 'none' }}
            />

            {
                isOpen && (
                    <div
                        className="position-absolute w-100 bg-white border rounded shadow-sm p-2 z-3"
                        style={{ top: '100%', left: 0, marginTop: '4px', maxHeight: '250px', overflowY: 'auto' }}
                    >
                        <div className="mb-2">
                            <input
                                type="search"
                                className="form-control form-control-sm"
                                placeholder="Type to search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                        </div>

                        <div className="list-group list-group-flush">
                            {filteredRegistration.length > 0 ? (
                                filteredRegistration.map((reg) => (
                                    <button
                                        key={reg.id || crypto.randomUUID()}
                                        type="button"
                                        className="list-group-item list-group-item-action border-0 py-2 rounded small text-start"
                                        onClick={() => {
                                            setSelectedItem(reg);
                                            setIsOpen(false);
                                            setSearchQuery("");

                                            if (id === 1) {
                                                setData({ ...data, title: reg.title, amount: reg.amount });
                                            } else {
                                                setData({ ...data, fName: reg.fName, mName: reg.mName, lName: reg.lName, regno: reg.regno, id: reg.id })
                                            }
                                        }}
                                    >
                                        {`${id === 1 ? reg.title : reg.regno} ${id === 1 ? '' : `${reg.fName} ${reg.mName} ${reg.lName}`}${id === 1 ? ` - ₦${reg.amount}` : ''}`}
                                    </button>
                                ))
                            ) : (
                                <div className="text-muted text-center p-2 small">
                                    The results could not be loaded.
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
        </div >
    );
}