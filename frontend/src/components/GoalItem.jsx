import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteGoal, updateGoal } from '../features/goals/goalsSlice'
////////////////////////////////////////
import { toast } from 'react-toastify'


const GoalItem = ({ goal }) => {
    const [ currentGoal, setCurrentGoal ] = useState({
        text: goal.text ? goal.text : '',
        isUpdated: false
    })

    const handleChange = e => {
        setCurrentGoal((prevState) => ({
            ...prevState,
            text: e.target.value
        }))
    }

    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteGoal(goal.id))
    }

    const toggleUpdate = () => {
        setCurrentGoal((prevState) => ({
            ...prevState,
            isUpdated: !prevState.isUpdated
        }))
    }

    const handleUpdate = () => {
        if (!currentGoal.text) {
            return toast.error('Rewrite your goal!', { autoClose: 750 })
        }
        dispatch(updateGoal({ 
            goalId: goal.id, 
            goalData: { text: currentGoal.text }
        }))
        toggleUpdate()
    }

    return (
        <div className="goal">
            {
                !currentGoal.isUpdated ?
                <>
                    <h3>{ goal.text }</h3>
                    <div style={ { display: "inline-block" } }>
                        {/* { new Date(goal.createdAt).toLocaleString('ko-KR') } */}
                        { new Date(goal.createdAt).toLocaleString('en-US') }
                    </div>
                    <button className='rewrite' 
                        onClick={ toggleUpdate } 
                        style={ { fontWeight: "bold" } }>
                        Rewrite
                    </button>
                    <button className='close' 
                        onClick={ handleDelete } 
                        style={ { fontWeight: "bold" } }>
                        X
                    </button>
                </> 
                :
                <>
                    <div className='form-group'>
                        <input type="text" 
                            onChange={ handleChange } 
                            value={ currentGoal.text } 
                            placeholder='Rewrite your goal' />
                    </div>
                    <button className='rewrite' 
                        onClick={ handleUpdate } 
                        style={ { fontWeight: "bold" } }>
                        Done
                    </button>
                </>
            }
        </div>
    )
}

export default GoalItem