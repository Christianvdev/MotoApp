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
        <div>
            <div className="auth-page login-page">
                <h1>MotoTracker</h1>
                <p className="auth-tagline">
                    Track your bikes. Log every service. Never guess your mix ratio again.
                </p>

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
                {error && <p className="auth-error">{error}</p>}

                <button className="btn-primary" onClick={handleSubmit}>Login</button>

                <p className="auth-switch">
                    New here? <span onClick={() => navigate('/register')}>Create an account</span>
                </p>
            </div>
        </div>
    )
}

export default LoginPage