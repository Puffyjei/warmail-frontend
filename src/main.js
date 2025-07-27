
const API_URL = "https://warmail-backend.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  root.innerHTML = `
    <h1>Warmail</h1>
    <div>
      <input type="text" id="username" placeholder="Nombre de usuario" />
      <input type="password" id="password" placeholder="Contraseña" />
      <button id="registerBtn">Registrarse</button>
      <button id="loginBtn">Iniciar sesión</button>
    </div>
    <div id="output"></div>
  `;

  document.getElementById("registerBtn").onclick = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const res = await fetch(API_URL + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    document.getElementById("output").innerText = JSON.stringify(data, null, 2);
  };

  document.getElementById("loginBtn").onclick = async () => {
    const username = document.getElementById("username").value;
    const email = `${username}@warmail`;
    const password = document.getElementById("password").value;
    const res = await fetch(API_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    document.getElementById("output").innerText = JSON.stringify(data, null, 2);
  };
});
