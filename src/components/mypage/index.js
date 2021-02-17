import React, {Component} from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { withRouter } from "react-router-dom";
import Header from '../headers/headers';
import Com1 from './Com1';
import mainimg from './assets/mainimg.svg';
import xxx from './assets/Dahongx3.svg';
import xxxx from './assets/Dahongx6.svg';
import leftbarPeople from './assets/leftbarPeople.svg';
import copyicon from './assets/copyicon.svg';
import BoxsDa from './mypagebox/BoxsDa';
import BoxBtnDetail from './mypagebox/BoxBtnDetail';
import {printer} from '../utils/datautils';
import { TronLinkContext } from './tronWeb'
import LeftBox from './mypagebox/LeftBox';
import Grid from '@material-ui/core/Grid';
import {
    useMediaQuery,
} from '@material-ui/core';
import './Com1.css'



const isNextBuy=(isOpenList, idx)=>{
  if (isOpenList === undefined) {
    return false
  }
  return !isOpenList[idx] && (idx === 0 || isOpenList[idx-1])
}

const createBoxData=(con={
  lists:{
    _revenueList:[
      {_hex:100000000},
      {_hex:1000000000},
      {_hex:700000000},
      {_hex:800000000},
      {_hex:900000000},
      {_hex:100000000},
      {_hex:100000000},
      {_hex:900000000},
      {_hex:800000000},
      {_hex:300000000},
      {_hex:200000000},
      {_hex:300000000},
    ],
    _revenueListX3:[
      {_hex:100000000},
      {_hex:1000000000},
      {_hex:700000000},
      {_hex:800000000},
      {_hex:900000000},
      {_hex:100000000},
      {_hex:100000000},
      {_hex:900000000},
      {_hex:800000000},
      {_hex:300000000},
      {_hex:200000000},
      {_hex:300000000},
    ],
    _revenueListX6:[
      {_hex:100000000},
      {_hex:1000000000},
      {_hex:700000000},
      {_hex:800000000},
      {_hex:900000000},
      {_hex:100000000},
      {_hex:100000000},
      {_hex:900000000},
      {_hex:800000000},
      {_hex:300000000},
      {_hex:200000000},
      {_hex:300000000},
    ],
    _isOpenListX3:[
      true,
      false,
      false,
      true,
      false,
      false,
      true,
      false,
      true,
      true,
      true,
      false
    ],
    _isOpenListX6:[
      true,
      false,
      false,
      true,
      false,
      false,
      true,
      false,
      true,
      true,
      true,
      false
    ],
    _isOpenListX3:[
      true,
      false,
      false,
      true,
      false,
      false,
      true,
      false,
      true,
      true,
      true,
      false
    ],
    _limitListX3:[
      {_hex:100000000},
      {_hex:1000000000},
      {_hex:700000000},
      {_hex:800000000},
      {_hex:900000000},
      {_hex:100000000},
      {_hex:100000000},
      {_hex:900000000},
      {_hex:800000000},
      {_hex:300000000},
      {_hex:200000000},
      {_hex:300000000},
    ],
    _limitListX6:[
      {_hex:100000000},
      {_hex:1000000000},
      {_hex:700000000},
      {_hex:800000000},
      {_hex:900000000},
      {_hex:100000000},
      {_hex:100000000},
      {_hex:900000000},
      {_hex:800000000},
      {_hex:300000000},
      {_hex:200000000},
      {_hex:300000000},
    ]
  }
}, matrix=1)=>{
  const ret = []
  let value = 250
  for (let i = 0; i < 12; i++) {
    let limit = value * 1000000 * (matrix==1 ? 2 : 3)
    value *= 2
    const retData = {
      revenue: (matrix==1 ? parseInt(con.lists?._revenueListX3[i]?._hex) : parseInt(con.lists?._revenueListX6[i]?._hex)),
      boxnum: i + 1,
      followNumber: 12,
      battingMoney: value,
      enabled: (matrix==1 ? con.lists?._isOpenListX3[i] : con.lists?._isOpenListX6[i]),
      value: limit - (matrix==1 ? parseInt(con.lists?._limitListX3[i]?._hex) : parseInt(con.lists?._limitListX6[i]?._hex)),
      maxv: limit,
      isInf: (i==11 || (matrix==1 ? con.lists?._isOpenListX3[i+1] : con.lists?._isOpenListX6[i+1])) ? true : false,
      matrix: matrix,
      nextBuy: isNextBuy(matrix === 1 ? con.lists?._isOpenListX3 : con.lists?._isOpenListX6, i)
    }
    retData['printerValue'] = printer(retData.enabled, retData.value, retData.maxv, retData.isInf);
    ret.push(retData);
  }
  return ret
}
class Mypage extends React.Component {
  constructor(props) {
    super(props)
    const firstBoxDataList = createBoxData(this.context, 1);
    const secondBoxDataList = createBoxData(this.context, 2);
    this.state = {
      contexts: {}, 
      showFirstDetailBtn:false,
      showSecondDetailBtn:false,
      detailFirstIndex: -1, 
      detailSecondIndex: -1,
      firstBoxDataList: firstBoxDataList,
      secondBoxDataList: secondBoxDataList,
      detailFirstData:{},
      detailSecondData:{},

    }
    this.setFirstData = this.setFirstData.bind(this);
    this.setSecondData = this.setSecondData.bind(this);
    this.resetFirstData = this.resetFirstData.bind(this);
    this.resetSecondData = this.resetSecondData.bind(this);
    this.changeFirstIndexNumber = this.changeFirstIndexNumber.bind(this);
    this.changeSecondIndexNumber = this.changeSecondIndexNumber.bind(this);

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

  readyTronlinkClient() {
    var attempt = 0;
    return new Promise((resolve, reject) => {
      const obj = setInterval(() => {
        if (!window.tronWeb) {
          attempt += 1;
          if (attempt >= 30) {
            clearInterval(obj);
            reject("No tronweb found.")
          }
          return
        }
        clearInterval(obj)

        resolve(window.tronWeb)
      }, 50)
    })
  }


  changeFirstIndexNumber(changeNumber){
    const newNumber = changeNumber + this.state.detailFirstIndex;
    if(newNumber >=0 &&  newNumber < this.state.firstBoxDataList.length){
      this.setState({detailFirstIndex: newNumber});
    }
    // if(changeNumber >  0 && this.state.detailFirstIndex + changeNumber < this.state.firstBoxDataList.length){
    //   for (let i = this.state.detailFirstIndex + changeNumber; i < this.state.firstBoxDataList.length; i++) {
    //     const retData = this.state.firstBoxDataList[i];
    //     if(retData.printerValue !== "X"){
    //       this.setState({detailFirstIndex: i});
    //       return;
    //     }
    //   }
    //   return;

    // }else if(changeNumber <  0 && this.state.detailFirstIndex + changeNumber >= 0){
    //   for (let i = this.state.detailFirstIndex + changeNumber; i >= 0; i--){
    //     const retData = this.state.firstBoxDataList[i];
    //     if(retData.printerValue !== "X"){
    //       this.setState({detailFirstIndex: i});
    //       return;
    //     }
    //   }
    // }
    // return;
  }
  changeSecondIndexNumber(changeNumber){
    const newNumber = changeNumber + this.state.detailSecondIndex;
    if(newNumber >=0 && newNumber <  this.state.secondBoxDataList.length){
      this.setState({detailSecondIndex: newNumber});
    }
    // if(changeNumber >  0 && this.state.detailSecondIndex + changeNumber < this.state.secondBoxDataList.length){
    //   for (let i = this.state.detailSecondIndex + changeNumber; i < this.state.secondBoxDataList.length; i++) {
    //     const retData = this.state.secondBoxDataList[i];
    //     if(retData.printerValue !== "X"){
    //       this.setState({detailSecondIndex: i});
    //       return;
    //     }
    //   }
    //   return;

    // }else if(changeNumber <  0 && this.state.detailSecondIndex + changeNumber >= 0){
    //   for (let i = this.state.detailSecondIndex + changeNumber; i >= 0; i--){
    //     const retData = this.state.secondBoxDataList[i];
    //     if(retData.printerValue !== "X"){
    //       this.setState({detailSecondIndex: i});
    //       return;
    //     }
    //   }
    // }
    // return;
  }
  resetFirstData(){
    this.setState(state => ({...state, detailFirstIndex: -1}));
  }
  setFirstData(index){
    this.setState(state => ({...state, detailFirstIndex:index}));
  }
  setSecondData(index){
    this.setState(state => ({...state, detailSecondIndex: index}));
  }
  resetSecondData(){
    this.setState(state => ({...state, detailSecondIndex: -1}));
  }

  

  componentDidMount() {
    this.readyTronlink().then(tronWeb => {
      tronWeb.contract().at(domains.contract).then(async contract => {
        this.setState(state => ({contexts: {...state.contexts, contract: contract}}))

        const uri = window.location.href.split('/')
        let addr

        if (uri.length == 4) {
          addr = tronWeb.defaultAddress.base58
        } else {
          addr = uri[uri.length - 1]

          if (addr.length < 30) {
            addr = await contract.idToAddress(parseInt(addr)).call()
          }
        }


        this.setState(state => ({contexts: {...state.contexts, addr: addr}}))
        contract.getPacketFromAddress(addr).call().then(res => {
          this.setState(state => ({contexts: {...state.contexts, packet: res}}))
        })

        contract.getListsFromAddress(addr).call().then(res => {
          res['_isOpenListX3'] = res['_isOpenList'].slice(0,12);
          res['_isOpenListX6'] = res['_isOpenList'].slice(12,24);
          res['_limitListX3'] = res['_limitList'].slice(0,12);
          res['_limitListX6'] = res['_limitList'].slice(12,24);
          res['_revenueListX3'] = res['_revenueList'].slice(0,12);
          res['_revenueListX6'] = res['_revenueList'].slice(12,24);
          res['_missedListX3'] = res['_missedList'].slice(0,12);
          res['_missedListX6'] = res['_missedList'].slice(12,24);
          this.setState(state => ({contexts: {...state.contexts, lists: res}}))
        })

        tronWeb.getEventResult(domains.contract, {
          onlyConfirmed: true,
          eventName: "Registration",
          size: 200,
          sinceTimestamp: Date.now() - 86400000,
          sort:"block_timestamp",
	    }).then(res => {
          this.setState(state => ({contexts: {...state.contexts, totalNew: res?.length}}))
        })
      })
    })

    this.readyTronlinkClient().then(tronWeb => {
      tronWeb.contract().at(domains.contract).then(contract => {
        this.setState(state => ({contexts: {...state.contexts, client_contract: contract}}))
      })
    })
  }

  render() {
    let totalRevenue = 0;
    for (let i = 0; i < 12; i++) {
      totalRevenue += parseInt(this.state.contexts?.lists?._revenueListX3[i]?._hex);
      totalRevenue += parseInt(this.state.contexts?.lists?._revenueListX6[i]?._hex);
    }
    let actualPerformance = parseInt(this.state.contexts?.packet?._actualPerformance?._hex) / 1000000;
    let x3claim = 67;
    let x6claim = 75;
    if (actualPerformance < 500) {
      x3claim = 50 + Math.round(17 * actualPerformance / 500);
      x6claim = 67 + Math.round(8 * actualPerformance / 500);
    } else if (actualPerformance < 5000) {
      x3claim = 67 + Math.round(8 * actualPerformance / 4500);
      x6claim = 75 + Math.round(8 * actualPerformance / 4500);
    } else if (actualPerformance < 50000) {
      x3claim = 75 + Math.round(8 * actualPerformance / 45000);
      x6claim = 83 + Math.round(4 * actualPerformance / 45000);
    } else {
      x3claim = 83;
      x6claim = 87;

    }
    const inviterurl = "https://daho.ng/ig.io"
    return(
      <TronLinkContext.Provider value={this.state.contexts}>
      <div className="MypageWrap">
        <Header />
        <Com1 />
        <div className="Com2Wrap">
          <div className="leftBoxWrap">
            <div className="leftbaruserinfo">
              <div className="idid">ID {parseInt(this.state.contexts?.packet?._id?._hex)}</div>
              <div className="people">
                <img src={leftbarPeople} alt="human" className="human" />
                <div>{parseInt(this.state.contexts?.packet?._partnersCount?._hex)}</div>
              </div>
              <div className="trx">$ {totalRevenue * 3 / 100000000}</div>
              <button className="leftBtn">{totalRevenue / 1000000} TRX</button>
            </div>
            {/* <div className="x3claim">X3 claim ratio : {x3claim} %</div>
            <div className="x6claim">X6 claim ratio : {x6claim} %</div> */}

            {/* TODO - 로또버튼 추가 */}
            <div className="lottoBtnWrap">
              <button className="lottoGoBtn">Buy Lottery Ticket</button>
            </div>


            <div className="datacardsWrapper"> 
              <div className="x3dahongWrapper">
                <div className="x3dahongWrap">
                  <div className="head">Da hong X3</div>
                  <hr className="x3headLine"></hr>
                  <div className="leftbarPercent">+ {x3claim} %</div>
                  <div className="leftbarTrx">{actualPerformance} TRX</div>
                </div>
                <div className="x3dahongWrap">
                  <div className="head">Da hong X6</div>
                  <hr className="x3headLine"></hr>
                  <div className="leftbarPercent">+ {x6claim} %</div>
                  <div className="leftbarTrx">{actualPerformance} TRX</div>
                </div>
              </div>
              <div className="leftBarlinkWrapper">
              <div className="leftBarlinkWrap">
                <div className="headpurple">affiliate link</div>
                <div className="linkcoptWrap">
                <input type="readonly" value={inviterurl} className="linkinput"/>
                <CopyToClipboard text={inviterurl}>
                  <button type="button" className="linkcopyBtn">
                    <img src={copyicon} className="copyiconImg" />
                  </button> 
                </CopyToClipboard>
                </div>
              </div>
              <div className="leftBarlinkWrap">
                <div className="headpurple">your upline</div>
                <input type="readonly" value={`ID ${parseInt(this.state.contexts?.packet?._referrerId?._hex)}`} className="inviterinput"/>
              </div>
              </div>
            </div>
          </div>

          <div className="rightBoxWrap">
            <div className="topWrap">
              <img src={xxx} alt="xxx" className="Dada" />
              {this.state.detailFirstIndex === -1 ?
              <BoxsDa matrix={1} boxDataList={this.state.firstBoxDataList} clickDetail={this.setFirstData}/>:
              <Grid item lg={12} xs={12} container alignItems="center" className="boxdetailWrapGrid">
                <BoxBtnDetail levelNumber={15442534} matrix={1} detailData={this.state.firstBoxDataList[this.state.detailFirstIndex]} resetData={this.resetFirstData}  changeIndexNumber={this.changeFirstIndexNumber} index={this.state.detailFirstIndex} index={this.state.detailFirstIndex} totalLength={this.state.secondBoxDataList.length}/>
              </Grid>}
              
              
            </div>

            <div className="bottomWrap">
            <img src={xxxx} alt="xxxx" className="Dada" />
              {this.state.detailSecondIndex === -1 ?
              <BoxsDa matrix={2} boxDataList={this.state.secondBoxDataList} clickDetail={this.setSecondData}/>
              :<Grid item lg={12} xs={12} container alignItems="center" className="boxdetailWrapGrid">
                <BoxBtnDetail matrix={2} detailData={this.state.secondBoxDataList[this.state.detailSecondIndex]} resetData={this.resetSecondData} changeIndexNumber={this.changeSecondIndexNumber} index={this.state.detailSecondIndex} totalLength={this.state.secondBoxDataList.length}/>
              </Grid>}
            </div>
          </div>
        </div>
      </div>
      </TronLinkContext.Provider>
    )
  }
}

export default Mypage;
