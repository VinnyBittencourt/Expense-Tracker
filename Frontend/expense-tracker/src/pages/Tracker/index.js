import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Header } from "../../components/Header";
import { Balance } from "../../components/Balance";
import { IncomeExpenses } from "../../components/IncomeExpenses";
import { TransactionList } from "../../components/TransactionList";
import { AddTransaction } from "../../components/AddTransaction";

import { GlobalProvider } from "../../context/GlobalState";

export default function Tracker() {
    const history = useHistory();

    useEffect(() => {
        const jwtmain = localStorage.getItem("JWT");
        if (!jwtmain) {
            history.push("/");
        }
    }, []);
    return (
        <GlobalProvider>
            <Header />
            <div className='container'>
                <Balance />
                <IncomeExpenses />
                <TransactionList />
                <AddTransaction />
            </div>
        </GlobalProvider>
    );
}
