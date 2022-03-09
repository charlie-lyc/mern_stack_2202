import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import Header from './components/Header'
///////////////////////////////////////////////
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
    return (
        <>  
            <Router>
                <Header />
                <div className='container'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    )
}

export default App