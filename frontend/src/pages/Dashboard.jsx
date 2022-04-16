import { useSelector } from 'react-redux'
import { selectAuth } from '../features/auth/authSlice'
///////////////////////////////////////////////////////
import GoalForm from '../components/GoalForm'
import Goals from '../components/Goals'


const Dashboard = () => {   
    const { user } = useSelector(selectAuth)

    return (
        <>
            <section className='heading'>
                <h4>Welcome, { user ? user.name : '' }!</h4>
                <p>Goals Dashboard</p>
            </section>
            <GoalForm />
            <hr />
            <Goals />
            <hr />
        </>
    )
}

export default Dashboard