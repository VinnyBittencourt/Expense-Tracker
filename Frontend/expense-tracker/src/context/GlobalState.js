import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

//Initial state
const initialState = {
    transactions: [],
    error: null,
    loading: true,
};

//Create context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //Actions
    async function getTransactions(JWT, userId) {
        try {
            const res = await axios.get(`/transactions/${userId}`, {
                headers: {
                    Authorization: `Bearer ${JWT}`,
                },
            });
            dispatch({
                type: "GET_TRANSACTIONS",
                payload: res.data.data,
            });
        } catch (err) {
            dispatch({
                type: "TRANSACTION_ERROR",
                payload: err.response.data.error,
            });
        }
    }

    async function deleteTransaction(id, jwt) {
        try {
            await axios.delete(`/transactions/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });

            dispatch({ type: "DELETE_TRANSACTION", payload: id });
        } catch (err) {
            dispatch({
                type: "TRANSACTION_ERROR",
                payload: err.response.data.error,
            });
        }
    }

    async function addTransaction(transaction, JWT) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JWT}`,
            },
        };

        try {
            const res = await axios.post("/transactions", transaction, config);
            dispatch({ type: "ADD_TRANSACTION", payload: res.data.data });
        } catch (err) {
            dispatch({
                type: "TRANSACTION_ERROR",
                payload: err.response.data.error,
            });
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                transactions: state.transactions,
                error: state.error,
                loading: state.loading,
                getTransactions,
                deleteTransaction,
                addTransaction,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
