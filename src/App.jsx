import './App.css'
import Auth from './pages/Auth'
import { AuthProvider } from './context/AuthContext';
import { StudentProvider } from './context/StudentContext';
import { InvoicesProvider } from './context/InvoicesContext';
import { SectionsProvider } from './context/SectionsContext';
import { ProgramsProvider } from './context/ProgramsContext';
import { StaffsProvider } from './context/StaffsContext';
import { BillingsProvider } from './context/BillingsContext';
import { AccountsProvider } from './context/AccountsContext';
import { PayslipsProvider } from './context/PayslipsContext';
import { Route, Routes } from 'react-router-dom';
import EmailVerification from './pages/EmailVerification';
import Dashboard from './pages/Dashboard';
import MainLayout from './layouts/MainLayout';
import Sessions from './pages/Sessions';
import Students from './pages/Students';
import Classes from './pages/Classes';
import Invoices from './pages/Invoices';
import Payments from './pages/Payments';
import PaymentsDetails from './pages/PaymentsDetails';
import Expenses from './pages/Expenses';
import ExpensesDetails from './pages/ExpensesDetails';
import AddExpenses from './pages/AddExpenses';
import StudentsAdd from './pages/StudentsAdd';
import StudentsActions from './pages/StudentsActions';
import ViewClasses from './pages/ViewClasses';
import InvoicesParams2 from './pages/InvoicesParams2';
import InvoicesParams3 from './pages/InvoicesParams3';
import NotFound from './pages/NotFound';
import Sections from './pages/Sections';
import Programs from './pages/Programs';
import Staffs from './pages/Staffs';
import StaffsParams2 from './pages/StaffsParams2';
import StaffsParams3 from './pages/StaffsParams3';
import Billings from './pages/Billings';
import BillingsParams1 from './pages/BillingsParams1';
import BillingsParams2 from './pages/BillingsParams2';
import BillingsParams3 from './pages/BillingsParams3';
import Accounts from './pages/Accounts';
import AccountsParams1 from './pages/AccountsParams1';
import AccountsParams2 from './pages/AccountsParams2';
import Transfers from './pages/Transfers';
import TransfersParams1 from './pages/TransfersParams1';
import TransfersParams2 from './pages/TransfersParams2';
import Transactions from './pages/Transactions';
import PaymentsParams1 from './pages/PaymentsParams1';
import Payslips from './pages/Payslips';

function App() {

  return (
    <div className='auth-section min-vh-100'>
      <AuthProvider>
        <StudentProvider>
          <InvoicesProvider>
            <SectionsProvider>
              <ProgramsProvider>
                <StaffsProvider>
                  <BillingsProvider>
                    <AccountsProvider>
                      <PayslipsProvider>

                        <Routes>
                          <Route element={<MainLayout />}>
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route path='/sessions' element={<Sessions />} />
                            <Route path='/students' element={<Students />} />
                            <Route path='/students/:action' element={<StudentsAdd />} />
                            <Route path='/students/:action/:id' element={<StudentsActions />} />
                            <Route path='/classes' element={<Classes />} />
                            <Route path='/classes/view/:cls' element={<ViewClasses />} />
                            <Route path='/invoices' element={<Invoices />} />
                            <Route path='/invoices/:action' element={<InvoicesParams2 />} />
                            <Route path='/invoices/:action/:id' element={<InvoicesParams3 />} />
                            <Route path='/payments' element={<Payments />} />
                            <Route path='/payments/:action' element={<PaymentsParams1 />} />
                            <Route path='/payments/:action/:id' element={<PaymentsDetails />} />
                            <Route path='/expenses' element={<Expenses />} />
                            <Route path='/expenses/:action/:id' element={<ExpensesDetails />} />
                            <Route path='/expenses/:action/' element={<AddExpenses />} />
                            <Route path='/sections' element={<Sections />} />
                            <Route path='/programs' element={<Programs />} />
                            <Route path='/staffs' element={<Staffs />} />
                            <Route path='/staffs/:action' element={<StaffsParams2 />} />
                            <Route path='/staffs/:action/:id' element={<StaffsParams3 />} />
                            <Route path='/billings' element={<Billings />} />
                            <Route path='/billings/:action' element={<BillingsParams1 />} />
                            <Route path='/billings/:action1/:action2' element={<BillingsParams2 />} />
                            <Route path='/billings/:action1/:action2/:id' element={<BillingsParams3 />} />
                            <Route path='/accounts' element={<Accounts />} />
                            <Route path='/accounts/:action' element={<AccountsParams1 />} />
                            <Route path='/accounts/:action/:id' element={<AccountsParams2 />} />
                            <Route path='/transfers' element={<Transfers />} />
                            <Route path='/transfers/:action' element={<TransfersParams1 />} />
                            <Route path='/transfers/:action/:id' element={<TransfersParams2 />} />
                            <Route path='/transactions' element={<Transactions />} />
                            <Route path='/payslips' element={<Payslips />} />
                          </Route>


                          <Route path='/auth/:userMode' element={<Auth />} />
                          <Route path='/' element={<Auth />} />
                          <Route path='/email/verify' element={<EmailVerification />} />
                          <Route path='*' element={<NotFound />} />
                        </Routes>

                      </PayslipsProvider>
                    </AccountsProvider>
                  </BillingsProvider>
                </StaffsProvider>
              </ProgramsProvider>
            </SectionsProvider>
          </InvoicesProvider>
        </StudentProvider>
      </AuthProvider>
    </div>
  )
}

export default App;