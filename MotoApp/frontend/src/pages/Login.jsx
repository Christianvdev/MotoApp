import api from "../../api/axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"



const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const handleSubmit = async () => {
        try{
            const response = await api.post('token/', {
                username,
                password
            })
            localStorage.setItem('access_token', response.data.access)
            localStorage.setItem('refresh_token', response.data.refresh)
            alert("Logged in!")
            navigate('/dashboard')

        }
        catch(err){
            setError('Invalid credentials')
        }
    }
    
    return(
        <div>
            <h1>Login</h1>
            <input
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSubmit}>Login</button>
        </div>
    )
}

export default LoginPage