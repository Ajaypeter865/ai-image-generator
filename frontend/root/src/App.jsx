import { useState } from 'react'
import './App.css'

function App() {
  const [promt, setPromt] = useState("")
  const [image, setImage] = useState("")

  const generateImage = async () => {
    const res = await fetch('http://localhost:8000/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ promt })
    })
    const data = await res.json()
    setImage(data.image)
  }

  return (
    <div className="app-container">
      <div className="card">
        <h1>Enter your prompt</h1>

        <input
          type="text"
          placeholder="Enter text"
          onChange={(e) => setPromt(e.target.value)}
        />

        <button onClick={generateImage}>Generate</button>

        {image && <img src={image} alt="Generated" />}
      </div>
    </div>
  )
}

export default App
