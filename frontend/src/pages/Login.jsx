import api from "../../api/axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../styles/Auth.css'

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
            navigate('/')

        }
        catch(err){
            setError('Invalid credentials')
        }
    }
    
    return(
        <div className="auth-page login-page">
            <h1>Welcome Back, Rider</h1>
            <input
                className="form-input"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="form-input"
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn-primary" onClick={handleSubmit}>Login</button>
            <button  className="btn-ghost" style={{ marginLeft: '12px' }} onClick={() => navigate('/register')}>Register</button>
        </div>
    )
}

export default LoginPage