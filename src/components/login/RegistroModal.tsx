import React, { useState } from 'react'

const RegistroModal = () => {
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
                Name: nombre,
            }),
        });

        if (response.ok) {
            setMensaje("Registro exitoso 🎉");
        } else {
            const error = await response.json();
            console.error(error);
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