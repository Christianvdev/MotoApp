import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import '../styles/MotoShell.css'

// A small set of icons keeps the garage navigation consistent.
function Icon({ name, size = 21 }) {
  const paths = {
    bike: <><circle cx="5.5" cy="17" r="3.5"/><circle cx="18.5" cy="17" r="3.5"/><path d="m5.5 17 4.5-9 4 9h4.5l-4-9h-4.5M14 8h3l2 3M8 8H6"/></>,
    garage: <><path d="M3 21V8l9-5 9 5v13M3 11h18M7 21v-7h10v7M7 17h10"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    drop: <><path d="M12 3c-3.5 5-7 8.5-7 12a7 7 0 0 0 14 0c0-3.5-3.5-7-7-12Z"/><path d="M9 17a3 3 0 0 0 3 3"/></>,
    wrench: <><path d="M14.5 6.5a5 5 0 0 0-6 6L3 18a2 2 0 0 0 3 3l5.5-5.5a5 5 0 0 0 6-6l-3 3-3-3 3-3Z"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/></>,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6"/>,
    back: <path d="m15 18-6-6 6-6"/>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

export { Icon }

export default function MotoShell() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isGarage = pathname === '/'
  const isMix = pathname === '/mix-calc'
  const isAdd = pathname === '/add-bike'
  const pageLabel = isGarage ? 'My garage' : isMix ? 'Premix calculator' : isAdd ? 'Add a bike' : pathname.startsWith('/logs/') ? 'Service history' : pathname.includes('part') ? 'Parts & service' : 'Bike workshop'

  function signOut() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate('/login')
  }

  return (
    <div className="moto-shell">
      <header className="moto-topbar">
        <button className="moto-logo" onClick={() => navigate('/')} aria-label="MotoTracker garage">
          <span className="moto-logo-mark"><Icon name="bike" size={23}/></span>
          <span className="moto-logo-type">MOTO<span>TRACKER</span><b>.</b><small>RIDER GARAGE</small></span>
        </button>
        <div className="moto-topbar-end">
          <span className="moto-live"><span className="moto-live-dot"/> GARAGE ONLINE</span>
          <span className="moto-topbar-divider"/>
          <span className="moto-topbar-location">{pageLabel}</span>
          <button className="moto-top-logout" onClick={signOut} title="Sign out" aria-label="Sign out"><Icon name="logout" size={18}/></button>
        </div>
      </header>

      <div className="moto-body">
        <aside className="moto-rail" aria-label="Main navigation">
          <span className="moto-rail-label">RIDE</span>
          <button className={`moto-rail-item ${isGarage ? 'active' : ''}`} onClick={() => navigate('/')} title="Garage"><Icon name="garage"/><span>Garage</span></button>
          <button className={`moto-rail-item ${isAdd ? 'active' : ''}`} onClick={() => navigate('/add-bike')} title="Add bike"><Icon name="plus"/><span>Add bike</span></button>
          <button className={`moto-rail-item ${isMix ? 'active' : ''}`} onClick={() => navigate('/mix-calc')} title="Mix calculator"><Icon name="drop"/><span>Premix</span></button>
          <div className="moto-rail-spacer"/>
          <button className="moto-rail-item moto-rail-exit" onClick={signOut} title="Sign out"><Icon name="logout"/><span>Exit</span></button>
        </aside>

        <main className="moto-content">
          <Outlet/>
          <footer className="moto-footer"><span>MOTO<span className="moto-blue">TRACKER</span> / RIDER GARAGE</span><span>BUILT FOR THE RIDE</span></footer>
        </main>
      </div>

      <nav className="moto-mobile-nav" aria-label="Mobile navigation">
        <button className={isGarage ? 'active' : ''} onClick={() => navigate('/')}><Icon name="garage" size={21}/><span>Garage</span></button>
        <button className={isAdd ? 'active' : ''} onClick={() => navigate('/add-bike')}><Icon name="plus" size={21}/><span>Add bike</span></button>
        <button className={isMix ? 'active' : ''} onClick={() => navigate('/mix-calc')}><Icon name="drop" size={21}/><span>Premix</span></button>
        <button onClick={signOut}><Icon name="logout" size={21}/><span>Exit</span></button>
      </nav>
    </div>
  )
}
