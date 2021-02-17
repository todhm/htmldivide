import React, { useState, Component, Fragment } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import cart from "../assets/cart.svg";
import inviters from "../assets/inviters.svg";
import reset from "../assets/reset.svg";
import { TronLinkContext } from './../tronWeb'
import {printer} from '../../utils/datautils';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class BoxBtnDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {detailData, resetData, changeIndexNumber, index, totalLength} = this.props;
        const printerValue  = detailData.printerValue;
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
        <>
            <Grid container>
                <Grid container alignItems="flex-start" onClick={(e)=>resetData()} style={{height: "50"}}>
                    <ArrowBackIcon></ArrowBackIcon>
                </Grid>
            </Grid>
            <Grid container>
                <Grid container item xs={4} alignItems="center">
                {index !==0 && (
                    <Grid container alignItems="flex-start" onClick={(e)=>changeIndexNumber(-1)} style={{height: "50"}}>
                        <ArrowBackIosIcon>
                        </ArrowBackIosIcon>
                    </Grid>
                )}

                    
                </Grid>
                <Grid item xs={4}>
                <div className="BoxBtnDetail">
                    <div className="boxWrap">
                        <div className="invitermeIdWrap">
                            <div className="invitermeIdhead">INVITER</div>
                            <div className="invitermeIdWho">ID {parseInt(this.context?.packet?._referrerId?._hex)}</div>
                        </div>
                        <div className="innerBoxStyleFull detailboxflex">
                        <div className="boxnum">{detailData.battingMoney}</div>
                            <div className="detailBoxRightWrap">
                            <div className="detailId">ID {parseInt(this.context?.packet?._id?._hex)}</div>
                            </div>
                            <div className="invitemeNumWrapper">
                                <div className="invitemeNumWrap">
                                    <hr className="inviteLine"></hr>
                                    <div className="inviteCir"></div>
                                    <img src={inviters} />
                                    <div className="invitermeNum">21</div>
                                </div>
                                <div className="invitemeNumWrap">
                                    <hr className="inviteLine"></hr>
                                    <div className="inviteCir"></div>
                                    <img src={inviters} />
                                    <div className="invitermeNum">21</div>
                                </div>
                                <div className="invitemeNumWrap">
                                    <hr className="inviteLine"></hr>
                                    <div className="inviteCir"></div>
                                    <img src={inviters} />
                                    <div className="invitermeNum">21</div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="boxInfoWrapper">
                        <div className="invitersWrap">
                            <img src={inviters} className="invitersImg" />
                            <div>{detailData.followNumber}</div>
                        </div>
                        <div className="invitersWrap">
                            <img src={reset} className="invitersImg" />
                            <div>>{detailData.followNumber}</div>
                        </div>

                        </div>
                        <div className="datialBar">
                            <div
                                style={barprog}
                                className={
                                (printerValue === "X")
                                ? "barOff"
                                : printerValue === "∞"
                                ? "barFull"
                                : "barOn"
                                }
                            >
                            </div>
                            <div className="barpercent">
                                {printer(detailData.enabled, detailData.value, detailData.maxv, detailData.isInf)}
                            </div>
                        </div>
                        
                    </div>
                </div>
                </Grid>
                <Grid container item xs={4} alignItems="center">
                {index !== totalLength - 1  && (
                    <Grid container justify='flex-end'  onClick={(e)=>changeIndexNumber(1)} style={{height: "50"}}>
                       <ArrowForwardIosIcon>
                       </ArrowForwardIosIcon>
                   </Grid>
                )}
                 
                </Grid>
            </Grid>
            <Grid  container justify="center">
                <div className="buyDataWarpper">
                    <div className="buydateWrap">
                        <div className="dateHead">Date</div>
                        <div>2020/12/08</div>
                    </div>
                    <div className="buyIdWrap">
                        <div className="buyIdHead">ID</div>
                        <div>23</div>
                    </div>
                    <div className="buyWalletWrap">
                        <div className="buyWalletHead">Wallet</div>
                        <div>203,134</div>
                    </div>
                    <div className="buyETHUSDwrap">
                        <div className="buyETHUSDHead">ETH / USD</div>
                        <div>$ 253,235</div>
                    </div>
                </div>
            </Grid>
        </>
        )
    }
}

BoxBtnDetail.contextType = TronLinkContext
export default BoxBtnDetail;

