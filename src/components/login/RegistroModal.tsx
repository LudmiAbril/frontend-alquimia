import React, { useState } from 'react'

const RegistroModal = ({ onSuccess, onLoginClick }: { onSuccess: () => void, onLoginClick: () => void }) => {
    const [email, setEmail] = useState("");
    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensaje("Procesando...");

        const response = await fetch("https://localhost:7164/cuenta/registrar-json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                email,
                password,
                name: nombre,
                rol: "Creador",
            }),
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("jwtToken", data.token);
            setMensaje("Registro exitoso 🎉");
            onSuccess?.();
        } else {
            console.error("❌ Error en registro:", data);
            setMensaje("Error en el registro ❌");
        }
    };

    // dar estilos de modal posteriormente
    return (
        <div style={{ padding: "2rem" }}>
            <h1>Registro</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Email: </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
                </div>
                <div>
                    <label>Nombre completo: </label>
                    <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div>
                    <label>Contraseña: </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
                </div>
                <button type="submit">Registrarse</button>
            </form>
            <p>{mensaje}</p>
            <button onClick={() => window.location.href = "https://localhost:7164/cuenta/login-google"}>
                Iniciar sesión con Google
            </button>
            <hr style={{ margin: "2rem 0" }} />


        </div>
    )
}

export default RegistroModal