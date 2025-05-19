"use client"
import React, { useState } from 'react'

const LoginModal = ({ onSuccess, onRegisterClick }: { onSuccess: () => void, onRegisterClick: () => void }) => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginMensaje, setLoginMensaje] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginMensaje("Procesando...");

        const response = await fetch("https://localhost:7164/cuenta/login-json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                email: loginEmail,
                password: loginPassword,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("jwtToken", data.token);
            setLoginMensaje("Login exitoso ✅");
            onSuccess();
        } else {
            const error = await response.json();
            console.error(error);
            setLoginMensaje("Error en el login ❌");
        }
    };
    
    // dar estilos de modal posteriormente
    return (
        <div style={{ padding: "2rem" }}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email: </label>
                    <input value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} type="email" required />
                </div>
                <div>
                    <label>Contraseña: </label>
                    <input value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} type="password" required />
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
            <p>{loginMensaje}</p>
        </div>
    )
}

export default LoginModal