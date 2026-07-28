import { useState } from "react"
import api from '../../api/axios'
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')

    const navigate = useNavigate()
    const handleRegister = async () => {
        try{
            const response = await api.post('api/accounts/register/',{
                username,
                email,
                password
            })
            alert('successful registration')
            navigate('/login')
        }
        catch(err){
            
        }
    }


    return(
        <div className="auth-page register-page">
            {error && <p className="auth-error">{error}</p>}
            <h1>Register</h1>
            <input
                className="form-input"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                className="form-input"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="form-input"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn-primary" onClick={handleRegister}>Register</button>
            <button  className="btn-ghost" style={{ marginLeft: '12px' }} onClick={() => navigate('/Login')}>login</button>
            
        </div>
    )
}


export default RegisterPage;