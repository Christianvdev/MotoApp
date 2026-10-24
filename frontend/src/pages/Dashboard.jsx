import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api/axios'
import { Icon } from '../components/MotoShell'
import '../styles/Dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate()
  const [bikes, setBikes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/login')
      return
    }
    async function fetchBikes() {
      try {
        const response = await api.get('api/bikes/')
        setBikes(response.data.results || response.data)
      } catch (error) {
        console.error('Unable to load garage:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBikes()
  }, [navigate])

  async function removeBike(id) {
    if (!window.confirm("Delete this bike and all of its maintenance logs? This can't be undone.")) return
    try {
      await api.delete(`api/bikes/${id}/`)
      setBikes(current => current.filter(bike => bike.id !== id))
    } catch (error) {
      console.error('Unable to remove bike:', error)
    }
  }

  const totalHours = bikes.reduce((sum, bike) => sum + (Number(bike.current_hours) || 0), 0)

  return (
    <div className="dashboard moto-garage">
      <section className="moto-garage-hero">
        <div className="moto-garage-hero-content">
          <p className="moto-eyebrow">THE RIDER'S WORKSHOP</p>
          <h1 className="moto-heading">YOUR GARAGE<span className="moto-hero-period">.</span></h1>
          <p className="moto-description">Every machine has a story. Keep your hours, service history and parts organized between rides.</p>
          <div className="moto-hero-actions">
            <button className="btn-primary" onClick={() => navigate('/add-bike')}><Icon name="plus" size={17}/> ADD A BIKE</button>
            <button className="btn-ghost" onClick={() => navigate('/mix-calc')}><Icon name="drop" size={17}/> MIX CALCULATOR</button>
          </div>
        </div>
        <div className="moto-hero-art" aria-hidden="true">
          <span className="moto-hero-art-number">MX</span>
          <span className="moto-hero-art-line"/>
          <Icon name="bike" size={102}/>
          <span className="moto-hero-art-caption">RIDE / SERVICE / REPEAT</span>
        </div>
      </section>

      <section className="moto-garage-summary" aria-label="Garage overview">
        <div><span>BIKES IN GARAGE</span><strong>{loading ? '—' : String(bikes.length).padStart(2, '0')}</strong></div>
        <div><span>COMBINED ENGINE HOURS</span><strong>{loading ? '—' : totalHours.toLocaleString(undefined, { maximumFractionDigits: 1 })}<small> HRS</small></strong></div>
        <div className="moto-summary-link"><span>QUICK TOOL</span><button onClick={() => navigate('/mix-calc')}>PREMIX CALCULATOR <Icon name="arrow" size={18}/></button></div>
      </section>

      <div className="moto-section-heading"><div><p className="moto-eyebrow">MACHINES / 01</p><h2>MY BIKES</h2></div><span>{bikes.length} {bikes.length === 1 ? 'MACHINE' : 'MACHINES'} REGISTERED</span></div>

      {loading ? <div className="moto-garage-empty">Loading your garage...</div> : bikes.length === 0 ? (
        <div className="moto-garage-empty">
          <span className="moto-empty-icon"><Icon name="bike" size={39}/></span>
          <h3>YOUR GARAGE IS WAITING.</h3>
          <p>Add your first dirt bike to start keeping track of its hours and maintenance.</p>
          <button className="btn-primary" onClick={() => navigate('/add-bike')}>ADD YOUR FIRST BIKE <Icon name="arrow" size={17}/></button>
        </div>
      ) : (
        <div className="moto-bike-grid">
          {bikes.map((bike, index) => (
            <article className="bike-card" key={bike.id}>
              <div className="moto-bike-topline"><span>GARAGE / {String(index + 1).padStart(2, '0')}</span><span className="moto-bike-active">● ACTIVE MACHINE</span></div>
              <div className="moto-bike-visual" aria-hidden="true"><span>{bike.make}</span><Icon name="bike" size={82}/></div>
              <div className="moto-bike-info"><span className="moto-bike-year">{bike.year} / {bike.make}</span><h3 className="bike-name">{bike.model_name}</h3></div>
              <div className="moto-bike-meter"><span>ENGINE TIME</span><strong className="bike-hours">{bike.current_hours}<small> HRS</small></strong></div>
              <button className="btn-log moto-bike-main-action" onClick={() => navigate(`/logs/${bike.id}`)}>SERVICE HISTORY <Icon name="arrow" size={17}/></button>
              <div className="moto-bike-actions"><button className="btn-ghost" onClick={() => navigate(`/edit-bike/${bike.id}`)}>EDIT BIKE</button><button className="btn-danger" onClick={() => removeBike(bike.id)}>REMOVE</button></div>
            </article>
          ))}
          <button className="moto-add-bike-tile" onClick={() => navigate('/add-bike')}><span><Icon name="plus" size={25}/></span><strong>ADD ANOTHER BIKE</strong><small>Make room for the next machine</small></button>
        </div>
      )}
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