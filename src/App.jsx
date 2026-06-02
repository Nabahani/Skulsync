import './App.css'
import Auth from './pages/Auth'
import { AuthProvider } from './context/AuthContext';
import { StudentProvider } from './context/StudentContext';
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
import { InvoicesProvider } from './context/InvoicesContext';
import NotFound from './pages/NotFound';

function App() {

  return (
    <div className='auth-section min-vh-100'>
      <AuthProvider>
        <StudentProvider>
          <InvoicesProvider>

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
                <Route path='/payments/:action/:id' element={<PaymentsDetails />} />
                <Route path='/expenses' element={<Expenses />} />
                <Route path='/expenses/:action/:id' element={<ExpensesDetails />} />
                <Route path='/expenses/:action/' element={<AddExpenses />} />
              </Route>


              <Route path='/auth/:userMode' element={<Auth />} />
              <Route path='/' element={<Auth />} />
              <Route path='/email/verify' element={<EmailVerification />} />
              <Route path='*' element={<NotFound />} />
            </Routes>

          </InvoicesProvider>
        </StudentProvider>
      </AuthProvider>
    </div>
  )
}

export default App;