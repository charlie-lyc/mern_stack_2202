import axios from 'axios'

export const read = async (token) => {
    return await axios.get(
            // 'http://localhost:5000/api/goals', // Development
            '/api/goals', // Production
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )

}

export const create = async (goalData, token) => {
    return await axios.post(
            // 'http://localhost:5000/api/goals',
            '/api/goals',
            goalData,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
}

export const remove = async (goalId, token) => {
    return await axios.delete(
            // `http://localhost:5000/api/goals/${goalId}`,
            `/api/goals/${goalId}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
}

export const update = async (goalId, goalData, token) => {
    return await axios.put(
            // `http://localhost:5000/api/goals/${goalId}`,
            `/api/goals/${goalId}`,
            goalData,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
}