import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api/axios'
import { Icon } from '../components/MotoShell'
import '../styles/MaintenanceLog.css'

const MaintenanceLog = () => {
  const navigate = useNavigate()
  const [logs, setLogs] = useState([])
  const [parts, setParts] = useState([])
  const [loading, setLoading] = useState(true)
  const { pk } = useParams()

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/login')
      return
    }

    async function loadRecords() {
      try {
        const [logResponse, partResponse] = await Promise.all([
          api.get(`api/bikes/log/${pk}/`),
          api.get(`api/bikes/parts/${pk}/`)
        ])
        setLogs(logResponse.data.results || logResponse.data)
        setParts(partResponse.data.results || partResponse.data)
      } catch (error) {
        console.error('Unable to load service records:', error)
      } finally {
        setLoading(false)
      }
    }
    loadRecords()
  }, [pk, navigate])

  async function removeLog(id) {
    if (!window.confirm('Remove this service record?')) return
    try {
      await api.delete(`api/bikes/log/detail/${id}/`)
      setLogs(current => current.filter(log => log.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  async function removePart(id) {
    if (!window.confirm('Remove this part record?')) return
    try {
      await api.delete(`api/bikes/parts/detail/${id}/`)
      setParts(current => current.filter(part => part.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="log-page">
      <div className="moto-log-heading">
        <div><p className="moto-eyebrow">WORKSHOP / BIKE {pk}</p><h1 className="moto-heading">SERVICE HISTORY<span className="moto-hero-period">.</span></h1><p className="moto-description">Keep every repair, replacement and service in one place.</p></div>
        <button className="btn-ghost" onClick={() => navigate('/')}><Icon name="back" size={17}/> BACK TO GARAGE</button>
      </div>

      <div className="moto-log-summary">
        <div><span>MAINTENANCE ENTRIES</span><strong>{loading ? '—' : logs.length}</strong></div>
        <div><span>PART RECORDS</span><strong>{loading ? '—' : parts.length}</strong></div>
        <div><span>YOUR MACHINE</span><strong className="moto-log-summary-label">SERVICE LOG</strong></div>
      </div>

      <section className="moto-record-section">
        <div className="moto-record-heading"><div><p className="moto-eyebrow">MAINTENANCE / 01</p><h2>WORKSHOP LOG</h2></div><button className="btn-primary" onClick={() => navigate(`/add-log/${pk}`)}><Icon name="plus" size={17}/> ADD SERVICE</button></div>
        {logs.length === 0 ? <div className="moto-record-empty">{loading ? 'Loading records...' : 'No service entries yet. Add a log after your next maintenance session.'}</div> : (
          <div className="moto-record-list">
            {logs.map(log => <article className="log-card" key={log.id}>
              <div className="moto-record-marker"><Icon name="wrench" size={21}/></div>
              <div className="moto-record-details"><span className="moto-record-type">SERVICE ENTRY</span><h3 className="log-date">{log.date}</h3><p className="log-desc desc-text">{log.description || 'No description added'}</p></div>
              <div className="moto-record-end"><span className="log-hours">{log.hours}</span><div className="moto-record-actions"><button className="btn-ghost" onClick={() => navigate(`/edit-log/${log.id}`)}>EDIT</button><button className="btn-danger" onClick={() => removeLog(log.id)}>REMOVE</button></div></div>
            </article>)}
          </div>
        )}
      </section>

      <section className="moto-record-section">
        <div className="moto-record-heading"><div><p className="moto-eyebrow">PARTS / 02</p><h2>PARTS HISTORY</h2></div><button className="btn-primary" onClick={() => navigate(`/part-add/${pk}`)}><Icon name="plus" size={17}/> ADD PART</button></div>
        {parts.length === 0 ? <div className="moto-record-empty">{loading ? 'Loading parts...' : 'No parts recorded yet. Track replacements to keep your bike dialed in.'}</div> : (
          <div className="moto-record-list">
            {parts.map(part => <article className="log-card" key={part.id}>
              <div className="moto-record-marker"><Icon name="wrench" size={21}/></div>
              <div className="moto-record-details"><span className="moto-record-type">PART REPLACEMENT</span><h3 className="log-date">{part.part_type_display || part.part_type}</h3><p className="moto-record-subdate">{part.date}</p><p className="log-desc desc-text">{part.description || 'No description added'}</p></div>
              <div className="moto-record-end"><span className="log-hours">{part.hours}</span><div className="moto-record-actions"><button className="btn-ghost" onClick={() => navigate(`/part-edit/${part.id}`)}>EDIT</button><button className="btn-danger" onClick={() => removePart(part.id)}>REMOVE</button></div></div>
            </article>)}
          </div>
        )}
      </section>
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