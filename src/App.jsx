import './App.css'
import Auth from './pages/Auth'
import { AuthProvider } from './context/AuthContext';
import { Route, Routes } from 'react-router-dom';
import EmailVerification from './pages/EmailVerification';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <div className='auth-section'>
      <AuthProvider>

        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/email/verify' element={<EmailVerification />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>

      </AuthProvider>
    </div>
  )
}

export default App;