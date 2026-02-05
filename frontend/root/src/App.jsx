import { useState } from 'react'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState("") 
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)

  const generateImage = async () => {
    if (!prompt) return alert("Please enter a prompt");

    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      })
      const data = await res.json()

      if (data.image) {
        setImage(data.image)
      } else {
        alert(data.error || "Generation failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-container">
      <div className="card">
        <h1>AI Image Generator</h1>

        <input
          type="text"
          placeholder="A futuristic city at sunset..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />

        <button onClick={generateImage} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>

        <div style={{ marginTop: '20px' }}>
          {image && <img src={image} alt="Generated" style={{ maxWidth: '100%', borderRadius: '8px' }} />}
        </div>
      </div>
    </div>
  )
}

export default App



