import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, reset, selectAuth } from '../features/auth/authSlice'
/////////////////////////////////////////////////////
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'


const Login = () => {
    const [formData, setFormData ] = useState({
        email: '',
        password: ''
    })
    const { email, password } = formData
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isSuccess, isError, message, isLoading, user } = useSelector(selectAuth)

    useEffect(() => {
        if (isSuccess) {
            toast.success('Login Success', { autoClose: 750})
            dispatch(reset())
            navigate('/dashboard')
        } else if (isError) {
            toast.error(message, { autoClose: 750})
            dispatch(reset())
            navigate('/login')
        }
    }, [ dispatch, navigate, isSuccess, isError, message, user ])
    
    const handleChange = e => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        // console.log(formData)
        const userData = { email, password }
        dispatch(loginUser(userData))
        setFormData(() => ({
            email: '',
            password: ''
        }))
    }

    if (isLoading) return <Spinner />

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Log In
                </h1>
                <p>Login and start setting goals</p>
            </section>
            <section className='form'>
                <form onSubmit={ handleSubmit }>
                    <div className='form-group'>
                        <input type="text" 
                            name='email' 
                            onChange={ handleChange }
                            value={ email } 
                            placeholder='Enter your email' />
                        <input type="password"
                            name='password'
                            onChange={ handleChange }
                            value={ password }
                            placeholder='Enter password' />
                    </div>
                    <button type="submit" className='btn btn-block'>
                        Login
                    </button>
                </form>
            </section>

        </>
    )
}

export default Login