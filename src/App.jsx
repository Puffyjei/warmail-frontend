
import { useState } from 'react'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [inbox, setInbox] = useState([])
  const [page, setPage] = useState('register')
  const [to, setTo] = useState('')
  const [message, setMessage] = useState('')
  const [loggedEmail, setLoggedEmail] = useState('')

  const api = 'https://warmail-backend.onrender.com'

  const handleRegister = async () => {
    const username = email.split('@')[0]
    const res = await fetch(`${api}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const data = await res.json()
    alert(data.message || data.error)
    if (data.email) {
      setEmail(data.email)
      setPage('login')
    }
  }

  const handleLogin = async () => {
    const res = await fetch(`${api}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (data.error) return alert(data.error)
    setInbox(data.inbox)
    setLoggedEmail(email)
    setPage('inbox')
  }

  const handleSend = async () => {
    const res = await fetch(`${api}/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: loggedEmail, to, message })
    })
    const data = await res.json()
    alert(data.message || data.error)
  }

  return (
    <div className="p-4 font-sans">
      {page === 'register' && (
        <div>
          <h1 className="text-2xl mb-2">Registrarse</h1>
          <input placeholder="Usuario" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 mr-2"/>
          <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 mr-2"/>
          <button onClick={handleRegister} className="bg-blue-500 text-white p-2">Registrar</button>
          <p className="mt-2 cursor-pointer text-sm underline" onClick={() => setPage('login')}>¿Ya tienes cuenta?</p>
        </div>
      )}
      {page === 'login' && (
        <div>
          <h1 className="text-2xl mb-2">Iniciar sesión</h1>
          <input placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 mr-2"/>
          <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 mr-2"/>
          <button onClick={handleLogin} className="bg-green-500 text-white p-2">Entrar</button>
        </div>
      )}
      {page === 'inbox' && (
        <div>
          <h1 className="text-xl mb-4">Bandeja de entrada de {loggedEmail}</h1>
          <div className="mb-4">
            <input placeholder="Para" value={to} onChange={e => setTo(e.target.value)} className="border p-2 mr-2"/>
            <input placeholder="Mensaje" value={message} onChange={e => setMessage(e.target.value)} className="border p-2 mr-2"/>
            <button onClick={handleSend} className="bg-purple-500 text-white p-2">Enviar</button>
          </div>
          <ul>
            {inbox.map((msg, i) => (
              <li key={i} className="border-b py-1"><b>{msg.from}</b>: {msg.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
