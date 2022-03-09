import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, reset, selectAuth } from '../features/auth/authSlice'
/////////////////////////////////////////////////////
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'


const Register = () => {
    const [formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''
    })
    const { name, email, password, confirm } = formData
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isSuccess, isError, message, isLoading } = useSelector(selectAuth)
    
    useEffect(() => {
        if (isSuccess) {
            toast.success(message, { autoClose: 750})
            dispatch(reset())
            navigate('/login')
        }
        if (isError) {
            toast.error(message, { autoClose: 750})
            dispatch(reset())
            navigate('/register')
        }
    }, [ dispatch, navigate, isSuccess, isError, message ])

    const handleChange = e => {
        e.preventDefault()
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        // console.log(formData)
        if (password !== confirm) {
            return toast.error('Passwords do not match', { autoClose: 750})
        }
        const userData = { name, email, password }
        dispatch(registerUser(userData))
        setFormData(() => ({
            name: '',
            email: '',
            password: '',
            confirm: ''
        }))
    }

    if (isLoading) return <Spinner />

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please Create An Account</p>
            </section>
            <section className='form'>
                <form onSubmit={ handleSubmit }>
                    <div className='form-group'>
                        <input type='text' 
                            name='name' 
                            onChange={ handleChange } 
                            value={ name } 
                            placeholder='Enter your name' />
                        <input type='text' 
                            name='email' 
                            onChange={ handleChange } 
                            value={ email } 
                            placeholder='Enter your email' />
                        <input type='password'
                            name='password' 
                            onChange={ handleChange } 
                            value={ password } 
                            placeholder='Enter password' />
                        <input type='password' 
                            name='confirm' 
                            onChange={ handleChange } 
                            value={ confirm } 
                            placeholder='Confirm password' />
                    </div>
                    <button type="submit" className='btn btn-block'>
                        Submit
                    </button>
                </form>
            </section>
        </>
    )
}

export default Register