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
            setError('Registration failed. Try a different username.')
        }
    }


    return(
    <div className="auth-page register-page">
        <h1>Create Your Account</h1>
        <p className="auth-tagline">
            Join riders tracking their bikes, maintenance, and mix ratios in one place.
        </p>

        {error && <p className="auth-error">{error}</p>}

        <input className="form-input" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="form-input" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="form-input" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="btn-primary" onClick={handleRegister}>Register</button>

        <p className="auth-switch">
            Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </p>
    </div>
)
}


export default RegisterPage;