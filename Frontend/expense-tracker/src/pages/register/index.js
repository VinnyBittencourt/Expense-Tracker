import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom"; //Link é uma outra forma de usar a tag 'a' porque a tag a faz com que a página faça o load inteiro na página
import { FiLogOut } from "react-icons/fi";

import { Container } from "./style";
import api from "../../services/api";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("Erro");
    const [errorPass, setErrorpass] = useState("Erro");
    let [validName, setValidname] = useState(true);
    let [validPassword, setValidpassword] = useState(true);

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        await setValidname((validName = true));
        await setValidname((validPassword = true));

        if (!name || name.length < 4) {
            await setValidname((validName = false));
            console.log(validName);
            await setError("The name field needs at least 4 characters");
            return;
        }

        if (name) {
            let haveNumber = name.replace(/[^0-9]/g, "");
            if (haveNumber) {
                await setValidname((validName = false));
                console.log(validName);
                await setError("The name field cannot have numbers");
                return;
            }
        }

        if (!password || password.length < 4) {
            await setValidpassword((validPassword = false));
            console.log(validPassword);
            await setErrorpass(
                "The password field needs at least 4 characters"
            );
            return;
        }

        const data = {
            name,
            email,
            password,
        };

        // try {
        //     await api.post("/auth/register", data);
        //     alert("Thanks for using the Expense Tracker service!");

        //     history.push("/");
        // } catch (err) {
        //     console.log(err);
        //     alert("All fields are required!");
        // }
    }

    return (
        <Container>
            <h1>Expense Tracker</h1>
            <form onSubmit={handleRegister}>
                <label className={validName ? "erro" : "disp"}>{error}</label>
                <input
                    type='text'
                    placeholder='Your Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type='email'
                    placeholder='Your Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className={validPassword ? "erro" : "disp"}>
                    {errorPass}
                </label>
                <input
                    type='password'
                    placeholder='Your Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Link className='back-link' to='/'>
                    Already have an account
                    <FiLogOut size={14} color='#9c88ff'></FiLogOut>
                </Link>
                <button type='submit'>Register</button>
            </form>
        </Container>
    );
}
