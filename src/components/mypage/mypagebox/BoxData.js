import React, { useState, Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import cart from "../assets/cart.svg";
import inviters from "../assets/inviters.svg";
import reset from "../assets/reset.svg";
import { parseMoneyString } from "./utils";
import { TronLinkContext } from "./../tronWeb";

class BoxData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showOrderModal:false,
    }
    this.buy = this.buy.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  printer(enabled, value, maxv, isInf) {
    if (enabled && isInf) {
      return "∞";
    } else if (enabled && !isInf) {
      return value / 1000000 + " / " + maxv / 1000000;
    } else {
      return "X";
    }
  }
  closeModal(e){
    e.stopPropagation();
    this.setState({showOrderModal: false});
  }

  buy(e) {
    e.stopPropagation();
    e.preventDefault();
    if (process.env.NODE_ENV && process.env.NODE_ENV === "development"){
      this.setState({showOrderModal: true});
    }else{
      this.context.client_contract
      .buyNewLevel(this.props.matrix, this.props.boxnum, parseInt(this.context.packet._nonce._hex))
      .send({
        feeLimit: 100000000,
        callValue: this.props.battingMoney * 1000000,
        shouldPollResponse: true,
      })
      .then(
        (res) => {
          alert("buy success");
        },
        (err) => {
          alert("buy fail");
        }
      );

    }
    
  }

  render() {
    const {
      clickDetail,
      index,
      revenue,
      followNumber,
      battingMoney,
      boxnum,
      enabled,
      value,
      maxv,
      isInf,
      matrix,
      nextBuy,
      printerValue,
    } = this.props;
    let barprog = undefined;
    if (
      printerValue != "X" &&
      printerValue != "∞"
    ) {
      barprog = {
        width: `${eval(printerValue) * 100}%`,
      };
    }

    return (
      <div className="boxWrap">
        <div
          className={
            printerValue !== "X"
              ? "innerBoxStyleFull" //{/* 예시 innerBoxStyle */}
              : "innerBoxStyle"
          }
          onClick={(e)=>{clickDetail(index)}}

          // onClick={(e) => { 버튼클릭해서 구매가 아닌 구매버튼으로 옮김
          //   this.buy(e);
          // }}
        >
          <div className="boxnum">{parseMoneyString(boxnum)}</div>
          <div className={printerValue !== "X" ? "cart" : "cartNone"} onClick={(e) => {
            this.buy(e);
          }} >      {/* 클릭하면 이벤트 모달show */}
            <img alt="cart" src={cart} className="cartImg" />
          </div>
          {/* TODO - cart modal 이벤트 */}
          <div className={this.state.showOrderModal ? "cartModal" : "hideModal"} onClick={this.closeModal}>
          {/* <div className="hideModal"> */}
            {/* 클릭하면 모달사라짐 */}
            <div className="cartModalX">x</div>

            {/* 구매진행상황 따라 내용달라짐 */}
            <div className="cartModalDes">Your order has been requested.</div>
          </div>
          <div className="boxmoney">{parseMoneyString(battingMoney)}</div>
        </div>
        <div className="boxInfoWrapper">
          <div className="invitersWrap">
            <img src={inviters} className="invitersImg" />
          <div>{revenue / 1000000}</div>
        </div>
          <div className="invitersWrap">
            <img src={reset} className="invitersImg" />
              <div>{followNumber}</div>
          </div>

        </div>
        <div className="bar">
          <div
            style={barprog}
            className={
              printerValue === "X"
                ? "barOff"
                : printerValue === "∞"
                ? "barFull"
                : "barOn"
            }
          >
          </div>
          <div className="barpercent">
          {printerValue}
          </div>
        </div>
      </div>
    );
  }
}

BoxData.contextType = TronLinkContext;

export default BoxData;
