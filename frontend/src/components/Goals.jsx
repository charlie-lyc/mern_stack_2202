import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from '../features/auth/authSlice'
import { readGoals, deletedItems, selectGoals } from '../features/goals/goalsSlice'
//////////////////////////////////////////////////////
import Spinner from './Spinner'
import GoalItem from './GoalItem'


const Goals = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(selectAuth)
    const { items, isLoading } = useSelector(selectGoals)

    useEffect(() => {
        if (!user) {
            navigate('/login')
        } else {
            dispatch(readGoals())
        }
        return () => { 
                dispatch(deletedItems()) 
            }
    }, [ user, navigate, dispatch ])

    let goalItems
    if (items.length === 0) {
        goalItems = <h4>- You have not set any goals. -</h4>
    } else {
        goalItems = items.map((goal, idx) => 
            <GoalItem key={ idx } goal={ goal } />
        )
    }

    if (isLoading) return <Spinner />

    return (
        <div>
            <h2>Latest Goals</h2>
            <ul>
                { goalItems }
            </ul>
        </div>
    )
}

export default Goals