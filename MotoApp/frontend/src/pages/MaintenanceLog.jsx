import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../api/axios"

const MaintenanceLog = () => {
    const navigate = useNavigate()
    const [logs, setLogs] = useState([])
    const { pk } = useParams()

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if(!token){
            navigate('/login')
            return
        }

        const fetchLogs = async() => {
            try{
                const res = await api.get(`api/bikes/log/${pk}/`)
                setLogs(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchLogs()
    }, [])

    return(
        <div>
            <h1>Log</h1>
            {logs.map(log => (
                <div key={log.id}>
                    <p>{log.date}</p>
                    <p>{log.hours}</p>
                    <p>{log.description}</p>
                </div> 
            ))}

            <button onClick={() => navigate(`/add-log/${pk}`)}>Add Log</button>
            <button onClick={() => navigate('/dashboard')}>Back</button>
        </div>
    )
}

export default MaintenanceLog