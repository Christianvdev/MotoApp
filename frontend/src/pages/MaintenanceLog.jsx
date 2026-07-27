import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../api/axios"
import '../styles/MaintenanceLog.css'

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

    const removeLog = async(id) => {
        try{
            await api.delete(`api/bikes/log/detail/${id}/`)
            setLogs(logs.filter(logs => logs.id !== id))
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div className="log-page">
            <h1>Log</h1>
            {logs.map(log => (
                <div className="log-card" key={log.id}>
                    <p className="log-date">{log.date}</p>
                    <p className="log-hours">{log.hours}</p>
                    <p className="log-desc">{log.description}</p>

                    <button className="btn-danger" onClick={() => removeLog(log.id)}>remove</button>
                    <button className="btn-ghost" onClick={() => navigate(`/edit-log/${log.id}`)}>edit</button>
                </div>
            ))}

            <button className="btn-primary" onClick={() => navigate(`/add-log/${pk}`)}>Add Log</button>
            <button className="btn-ghost" onClick={() => navigate('/dashboard')}>Back</button>
        </div>
    )
}

const EditLog = () => {
    const [date, setDate] = useState('')
    const [hours, setHours] = useState('')
    const [description, setDescription] = useState('')

    const {pk} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if(!token){
            navigate('/')
            return
        }

        const fetchLog = async () => {
            const res = await api.get(`api/bikes/log/detail/${pk}/`)
            setDate(res.data.date)
            setHours(res.data.hours)
            setDescription(res.data.description)
        }

        fetchLog()
    }, [pk])

    const handleSubmit = async() => {
        try{
            await api.put(`api/bikes/log/detail/${pk}/`, {
                date,
                hours,
                description,
            })
            navigate(`/logs/${pk}`)
        }
        catch(err){
            console.log(err.response.data)
        }
    }

    return(
        <div className="form-page edit-log">
            <h1>Edit Log</h1>
            <input
                className="form-input"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <input
                className="form-input"
                type="number"
                placeholder="Hours"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
            />
            <input
                className="form-input"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button className="btn-primary" onClick={handleSubmit}>Log</button>
            <button className="btn-ghost" onClick={() => navigate(`/logs/${pk}`)}>Cancel</button>
        </div>
    )
}

export {MaintenanceLog, EditLog}