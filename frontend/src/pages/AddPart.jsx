import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../api/axios"

const PartAdd = () => {
    const navigate = useNavigate()
    const [part, setPart] = useState('')
    const [date, setDate] = useState('')
    const [hours, setHours] = useState('')
    const [description, setDescription] = useState('')

    const {pk} = useParams()

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if(!token){
            navigate('/')
            return
        }
    }, [])

    const PART_TYPES = [
        { value: "oil", label: "Oil" },
        { value: "air_filter", label: "Air Filter" },
        { value: "chain", label: "Chain" },
        { value: "sprockets", label: "Sprockets" },
        { value: "tires", label: "Tires" },
        { value: "brake_pads", label: "Brake Pads" },
    ]

    const handleSubmit = async() => {
        try{
            await api.post(`api/bikes/parts/${pk}/`,{
                bike: pk,
                part_type: part,
                date,
                hours,
                description
            })
            navigate(`/logs/${pk}`)
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div className="form-page add-log">
            <h1>Add Part</h1>

            <select className="form-input" value={part} onChange={(e) => {setPart(e.target.value)}}>
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
            <button className="btn-primary" onClick={handleSubmit}>Add</button>
            <button className="btn-ghost" onClick={() => navigate(`/logs/${pk}`)}>Cancel</button>
        </div>
    )

}

export default PartAdd