// import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, selectAuth } from '../features/auth/authSlice'
/////////////////////////////////////////////////////
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'


const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(selectAuth)

    const handleClick = () => {
        dispatch(logoutUser())
        toast.success('Logout Success', { autoClose: 750})
        navigate('/')
    }
    
    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>
                    Goal Setter
                </Link>
            </div>
            <ul>
                {
                    !user ?
                        <>
                            <li>
                                <Link to='/login'>
                                    <FaSignInAlt />Login
                                </Link>
                            </li>
                            <li>
                                <Link to='/register'>
                                    <FaUser />Register
                                </Link>
                            </li>
                        </>
                    :
                        <li>
                            <button className='btn' onClick={ handleClick }>
                                <FaSignOutAlt />Logout
                            </button>
                        </li>
                }
            </ul>
        </header>
    )
}

export default Header