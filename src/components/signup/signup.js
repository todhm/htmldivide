import React,{useState} from 'react';
import { withRouter } from "react-router-dom";
import mainimg from '../login/mainbackimg.png';
import logo from '../login/loginlogo.svg';
import tronlink from '../login/Tronlink_logo.png';
import serializeForm from 'form-serialize';
import './signup.css';
import { checkTronWeb } from '../../tools/tronweb'



const Signup =({history})=>{
  const lang = localStorage.getItem('lang')?localStorage.getItem('lang'):'english';
  const translationMap = lang==='english'?
    {
      headtext:"SIGN UP",
      login:"Sign In",
      signup:"Sign Up without Referer",
      btnlogin:"LOGIN"
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

  const handleSignupDefault = async e => {
    e.preventDefault()
    if (!checkTronWeb()) {
      return false
    }

    const contract = await window.tronWeb.contract().at(domains.contract)

    if (parseInt(await contract.addressToId(window.tronWeb.defaultAddress.base58).call()._hex) > 0) {
      alert('existing user.')
      return false
    }

    contract.registrationDefault().send({
      feeLimit:100000000,
      callValue:500 * 1000000,
      shouldPollResponse:true
    }).then(r => {
      window.location.href = domains.path.mypage()
    }, e => {
      alert('signup failed : ' + e)
      setModalStatus(false)
    })

    setModalStatus(true);
  }

  const [modalStatus, setModalStatus] = useState(false);
  const handleSignupSubmit = async e => {
    e.preventDefault();
    if (!checkTronWeb()) {
      return false
    }

    const { signupId } = serializeForm(e.target, { hash: true, empty: true });

    if(!signupId){
      alert("Referer ID");
      return;
    }

    const contract = await window.tronWeb.contract().at(domains.contract)
    let id

    try {
      if (parseInt(await contract.addressToId(window.tronWeb.defaultAddress.base58).call()._hex) > 0) {
        alert('existing user.')
        return false
      }

      if (signupId.length > 30) {
        id = await contract.addressToId(signupId).call()
      } else {
        id = parseInt(signupId)
      }

      if (signupId <= 0 || !(await contract.userExists(id))) {
        alert('invalid user')
        return false
      }
    } catch (err) {
      alert('invalid input.')
      console.log(err)
      return false
    }

    contract.registrationExt(id).send({
      feeLimit:100000000,
      callValue:500 * 1000000,
      shouldPollResponse:true
    }).then(res => {
      window.location.href = domains.path.mypage()
    }, err => {
      alert('signup failed. : ' + err)
      setModalStatus(false)
    });

    setModalStatus(true);
  }



  return(
  <div className="signupWrapper">
        <img src={logo} className="mainlogo"/>
        <div className="bigtext">{translationMap.headtext}</div>
      
      {/* <form className="loginContainer" id="signupForm" onSubmit={handleSignupSubmit}>
        <input type="text" name="signupId" className="loginInput" placeholder={translationMap.inputplace}></input>
        <div className="btnWrap">
          <button className="signupBtn" form="signupForm" type="submit">{translationMap.btnsignup}</button>
          <button className="signupBtn" onClick={handleSignupDefault}>{translationMap.btnsignupdefault}</button>
          <button className="loginBtn" onClick={(e)=>{e.preventDefault(); window.location.href=domains.path.login}}>{translationMap.btnlogin}</button>
        </div>
      </form> */}
            <form className="signupWrap" id="signupForm" onSubmit={handleSignupSubmit}>
                <input type="text" name="signupId" placeholder="referer" className="walletInput" />
                <button className="walletBtn" form="signupForm" type="submit">{translationMap.headtext}</button>
            </form>

            <div className="orWrap">
                <hr className="line"></hr>
                <div className="orText">or</div>
                <hr className="line"></hr>
            </div>

            <div className="referLoginWrap">
                <button className="referBtn" form="signupForm" onClick={handleSignupDefault}>{translationMap.signup}</button>
            </div>

            <div className="orWrap">
                <hr className="line"></hr>
                <div className="orText">or</div>
                <hr className="line"></hr>
            </div>
            
            <div className="signloginWrap">
                <button className="signloginBtn" onClick={(e)=>{e.preventDefault(); window.location.href=domains.path.login}}>LOGIN</button>
            </div>

            <div className={modalStatus ? "showModal" : "hideModal"}>
            <img src={logo} className="modallogo"/>
              <div className="modalHeader">Trying to make your signup request.</div>
              <div className="modalDesWrap">
                <div className="modaldes">Order may take few minutes.</div>
                <div className="modaldes loader"></div>
              </div>
              <div className="modalAutoWrap">
                <div className="modalAuto">
                  Automatically switch pages when the purchase is complete.
                </div>
                <button className="closeBtn" onClick={e => {e.preventDefault(); setModalStatus(false);}}>Close</button>
              </div>
            </div>

        </div>

  )
}

export default Signup;
