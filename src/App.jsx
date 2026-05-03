import './App.css'
import Auth from './pages/Auth'
import { AuthProvider } from './context/AuthContext';
import { Route, Routes } from 'react-router-dom';
import EmailVerification from './pages/EmailVerification';
import Dashboard from './pages/Dashboard';
import MainLayout from './layouts/MainLayout';

function App() {

  return (
    <div className='auth-section min-vh-100'>
      <AuthProvider>

        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>


          <Route path='/auth/:userMode' element={<Auth />} />
          <Route path='/' element={<Auth />} />
          <Route path='/email/verify' element={<EmailVerification />} />
        </Routes>

      </AuthProvider>
    </div>
  )
}

export default App;