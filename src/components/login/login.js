import React,{useState} from 'react';
import { withRouter } from "react-router-dom";
import logo from './loginlogo.svg';
import tronlogo from './tronlogo.svg'; 
import './login.css';
import serializeForm from 'form-serialize';
import Signup from '../signup/signup';
import { checkTronWeb } from '../../tools/tronweb'



const Login =({history})=>{
  const lang = localStorage.getItem('lang')?localStorage.getItem('lang'):'english';
    const translationMap = lang==='english'?
      {
        headtext:"L  O  G  I  N",
        desc:"Earn 20000+ TRX easily and rapidly, in Dahong",
        signup:"Sign Up",
        inputplace:"Please enter referee ID",
		    tronbtn:"Login with TronLink",
		    loginplaceholder:"Your Tron wallet address",
        btnlogin:"Login",
        btnsignupdefault:"Sign Up Without Referee",
        btnsignup:"Sign Up"
      }
      :
      {
        marketPlace:"",
        marketPlaceDescription:"",
        participants:"",
        perDays:"",
        totalEarned:" ",
        totalEarnedUsd:"",
        total:""
      };

        const handleLoginSubmit=async (e)=>{
          e.preventDefault();
          const TronWeb = require('tronweb')
          const tronWeb = new TronWeb({
              fullHost: 'https://api.shasta.trongrid.io'
          })
          tronWeb.setAddress(domains.contract)

          const { loginId } = serializeForm(e.target, { hash: true, empty: true });

          const contract = await tronWeb.contract().at(domains.contract)
          let id

          if (loginId.trim() == '') {
            var defaultAddr
            var invalid = false;

            if (!checkTronWeb()) {
              return
            }
            
            id = await contract.addressToId(window.tronWeb.defaultAddress.base58).call()
          } else if (loginId.length > 30) {
            id = await contract.addressToId(loginId).call()
          } else {
            id = parseInt(loginId)
          }

          if (!(await contract.userExists(id).call())) {
            alert('no user found')
            return
          }

          window.location.href = domains.path.mypage(loginId)
        }

  return(
    <div className="loginWrap">
      <div className="desWrap" >
        <img src={logo} className="mainlogo"/>
        <header className="bigtext">{translationMap.headtext}</header>
        {/* <div className="smalltext">{translationMap.desc}</div> */}
      </div>

      <form className="loginContainer" id="loginForm" onSubmit={handleLoginSubmit}>
        <input type="text" className="loginInput" name="loginId" placeholder={translationMap.loginplaceholder}></input>
        <button className="loginBtn" form="loginForm" type="submit">{translationMap.btnlogin}</button>
      </form>

      <div className="orWrap">
        <hr className="line"></hr>
        <div className="orText">or</div>
        <hr className="line"></hr>
      </div>

      <div className="tronLoginWrap">
        <a href="https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec">
          <button className="tronBtn">
            <img src={tronlogo} alt="tronlogo" className="tronlogo" />
            {translationMap.tronbtn}
          </button>
        </a>
      </div>

      <div className="orWrap">
        <hr className="line"></hr>
        <div className="orText">or</div>
        <hr className="line"></hr>
      </div>

      <div className="signupWrap">
        <button className="signupBtn" onClick={(e)=>{e.preventDefault(); window.location.href=domains.path.signup}}>{translationMap.btnsignup}</button>
      </div>


    </div>

  )
}

export default Login;
