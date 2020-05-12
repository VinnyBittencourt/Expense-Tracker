import styled from "styled-components";

export const Container = styled.div`
    text-align: center;

    h1 {
        margin-bottom: 30px;
    }

    input {
        margin-bottom: 10px;
    }

    button {
        padding: 10px 20px;
        transition: 0.2s;
    }

    a {
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
        /* text-decoration: none; */
        color: #333;
    }

    a svg {
        margin-left: 3px;
        margin-bottom: -3px;
    }

    .erro {
        display: none;
        width: 100%;
        text-align: start;
        margin-bottom: 5px;
        margin-left: 5px;
        color: red;
        font-size: 13px;
    }

    .disp {
        display: block;
        width: 100%;
        text-align: start;
        margin-bottom: 5px;
        margin-left: 5px;
        color: red;
        font-size: 13px;
    }
`;
