import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Transaction } from "./Transaction";

export const TransactionList = () => {
    const { transactions, getTransactions } = useContext(GlobalContext);

    const JWT = localStorage.getItem("JWT");
    const userId = localStorage.getItem("IdUser");

    console.log(transactions);

    useEffect(() => {
        getTransactions(JWT, userId);
        // eslint-sable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h3>History</h3>
            <ul id='list' className='list'>
                {transactions.map((transaction) => (
                    <Transaction
                        key={transaction.id}
                        transaction={transaction}
                    />
                ))}
            </ul>
        </>
    );
};
