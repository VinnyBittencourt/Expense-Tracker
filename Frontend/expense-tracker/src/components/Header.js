import React from "react";
import { FiPower } from "react-icons/fi";
import { useHistory } from "react-router-dom";

export const Header = () => {
    const history = useHistory();

    function handleLogout() {
        localStorage.clear();
        history.push("/");
    }
    return (
        <div className='main_head'>
            <h2>Expense Tracker</h2>
            <button onClick={handleLogout} type='button'>
                <FiPower size={18} color='#e02041'></FiPower>
            </button>
        </div>
    );
};
