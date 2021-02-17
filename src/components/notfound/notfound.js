import React,{useState} from 'react';
import { withRouter } from "react-router-dom";
import logo from '../login/loginlogo.svg';
import './notfound.css';

const Notfound =({history})=>{
    return (
        <div className="notFoundWrap">
            <img src={logo} alt="logo" className="logoimg" />

            <div className="number">4 0 4</div>
            <hr className="line"></hr>
            <div className="notFouDes">Not Found</div>

            <button className="gomainBtn" >Go to main</button>
        </div>
    )
}

export default Notfound;
