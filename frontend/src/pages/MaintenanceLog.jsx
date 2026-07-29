import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../api/axios"
import '../styles/MaintenanceLog.css'

const MaintenanceLog = () => {
    const navigate = useNavigate()
    const [logs, setLogs] = useState([])

    const [parts, setParts] = useState([])
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

        const fetchParts = async() => {
            const res = await api.get(`api/bikes/parts/${pk}/`)
            setParts(res.data)

        }

        fetchLogs()
        fetchParts()
    }, [pk])

    const removeLog = async(id) => {
        try{
            await api.delete(`api/bikes/log/detail/${id}/`)
            setLogs(logs.filter(logs => logs.id !== id))
        }
        catch(err){
            console.log(err)
        }
    }

    const removePart = async(id) => {
        try{
            await api.delete(`api/bikes/parts/detail/${id}/`)
            setParts(parts.filter(parts => parts.id !== id))
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div className="log-page">
            <h1>Bike Logs</h1>
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

            <h1> Part Logs</h1>
            {parts.map(part => (
                <div className="log-card" key={part.id}>
                    <h1 className="log-date">{part.part_type_display}</h1>
                    <p className="log-date">{part.date}</p>
                    <p className="log-hours">{part.hours}</p>
                    <p className="log-desc">{part.description}</p>

                    <button className="btn-danger" onClick={() => removePart(part.id)}>remove</button>
                    <button className="btn-ghost" onClick={() => navigate(`/part-edit/${part.id}`)}>edit</button>
                </div>
            ))}
            <button className="btn-primary" onClick={() => navigate(`/part-add/${pk}`)}>Add Part</button>

            <br/>
            
            <button className="btn-ghost" onClick={() => navigate('/')}>Back</button>
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

const EditPart = () => {
    const [partType, setPartType] = useState('')
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

        const fetchPart = async () => {
            const res = await api.get(`api/bikes/parts/detail/${pk}/`)
            setPartType(res.data.part_type)
            setDate(res.data.date)
            setHours(res.data.hours)
            setDescription(res.data.description)
        }

        fetchPart()
    }, [pk])

    const handleSubmit = async() => {
        try{
            await api.put(`api/bikes/parts/detail/${pk}/`, {
                part_type: partType,
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

    const PART_TYPES = [
        { value: "oil", label: "Oil" },
        { value: "air_filter", label: "Air Filter" },
        { value: "chain", label: "Chain" },
        { value: "sprockets", label: "Sprockets" },
        { value: "tires", label: "Tires" },
        { value: "brake_pads", label: "Brake Pads" },
    ]

    return(
        <div className="form-page add-log">
            <h1>Edit Part</h1>

            <select className="form-input" value={partType} onChange={(e) => {setPartType(e.target.value)}}>
                <option value={""}> Select Part</option>
                
                    {PART_TYPES.map(p =>(
                        <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
            </select>

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
            <button className="btn-primary" onClick={handleSubmit}>Save</button>
            <button className="btn-ghost" onClick={() => navigate(`/logs/${pk}`)}>Cancel</button>
        </div>
    )
}

export {MaintenanceLog, EditLog, EditPart}