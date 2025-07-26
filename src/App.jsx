import { useState } from 'react'
import axios from 'axios'

const API = 'https://warmail-backend.onrender.com'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [inbox, setInbox] = useState([])

  const login = async () => {
    const res = await axios.post(`${API}/login`, { email, password })
    setInbox(res.data.inbox)
  }

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Warmail</h1>
      <input
        type="email"
        placeholder="Correo"
        className="border p-2 mr-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="border p-2 mr-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login} className="bg-blue-600 text-white p-2 rounded">
        Iniciar sesión
      </button>

      <h2 className="text-xl mt-6 mb-2 font-semibold">Bandeja de entrada</h2>
      <ul className="space-y-2">
        {inbox.map((msg, idx) => (
          <li key={idx} className="border p-2 rounded">
            <strong>De:</strong> {msg.from} <br />
            <strong>Mensaje:</strong> {msg.message}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
