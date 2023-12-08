import { useNavigate } from 'react-router-dom';
import './App.css'
import Layout from './components/Layout/Layout';
import { useSnapshot } from 'valtio';
import { useEffect } from 'react';
import globaVarlot from './state/globaVarlot/globaVarlot';
import 'bytemd/dist/index.css'

function App() {
  const navigate = useNavigate()
  const snap = useSnapshot(globaVarlot)
  useEffect(() => {
    navigate(snap.menuChiose)
  }, [snap.menuChiose])

  return (
    <div className='h-screen w-screen'>
      <Layout />
    </div>
  )
}

export default App
