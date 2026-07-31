import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../api/axios"
import '../styles/Dashboard.css'

const Dashboard = () => {
    const navigate = useNavigate()
    const [bikes, setBikes] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if(!token){
            navigate('/login')
        }

        const fetchBikes = async() => {
            try{
                const res = await api.get('api/bikes/')
                setBikes(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchBikes()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        navigate('/login')
    }

    const removeBike = async(id) => {
        if(!window.confirm("Delete this bike and all of it's maintenance logs? This can't be undone.")){
            return
        }
        await api.delete(`api/bikes/${id}/`)
        setBikes(bikes.filter(bikes => bikes.id !== id))
    }

    const editBike = (id) => {
        navigate(`/edit-bike/${id}`)
    }

    const handleLog = (id) => {
        navigate(`/logs/${id}`)
    }

    return(
        <div className="dashboard">
            <h1>Dashboard</h1>

            <h2>My Bikes</h2>
            {bikes.map(bike => (
                <div className="bike-card" key={bike.id}>
                    <h3 className="bike-name">{bike.year} {bike.make} {bike.model_name}</h3>

                    <br/>

                    <h3 className="dash-hours">{bike.current_hours}</h3>

                    <br/>

                    <button className="btn-log" onClick={() => handleLog(bike.id)}>log</button>

                    <br/>

                    <button className="btn-danger" onClick={() => removeBike(bike.id)}>remove</button>
                    <button className="btn-ghost" onClick={() => editBike(bike.id)}>edit</button>
                </div>
            ))}

            <button className="btn-ghost" onClick={handleLogout}>Log out</button>
            <button className="btn-primary" onClick={() => navigate('/add-bike')}>Add Bike</button>
        </div>
    )
}

const EditBike = () => {
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [error, setError] = useState('')

    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if(!token){
            navigate('/')
        }

        const fetchBike = async() => {
            try{
                const res = await api.get(`api/bikes/${id}/`)
                setMake(res.data.make)
                setModel(res.data.model_name)
                setYear(res.data.year)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchBike()
    }, [])

    const handleSubmit = async () => {
        try{
            const response = await api.put(`api/bikes/${id}/`, {
                make,
                model_name: model,
                year,
            })
            navigate('/')
        }
        catch(err){
            console.log(err)
            console.log(err.response)
        }
    }

    const BIKE_DATA = {
        Beta: ["450 RX"],
        Ducati: ["Desmo450 MX"],
        GasGas: ["MC 250F", "MC 450F"],
        Honda: ["CRF250R", "CRF250R Works Edition", "CRF450R", "CRF450R Works Edition"],
        Husqvarna: ["FC 250", "FC 250 Rockstar Edition", "FC 350", "FC 450"],
        Kawasaki: ["KX250F", "KX250", "KX450F", "KX450"],
        KTM: ["250 SX-F", "250 SX-F Factory Edition", "350 SX-F", "450 SX-F", "450 SX-F Factory Edition"],
        Suzuki: ["RM-Z250", "RM-Z450"],
        Triumph: ["TF 250-X", "TF 450-X"],
        Yamaha: ["YZ250F", "YZ450F", "YZ450F Monster Edition"],
    }

    return(
        <div className="form-page edit-bike">
            <h1>Edit Bike</h1>

            <select className="form-input" value={make} onChange={(e) => { setMake(e.target.value); setModel('') }}>
                <option value="">Select Make</option>
                {Object.keys(BIKE_DATA).map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                ))}
            </select>

            <select className="form-input" value={model} onChange={(e) => setModel(e.target.value)} disabled={!make}>
                <option value="">Select Model</option>
                {make && BIKE_DATA[make].map(m => (
                    <option key={m} value={m}>{m}</option>
                ))}
            </select>

            <input
                className="form-input"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
            />

            <br/>
            <button className="btn-primary" onClick={handleSubmit}>Apply</button>
            <br/>
            <button className="btn-ghost" onClick={() => navigate('/')}>Cancel</button>
        </div>
    )
}

export {Dashboard, EditBike}