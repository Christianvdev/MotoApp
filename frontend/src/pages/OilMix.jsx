import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../components/MotoShell'
import '../styles/Oil.css'

export default function OilCalc() {
  const [gallons, setGallons] = useState('')
  const [ratio, setRatio] = useState('40')
  const navigate = useNavigate()
  const amount = Number(gallons) > 0 && Number(ratio) > 0 ? (Number(gallons) * 128) / Number(ratio) : 0

  return (
    <div className="moto-mix-page">
      <div className="moto-mix-intro">
        <p className="moto-eyebrow">TWO-STROKE TOOLKIT</p>
        <h1 className="moto-heading">PREMIX<span className="moto-hero-period">.</span></h1>
        <p className="moto-description">No guesswork at the pump. Get your oil amount for the ratio your bike needs.</p>
      </div>
      <div className="moto-mix-layout">
        <section className="moto-mix-controls">
          <div className="moto-mix-panel-heading"><span>01 / FUEL INPUT</span><Icon name="drop" size={20}/></div>
          <label htmlFor="fuel-gallons">GALLONS OF GAS</label>
          <input id="fuel-gallons" className="form-input" type="number" min="0" step="0.1" placeholder="e.g. 2.5" value={gallons} onChange={event => setGallons(event.target.value)}/>
          <label htmlFor="mix-ratio">OIL MIX RATIO</label>
          <select id="mix-ratio" className="form-input" value={ratio} onChange={event => setRatio(event.target.value)}>
            <option value="30">30:1</option><option value="32">32:1</option><option value="40">40:1</option><option value="50">50:1</option>
          </select>
          <p className="moto-mix-hint">Use the fuel-to-oil ratio recommended for your engine.</p>
        </section>
        <section className="moto-mix-result">
          <div className="moto-mix-panel-heading"><span>02 / YOUR MIX</span><Icon name="wrench" size={20}/></div>
          <span className="moto-mix-result-label">TWO-STROKE OIL NEEDED</span>
          <div className="moto-mix-number">{amount.toFixed(2)}<span> FL OZ</span></div>
          <div className="moto-mix-divider"/>
          <p>{Number(gallons) > 0 ? `${gallons} gallons of gas at ${ratio}:1` : 'Enter your fuel amount to calculate your mix.'}</p>
          <div className="moto-mix-ratio-badge">RATIO / {ratio}:1</div>
        </section>
      </div>
      <button className="btn-ghost moto-mix-back" onClick={() => navigate('/')}><Icon name="back" size={17}/> BACK TO GARAGE</button>
    </div>
  )
}
