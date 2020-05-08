import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom"; //Link é uma outra forma de usar a tag 'a' porque a tag a faz com que a página faça o load inteiro na página
import { FiLogIn } from "react-icons/fi";

import { Container } from "./style";

import api from "../../services/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        const data = {
            email,
            password,
        };

        try {
            const respon = await api.post("/auth/authenticate", data);

            localStorage.setItem("JWT", respon.data.token);
            localStorage.setItem("nameUser", respon.data.user.name);
            localStorage.setItem("IdUser", respon.data.user._id);

            history.push("/tracker");
        } catch (err) {
            console.log(err);
            alert("Something went wrong!");
        }
    }
    return (
        <Container>
            <h1>Expense Tracker</h1>
            <form onSubmit={handleLogin}>
                <input
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Link className='back-link' to='/register'>
                    <FiLogIn size={14} color='#9c88ff'></FiLogIn>
                    Don't have an account? Register now.
                </Link>
                <button type='submit'>Log In</button>
            </form>
        </Container>
    );
}
