import React,{useState} from 'react';
import { withRouter } from "react-router-dom";
import './lottopage.css';

const Lottopage = ({history})=> {
    return (
        <div className="lottopageWrapper">
            <h1 className="titleMessage">Buy Lottery Tickets!</h1>
            <div className="lottopageDes">This is lotter ticket blah blag blah blah blah This is lotter ticket blah blag blah blah blah</div>

            <div className="chartWrap">
                <div className="expectedWrap">
                    <div>expected profit rate</div>
                    <div>234%</div>
                </div>
                <hr className="lottoLine"></hr>
                <div className="poolSizeWrap">
                    <div>pool size</div>
                    <div>697k TRX</div>
                </div>
                <hr className="lottoLine"></hr>
                <div className="getTicketsWrap">
                    <div className="howmanytiWrap">
                        <input className="howmanytiInput" type="text" maxlength="10" name="numberOfTickets"></input>
                        <span className="howmanytiText">tickets</span>
                        <div className="howmanytiLitt">( 3000 TRX )</div>
                    </div>
                    <button className="buyticketBtn">Buy</button>
                </div>
            </div>

            <div className="lotterywinnersWrap">
                <h1 className="lotterywinnersTitle">Lottery Winners</h1>
                <div className="winnerChartWrap">
                    <div className="winnerChartTitle">
                        <div>Round #</div>
                        <div>Winner address</div>
                        <div>Prize</div>
                        <div>Transaction hash</div>
                    </div>
                    <div className="winnerCharts>"></div>
                </div>
            </div>
        </div>
    )
}

export default Lottopage;