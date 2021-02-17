import React,{useState} from 'react';
import { withRouter } from "react-router-dom";
import logo from '../login/loginlogo.svg';
import './invite.css';

const Invite = ({history})=> {
    return (
        <div className="inviteWrapper">
            <header className="titleMessage">User 37 has invited you.</header>
            <div className="cardOutline">
                <div className="cardWrap">
                    <img src={logo} alt="logo" className="logo" />
                    <div className="inviteCode">OX1234567</div>
                    <button className="withBtn">Sign Up with this referer</button>
                </div>
            </div>

            <div className="orWrap">
                <hr className="line"></hr>
                <div className="orText">or</div>
                <hr className="line"></hr>
            </div>
            <button className="anotherBtn">Sign Up another Referer</button>
        </div>
    )
}

export default Invite;