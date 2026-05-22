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
import Expenses from './pages/Expenses';
import StudentsAdd from './pages/StudentsAdd';
import StudentsActions from './pages/StudentsActions';

function App() {

  return (
    <div className='auth-section min-vh-100'>
      <AuthProvider>
        <StudentProvider>

          <Routes>
            <Route element={<MainLayout />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/sessions' element={<Sessions />} />
              <Route path='/students' element={<Students />} />
              <Route path='/classes' element={<Classes />} />
              <Route path='/invoices' element={<Invoices />} />
              <Route path='/payments' element={<Payments />} />
              <Route path='/expenses' element={<Expenses />} />
              <Route path='/students/:action' element={<StudentsAdd />} />
              <Route path='/students/:action/:id' element={<StudentsActions />} />
            </Route>


            <Route path='/auth/:userMode' element={<Auth />} />
            <Route path='/' element={<Auth />} />
            <Route path='/email/verify' element={<EmailVerification />} />
          </Routes>

        </StudentProvider>
      </AuthProvider>
    </div>
  )
}

export default App;