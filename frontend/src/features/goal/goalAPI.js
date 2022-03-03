export const fetchGoals = () => {
    return fetch('localhost:5000/api/goals')
            .then(res => res.json())
}

