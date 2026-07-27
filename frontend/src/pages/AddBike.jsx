import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api/axios"

const AddBikePage = () => {
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if(!token){
            navigate('/')
        }
    }, [])

    const handleSubmit = async () => {
        try{
            const response = await api.post('api/bikes/', {
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
    <div className="form-page add-bike">
        
        <h1>Add Bike</h1>

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

        <button className="btn-primary" onClick={handleSubmit}>Add Bike</button>
        <br/>
        <button className="btn-primary" onClick={() => navigate('/')}>Go back</button>
    </div>
)

    

}

export default AddBikePage