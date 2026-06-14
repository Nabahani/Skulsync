import { createContext, useContext, useEffect, useState } from "react";

const AccountsContext = createContext(null);

export function AccountsProvider({ children }) {

    const [accounts, setAccounts] = useState(localStorage.getItem('accounts-details') ? JSON.parse(localStorage.getItem('accounts-details')) : [
        {
            id: 1,
            title: 'School Fees Income',
            code: 4100,
            type: 'Income',
            previousBal: 17400500,
            currentBal: 17459000,
            parent: 'Income Account',
            status: 'Active',
            description: 'dssdf',
            createdOn: '2025-08-28 16:31:29',
            createdBy: ''
        },
        {
            id: 2,
            title: 'School Fees Income',
            code: 4100,
            type: 'Income',
            previousBal: 17400500,
            currentBal: 17459000,
            parent: 'Income Account',
            status: 'Active',
            description: 'dssdf',
            createdOn: '2025-08-28 16:31:29',
            createdBy: ''
        },
        {
            id: 3,
            title: 'School Fees Income',
            code: 4100,
            type: 'Income',
            previousBal: 17400500,
            currentBal: 17459000,
            parent: 'Income Account',
            status: 'Active',
            description: 'dssdf',
            createdOn: '2025-08-28 16:31:29',
            createdBy: ''
        },
        {
            id: 4,
            title: 'School Fees Income',
            code: 4100,
            type: 'Income',
            previousBal: 17400500,
            currentBal: 17459000,
            parent: 'Income Account',
            status: 'Active',
            description: 'dssdf',
            createdOn: '2025-08-28 16:31:29',
            createdBy: ''
        },
        {
            id: 5,
            title: 'ZENITH BANK 1',
            code: 1100,
            type: 'Asset',
            previousBal: 0,
            currentBal: 0,
            parent: 'Asset Account',
            status: 'Active',
            description: 'bank account',
            createdOn: '2025-12-30 14:47:00',
            createdBy: ''
        },
        {
            id: 6,
            title: 'ZENITH BANK 1',
            code: 1100,
            type: 'Asset',
            previousBal: 0,
            currentBal: 0,
            parent: 'Asset Account',
            status: 'Active',
            description: 'bank account',
            createdOn: '2025-12-30 14:47:00',
            createdBy: ''
        },
        {
            id: 7,
            title: 'ZENITH BANK 1',
            code: 1100,
            type: 'Asset',
            previousBal: 0,
            currentBal: 0,
            parent: 'Asset Account',
            status: 'Active',
            description: 'bank account',
            createdOn: '2025-12-30 14:47:00',
            createdBy: ''
        },
        {
            id: 8,
            title: 'ZENITH BANK 1',
            code: 1100,
            type: 'Asset',
            previousBal: 0,
            currentBal: 0,
            parent: 'Asset Account',
            status: 'Active',
            description: 'bank account',
            createdOn: '2025-12-30 14:47:00',
            createdBy: ''
        },
        {
            id: 9,
            title: 'ZENITH BANK 1',
            code: 1100,
            type: 'Asset',
            previousBal: 0,
            currentBal: 0,
            parent: 'Asset Account',
            status: 'Active',
            description: 'bank account',
            createdOn: '2025-12-30 14:47:00',
            createdBy: ''
        },
        {
            id: 10,
            title: 'ZENITH BANK 1',
            code: 1100,
            type: 'Asset',
            previousBal: 0,
            currentBal: 0,
            parent: 'Asset Account',
            status: 'Active',
            description: 'bank account',
            createdOn: '2025-12-30 14:47:00',
            createdBy: ''
        },
        {
            id: 11,
            title: 'ZENITH BANK 1',
            code: 1100,
            type: 'Asset',
            previousBal: 0,
            currentBal: 0,
            parent: 'Asset Account',
            status: 'Active',
            description: 'bank account',
            createdOn: '2025-12-30 14:47:00',
            createdBy: ''
        },
        {
            id: 12,
            title: 'Expense Account',
            code: 2000,
            type: 'Expense',
            previousBal: 0,
            currentBal: 13000,
            parent: 'N/A',
            status: 'Active',
            description: 'Expenses main account',
            createdOn: '2026-01-18 13:40:12',
            createdBy: ''
        },
    ]);

    useEffect(() => {
        localStorage.setItem('accounts-details', JSON.stringify(accounts));
    }, [accounts]);

    return (
        <AccountsContext.Provider value={{ accounts, setAccounts }}>{children}</AccountsContext.Provider>
    )
}

export function useAccounts() {
    return useContext(AccountsContext);
}