import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { selectAuth } from '../features/auth/authSlice'
import { createGoal, reset, selectGoals } from '../features/goals/goalsSlice'
/////////////////////////////////////////////////////////
import { toast } from 'react-toastify'
import Spinner from './Spinner'


const GoalForm = () => {
    const [ goal, setGoal ] = useState('')
    const dispatch = useDispatch()
    // const { user } = useSelector(selectAuth)
    const { isLoading, isSuccess, isError } = useSelector(selectGoals)

    useEffect(() => {
        if (isSuccess || isError) {
            dispatch(reset())
        }
    }, [ isSuccess, isError, dispatch ])

    const handleChange = e => {
        setGoal(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (goal === '') {
            return toast.error('Enter your goal!', { autoClose: 1000 })
        }
        const goalData = { text: goal }

        // dispatch(createGoal({ goalData, token: user.token }))
        ////////////////////////////////////////////////////////
        dispatch(createGoal(goalData))

        setGoal('')
    }

    if (isLoading) return <Spinner />

    return (
        <section className='form'>
            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <input type="text"
                        onChange={ handleChange }
                        value={ goal } 
                        placeholder='Enter your goal!' />
                </div>
                <button type="submit" className='btn btn-block'>
                    Add Goal
                </button>
            </form>
        </section>
        
    )
}

export default GoalForm