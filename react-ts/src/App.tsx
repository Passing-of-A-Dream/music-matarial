import { useNavigate } from 'react-router-dom';
import './App.css'
import Layout from './components/Layout/Layout';
import useHomeState from '@/state/useHomeState/useHomeState';
import { useSnapshot } from 'valtio';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate()
  const snap = useSnapshot(useHomeState)
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
