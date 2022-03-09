// export const register = (userData) => {
//     return fetch('http://localhost:5000/api/users', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(userData)
//             }).then(res => res.json())
// }
//////////////////////////////////////////////////////////////////

/**
 * Using Axios and Proxy(within package.json - "proxy": "http://localhost:5000")
 */
import axios from 'axios'

export const register = async (userData) => {
    // return await axios.post('/api/users/', userData) // But Proxy is not working!!!
    ///////////////////////////////////////////////////
    return await axios.post(
            // 'http://localhost:5000/api/users', // Development
            '/api/users', // Production
            userData
        )
}

export const login = async (userData) => {
    return await axios.post(
            // 'http://localhost:5000/api/users/login', 
            '/api/users/login',
            userData
        )
}

export const getUser = async (token) => {
    return await axios.get(
            // 'http://localhost:5000/api/users/me', 
            '/api/users/me',
            {   
                headers: { Authorization: `Bearer ${token}` }
            }
        )
}

/* Solution1: Failed */
// export const logout = async (token) => {
//     return await axios.post(
//             'http://localhost:5000/api/users/logout',
//             // '/api/users/logout', 
//             {}, 
//             {   
//                 headers: { Authorization: `Bearer ${token}` }
//             }
//         )
// }
//////////////////////////////////////////////////////
/* Solution2 */
// export const logout = async () => {
//     localStorage.clear()
//     /* OR */
//     // localStorage.removeItem('user')
// }
