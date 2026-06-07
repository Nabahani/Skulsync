import { createContext, useContext, useState, useEffect } from "react";

const BillingsContext = createContext(null);

export function BillingsProvider({ children }) {
    const [billings, setBillings] = useState(localStorage.getItem('billings') ? JSON.parse(localStorage.getItem('billings')) : [
        {
            id: 1,
            title: "Secondary School Fee",
            category: 'School Fee',
            price: 80000,
            section: "Secondary",
            program: "",
            class: "",
            status: "Active",
            addedOn: "2025-09-01 19:54:53",
            updatedOn: "2025-09-01 19:54:53",
        },
        {
            id: 2,
            title: "REGISTRATION FORM",
            category: 'Registration',
            price: 15000,
            section: "",
            program: "",
            class: "",
            status: "Active",
            addedOn: "2025-09-01 19:54:53",
            updatedOn: "2025-09-01 19:54:53",
        },
        {
            id: 3,
            title: "Spedch & Prize",
            category: 'Speech',
            price: 5000,
            section: "",
            program: "",
            class: "",
            status: "Active",
            addedOn: "2025-09-01 19:54:53",
            updatedOn: "2025-09-01 19:54:53",
        },
        {
            id: 4,
            title: "Primary School Fee",
            category: 'School Fee',
            price: 70000,
            section: "Primary",
            program: "",
            class: "",
            status: "Active",
            addedOn: "2025-09-01 19:54:53",
            updatedOn: "2025-09-01 19:54:53",
        },
        {
            id: 5,
            title: "Exam",
            category: 'Exam Fee',
            price: 2500,
            section: "",
            program: "",
            class: "",
            status: "Active",
            addedOn: "2025-09-01 19:54:53",
            updatedOn: "2025-09-01 19:54:53",
        },
        {
            id: 6,
            title: "PTA",
            category: 'PTA',
            price: 1000,
            section: "",
            program: "",
            class: "",
            status: "Active",
            addedOn: "2025-09-01 19:54:53",
            updatedOn: "2025-09-01 19:54:53",
        },
        {
            id: 7,
            title: "Nursery School Fee",
            category: 'School Fee',
            price: 80000,
            section: "Nursery",
            program: "",
            class: "",
            status: "Active",
            addedOn: "2025-09-01 19:54:53",
            updatedOn: "2025-09-01 19:54:53",
        },
    ]);

    const [category, setCategory] = useState(localStorage.getItem('category') ? JSON.parse(localStorage.getItem('category')) : [
        {
            id: 1,
            title: 'Speech',
            status: 'Active'
        },
        {
            id: 2,
            title: 'CHARGES',
            status: 'Active'
        },
        {
            id: 3,
            title: 'Registration',
            status: 'Active'
        },
        {
            id: 4,
            title: 'PTA',
            status: 'Active'
        },
        {
            id: 5,
            title: 'Exam Fee',
            status: 'Active'
        },
        {
            id: 6,
            title: 'School Fee',
            status: 'Active'
        },
    ]);

    const [discount, setDiscount] = useState(localStorage.getItem('discount') ? JSON.parse(localStorage.getItem('discount')) : [
        {
            id: 1,
            title: 'Discount',
            category: 'School Fee',
            appliesTo: 'Student',
            tenure: '2025-10-13',
            session: '',
            target: 'MERCY OLUNSANJO',
            term: '',
            type: 'flat',
            amount: 60000,
            status: 'Active',
            admittedBefore: '',
            description: ''
        },
        {
            id: 2,
            title: 'Discount',
            category: 'School Fee',
            appliesTo: 'Student',
            tenure: '2025-10-13',
            session: '',
            target: 'MERCY OLUNSANJO',
            term: '',
            type: 'flat',
            amount: 60000,
            status: 'Active',
            admittedBefore: '',
            description: ''
        },
        {
            id: 3,
            title: 'Discount',
            category: 'School Fee',
            appliesTo: 'Student',
            tenure: '2025-10-13',
            session: '',
            target: 'MERCY OLUNSANJO',
            term: '',
            type: 'flat',
            amount: 60000,
            status: 'Active',
            admittedBefore: '',
            description: ''
        },
        {
            id: 4,
            title: 'Discount',
            category: 'School Fee',
            appliesTo: 'Student',
            tenure: '2025-10-13',
            session: '',
            target: 'MERCY OLUNSANJO',
            term: '',
            type: 'flat',
            amount: 60000,
            status: 'Active',
            admittedBefore: '',
            description: ''
        },
        {
            id: 5,
            title: 'Discount',
            category: 'School Fee',
            appliesTo: 'Student',
            tenure: '2025-10-13',
            session: '',
            target: 'MERCY OLUNSANJO',
            term: '',
            type: 'flat',
            amount: 60000,
            status: 'Active',
            admittedBefore: '',
            description: ''
        },
        {
            id: 6,
            title: 'Discount',
            category: 'School Fee',
            appliesTo: 'Student',
            tenure: '2025-10-13',
            session: '',
            target: 'MERCY OLUNSANJO',
            term: '',
            type: 'flat',
            amount: 60000,
            status: 'Active',
            admittedBefore: '',
            description: ''
        },
        {
            id: 7,
            title: 'Discount',
            category: 'School Fee',
            appliesTo: 'Student',
            tenure: '2025-10-13',
            session: '',
            target: 'MERCY OLUNSANJO',
            term: '',
            type: 'flat',
            amount: 60000,
            status: 'Active',
            admittedBefore: '',
            description: ''
        },
        {
            id: 8,
            title: 'Discount',
            category: 'School Fee',
            appliesTo: 'Student',
            tenure: '2025-10-13',
            session: '',
            target: 'MERCY OLUNSANJO',
            term: '',
            type: 'flat',
            amount: 60000,
            status: 'Active',
            admittedBefore: '',
            description: ''
        },
        {
            id: 9,
            title: 'Discount',
            category: 'School Fee',
            appliesTo: 'Student',
            tenure: '2025-10-13',
            session: '',
            target: 'MERCY OLUNSANJO',
            term: '',
            type: 'flat',
            amount: 60000,
            status: 'Active',
            admittedBefore: '',
            description: ''
        },
        {
            id: 10,
            title: 'Discount',
            category: 'School Fee',
            appliesTo: 'Student',
            tenure: '2025-10-13',
            session: '',
            target: 'MERCY OLUNSANJO',
            term: '',
            type: 'flat',
            amount: 60000,
            status: 'Active',
            admittedBefore: '',
            description: ''
        },
        {
            id: 11,
            title: 'Discount',
            category: 'School Fee',
            appliesTo: 'Student',
            tenure: '2025-10-13',
            session: '',
            target: 'MERCY OLUNSANJO',
            term: '',
            type: 'flat',
            amount: 60000,
            status: 'Active',
            admittedBefore: '',
            description: ''
        },
        {
            id: 12,
            title: 'Discount',
            category: 'School Fee',
            appliesTo: 'Student',
            tenure: '2025-10-13',
            session: '',
            target: 'MERCY OLUNSANJO',
            term: '',
            type: 'flat',
            amount: 60000,
            status: 'Active',
            admittedBefore: '',
            description: ''
        },
        {
            id: 13,
            title: 'Discount',
            category: 'School Fee',
            appliesTo: 'Student',
            tenure: '2025-10-13',
            session: '',
            target: 'MERCY OLUNSANJO',
            term: '',
            type: 'flat',
            amount: 60000,
            status: 'Active',
            admittedBefore: '',
            description: ''
        },
        {
            id: 14,
            title: 'Discount',
            category: 'School Fee',
            appliesTo: 'Student',
            tenure: '2025-10-13',
            session: '',
            target: 'MERCY OLUNSANJO',
            term: '',
            type: 'flat',
            amount: 50000,
            status: 'Active',
            admittedBefore: '',
            description: ''
        },
        {
            id: 15,
            title: 'Discount',
            category: 'School Fee',
            appliesTo: 'Student',
            tenure: '2025-10-13',
            session: '',
            target: 'MERCY OLUNSANJO',
            term: '',
            type: 'flat',
            amount: 90000,
            status: 'Active',
            admittedBefore: '',
            description: ''
        },
        {
            id: 16,
            title: 'Discount',
            category: 'School Fee',
            appliesTo: 'Student',
            tenure: '2025-10-13',
            session: '',
            target: 'MERCY OLUNSANJO',
            term: '',
            type: 'flat',
            amount: 10000,
            status: 'Active',
            admittedBefore: '',
            description: ''
        },
        {
            id: 17,
            title: 'Discount',
            category: 'School Fee',
            appliesTo: 'Student',
            tenure: '2025-10-13',
            session: '',
            target: 'MERCY OLUNSANJO',
            term: '',
            type: 'flat',
            amount: 20000,
            status: 'Active',
            admittedBefore: '',
            description: ''
        },
        {
            id: 18,
            title: 'Discount',
            category: 'School Fee',
            appliesTo: 'Student',
            tenure: '2025-10-13',
            session: '',
            target: 'MERCY OLUNSANJO',
            term: '',
            type: 'flat',
            amount: 600000,
            status: 'Active',
            admittedBefore: '',
            description: ''
        },
        {
            id: 19,
            title: 'Discount',
            category: 'School Fee',
            appliesTo: 'Student',
            tenure: '2025-10-13',
            session: '',
            target: 'MERCY OLUNSANJO',
            term: '',
            type: 'flat',
            amount: 50000,
            status: 'Active',
            admittedBefore: '',
            description: ''
        },
    ]);

    const [accounts, setAccounts] = useState(localStorage.getItem('accounts') ? JSON.parse(localStorage.getItem('accounts')) : [
        {
            id: 1,
            accountName: 'New Standard Learning Skills College',
            accountNo: '1012504768',
            bankName: 'Zenith Bank',
            status: 'Active'
        },
        {
            id: 2,
            accountName: 'New Standard Learning Skills College',
            accountNo: '0004768813',
            bankName: 'Taj Bank',
            status: 'Active'
        },
        {
            id: 3,
            accountName: 'Abdullahi',
            accountNo: '0000000001',
            bankName: 'Jaiz Bank',
            status: 'Active'
        }
    ]);

    useEffect(() => {
        localStorage.setItem('billings', JSON.stringify(billings));
    }, [billings]);

    useEffect(() => {
        localStorage.setItem('category', JSON.stringify(category));
    }, [category]);

    useEffect(() => {
        localStorage.setItem('discount', JSON.stringify(discount));
    }, [discount]);

    return (
        <BillingsContext.Provider value={{ billings, setBillings, category, setCategory, discount, setDiscount, accounts, setAccounts }}>{children}</BillingsContext.Provider >
    )
}

export function useBillings() {
    return useContext(BillingsContext);
}