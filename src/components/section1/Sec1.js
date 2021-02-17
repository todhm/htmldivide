import React,{useState, useEffect, Component} from 'react';
import {
	useMediaQuery,
} from '@material-ui/core';
import { withRouter } from "react-router-dom";
import mainimg from './assets/mainpageback.png';
import biglogo from './assets/bigdahong.svg';
import login from './assets/login.svg';
import signup from './assets/signup.svg';
// import tabBtnFocus from './assets/tabBtnFocus.svg';
// import tabBtnNor from './assets/tabBtnNor.svg';
import sixBox from './assets/sixBox.svg';
import six1 from './assets/six1.svg';
import six2 from './assets/six2.svg';
import six3 from './assets/six3.svg';
import six4 from './assets/six4.svg';
import Grid from '@material-ui/core/Grid';
import ContractSection from './ContractSection';
import FaqList from './faq/FaqList';
import './sec1.css';


class Section1 extends React.Component {
    constructor(prop) {
        super(prop)

        this.state = {}
    }

    readyTronlink() {
        return new Promise((resolve, reject) => {
            const TronWeb = require('tronweb')
            const t = new TronWeb({
                fullHost: 'https://api.shasta.trongrid.io'
            })
            t.setAddress(domains.contract)
            resolve(t);
        })
    }

    componentDidMount() {
        this.readyTronlink().then(tronWeb => {
            tronWeb.contract().at(domains.contract).then(contract => {
                contract.getPacketFromAddress(domains.contract).call().then(res => {
                    this.setState(state => ({...state, packet: res}))
                })
            })

            tronWeb.getEventResult(domains.contract, {
                onlyConfirmed: true,
                eventName: "Registration",
                size: 200,
                sinceTimestamp: Date.now() - 86400000,
                sort:"block_timestamp",
            }).then(res => {
                this.setState(state => ({...state.contexts, totalNew: res?.length}))
            })
        })
    }

    render() {
        // const [dataTab, setDataTab] = useState(1);
        const isMobile = false// useMediaQuery('(max-width:600px)');
        const lang = localStorage.getItem('lang')?localStorage.getItem('lang'):'english';
        const translationMap = lang==='english'?
            {
                marketPlace:"BAAS MARKETPLACE",
                marketPlaceDescription:"The worlds first Blockchain Software and technology platform for growing networks, revenue and earnings",
                participants:"Total participants",
                perDays:"New participants in 24 hours",
                totalEarned:"Total earned, TRX",
                totalEarnedUsd:"Total earned, USD",
                total:"Total"
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
    
        // const clickTaber = (num) => {
        //     // 몇번째탭 클릭했는지
        //     setDataTab(num);
        // }
    
    
      return(
        <div className="sec1Wrap">
            <img className="mainimg" src={mainimg} alt="mainimg" />
            <div className="containerWrap">
    
                <div className="textWrap">
                    <img className="biglogo" src={biglogo} alt="biglogo"/>
                    <h1>{translationMap.marketPlace}</h1>
                    <Grid container justify="center" alignItems="center" >
                        <Grid container style={{ wordWrap: "break-word" }}  className="mainWordsText">
                        {translationMap.marketPlaceDescription}
                        </Grid>
                    </Grid>
                </div>
                <div className="logWrap">
                    <img src={login} className="loginBtnMain" onClick={() => window.location.href=domains.path.login} alt="loginBtn"/>
                    <img src={signup} className="signBtn" onClick={() => window.location.href=domains.path.signup} alt="signBtn"/>
                </div>
    
                <div className="dataSix">
                    <Grid container className="sixFour">
                        <Grid item xs={6} sm={3} container className="Fir" justify="center" style={!isMobile?{marginTop:-60}:{marginTop:50}}>
                            <img src={six1} className="sixboxFir sixBoxImage" alt="sixboxFir" />
                            <span className="datato">{parseInt(this.state.packet?._totalUserNum?._hex)}</span>
                            {/* <span className="datanameto1">{translationMap.participants}</span> */}
                        </Grid>
                        <Grid item xs={6} sm={3} container className="Sec" justify="center">
                            <img src={six2} className="sixboxSec sixBoxImage" alt="sixboxSec" />
                            <span className="datato">{this.state.totalNew}</span>
                            {/* <span className="datanamebo2">{translationMap.perDays}</span> */}
                        </Grid>
                        <Grid item xs={6} sm={3} container className="Thi" justify="center" style={!isMobile?{marginTop:5-60}:{marginTop:50}}>
                            <img src={six3} className="sixboxThi sixBoxImage" alt="sixboxThi" />
                            <span className="datato">{parseInt(this.state.packet?._totalFundingAmount?._hex) / 1000000}</span>
                            {/* <span className="datanameto3">{translationMap.totalEarned}</span> */}
                        </Grid>
                        <Grid item xs={6} sm={3} container className="For" justify="center">
                            <img src={six4} className="sixboxFou sixBoxImage" alt="sixboxFou" />
                            <span className="datato">{parseInt(this.state.packet?._totalFundingAmount?._hex) * 3 / 100000000}</span>
                            {/* <span className="datanamebo4">{translationMap.totalEarnedUsd}</span> */}
                        </Grid>
                    </Grid>
                </div>
                <Grid container justify="center" className="faqContainer">
                    <ContractSection/>
                </Grid>
                <Grid container justify="center" className="faqContainer">
                    <Grid className="mainGridWidth">
                        <FaqList/>
                    </Grid>
                </Grid>
            </div>
        </div>
      )
    }
}

export default Section1;
