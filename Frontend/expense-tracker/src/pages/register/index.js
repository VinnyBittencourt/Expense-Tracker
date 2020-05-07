import React from "react";
import { Link } from "react-router-dom"; //Link é uma outra forma de usar a tag 'a' porque a tag a faz com que a página faça o load inteiro na página
import { FiLogOut } from "react-icons/fi";

import { Container } from "./style";

export default function register() {
    return (
        <Container>
            <h1>Expense Tracker</h1>
            <form>
                <input type='text' placeholder='Your Name' />
                <input type='text' placeholder='Your Email' />
                <input type='text' placeholder='Your Password' />
                <Link className='back-link' to='/'>
                    Já tenho cadastro
                    <FiLogOut size={14} color='#9c88ff'></FiLogOut>
                </Link>
                <button type='submit'>Cadastrar</button>
            </form>
        </Container>
    );
}
