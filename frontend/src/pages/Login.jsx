import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

const Login = () => {
    const [formData, setFormData ] = useState({
        email: '',
        password: ''
    })
    const { email, password } = formData
    
    const handleChange = e => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(formData)
        setFormData(() => ({
            email: '',
            password: ''
        }))
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt />Log In
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
                        <input type="text"
                            name='password'
                            onChange={ handleChange }
                            value={ password }
                            placeholder='Enter password' />
                    </div>
                    <button type="submit" className='btn btn-block'>Login</button>
                </form>
            </section>

        </>
    )
}

export default Login