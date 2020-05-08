import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";

export const Transaction = ({ transaction }) => {
    const { deleteTransaction } = useContext(GlobalContext);

    const jwt = localStorage.getItem("JWT");

    const sign = transaction.amount < 0 ? "-" : "+";
    return (
        <li className={transaction.amount < 0 ? "minus" : "plus"}>
            {transaction.text}{" "}
            <span>
                {sign}${numberWithCommas(Math.abs(transaction.amount))}
            </span>
            <button
                className='delete-btn'
                onClick={() => deleteTransaction(transaction._id, jwt)}
            >
                x
            </button>
        </li>
    );
};
