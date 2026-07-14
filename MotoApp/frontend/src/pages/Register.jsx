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
        <div>
            {error && <p>{error}</p>}
            <h1>Register</h1>
            <input
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleRegister}>Register</button>
        </div>
    )
}


export default RegisterPage;

