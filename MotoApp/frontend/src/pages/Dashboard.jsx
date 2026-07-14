import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api/axios"

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
        await api.delete(`api/bikes/${id}/`)
        setBikes(bikes.filter(bikes => bikes.id !== id))
    }

    const editBike = (id) => {
        navigate(`/edit-bike/${id}`)
    }

   return(
    <div>
        <h1>Dashboard</h1>

        <h2>My Bikes</h2>
        {bikes.map(bike => (
            <div key={bike.id}>
                <h3>{bike.year} {bike.make} {bike.model_name}</h3>

                <br/>
                <button onClick={() => removeBike(bike.id)}>remove</button>
                <button onClick={() => editBike(bike.id)}>edit</button>
            </div>
        ))}

            <button onClick={handleLogout}>Log out</button>
            <button onClick={() => navigate('/add-bike')}>Add Bike</button>
        </div>
    )
}

const editBike = () => {

}

export {Dashboard, editBike}