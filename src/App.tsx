import { HashRouter, Routes, Route } from 'react-router'

import './index.css'

import Home from './pages/Home'
import Computacao from './pages/Computacao'
import Mecanica from './pages/Mecanica'


function App() {
  return (
    <div className='App'>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/computacao' element={<Computacao />} />
          <Route path='/mecanica' element={<Mecanica />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App