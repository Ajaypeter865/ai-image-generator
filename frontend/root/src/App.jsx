import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [promt, setPromt] = useState()

  return (
    <div>
      <h1>Enter you prompt</h1>
      <input type="text" placeholder='Enter text'/>
    </div>

  )
}

export default App
