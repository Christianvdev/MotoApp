import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../api/axios"

const MaintenanceAdd = () => {
    const navigate = useNavigate()
    const [date, setDate] = useState('')
    const [hours, setHours] = useState('')
    const [description, setDescription] = useState('')
    const { pk } = useParams()

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if(!token){
            navigate('/')
            return
        }
    }, [])

    const handleSubmit = async() => {
        try{
            await api.post(`api/bikes/log/${pk}/`, {
            bike: pk,
            date,
            hours,
            description
        })
            navigate(`/logs/${pk}`)
        }
        catch(err){
            console.log(err.response.data)
        }
    }

    return(
        <div>
            <h1>Add Log</h1>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <input
                type="number"
                placeholder="Hours"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
            />
            <input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleSubmit}>Log</button>
            <button onClick={() => navigate(`/logs/${pk}`)}>Cancel</button>
        </div>
    )
}

export default MaintenanceAdd