import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../api/axios"
import '../styles/Oil.css'
const OilCalc = () => {
    const [gallons, setGallons] = useState('')
    const [ratio, setRatio] = useState('')

    const navigate = useNavigate()
    const calculateOz = () => {
        if(!gallons || !ratio) return 0
        return (gallons * 128) / ratio
    }

    return(
        <div className="form-page add-log">
            <h1>Mix Calculator</h1>

            <input
                className="form-input"
                type="number"
                placeholder="Gallons of gas"
                value={gallons}
                onChange={(e) => setGallons(e.target.value)}
            />

            <select className="form-input" value={ratio} onChange={(e) => setRatio(e.target.value)}>
                <option value="">Select Ratio</option>
                <option value={"30"}>30:1</option>
                <option value="32">32:1</option>
                <option value="40">40:1</option>
                <option value="50">50:1</option>
            </select>

            <p className="oil-result">
                Oil needed: <span>{calculateOz().toFixed(2)}</span> oz
            </p>

            <button className="btn-ghost" onClick={() => navigate('/')}>Back</button>
        </div>
    )
}

export default OilCalc