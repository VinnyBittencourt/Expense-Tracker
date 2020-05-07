import React from "react";
import { Link, useHistory } from "react-router-dom"; //Link é uma outra forma de usar a tag 'a' porque a tag a faz com que a página faça o load inteiro na página
import { FiLogIn } from "react-icons/fi";

import { Container } from "./style";

export default function login() {
    return (
        <Container>
            <h1>Expense Tracker</h1>
            <form>
                <input type='text' placeholder='Email' />
                <input type='text' placeholder='password' />
                <Link className='back-link' to='/register'>
                    <FiLogIn size={14} color='#9c88ff'></FiLogIn>
                    Don't have an account? Register now.
                </Link>
                <button type='submit'>Log In</button>
            </form>
        </Container>
    );
}
