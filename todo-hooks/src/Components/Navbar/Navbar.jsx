import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../../Redux/login/actionCreaters";

const Container = styled.div`
    background-color: #333333;
`;

const LinkContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-right: 40px;
    padding: 5px;

    align-items: center;

    & a {
        margin: 5px;
        color: whitesmoke;
        text-decoration: none;
    }
`;

const Menu = styled.div`
    color: white;
`;
const Links = [
    {
        to: "/",
        tilte: "Home",
    },
    {
        to: "/create-task",
        tilte: "CreateTask",
    },
    {
        to: "/login",
        tilte: "Login",
    },

    {
        to: "/register",
        tilte: "Register",
    },
];

export const Navbar = () => {
    const auth = useSelector((state) => state.login.isAuth);
    console.log(auth, "authh");

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(Logout());
    };

    return (
        <>
            <Container>
                <Menu></Menu>
                <LinkContainer>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/create-task">CreateTask</NavLink>
                    {auth && (
                        <NavLink to="/login" onClick={handleLogout}>
                            Logout
                        </NavLink>
                    )}

                    {!auth && <NavLink to="/login">Login</NavLink>}

                    <NavLink to="/register">Register</NavLink>
                </LinkContainer>
            </Container>
        </>
    );
};
