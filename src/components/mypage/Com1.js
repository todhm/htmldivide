import React,{useState, useEffect, Component} from 'react';
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import mainimg from './assets/mainimg.svg';
import './Com1.css';
import { checkTronWeb } from '../../tools/tronweb'
import { TronLinkContext } from './tronWeb'


class Com1 extends React.Component {
    render() {
        let con = this.context
        return(
            <div className="Com1Wrap">
                <div className="myPagecontainer">
                    <div className="firData">
                        <div className="whiteTT">TOTAL<br/>PARTICIPANTS</div>
                        <div className="numData">{parseInt(con.packet?._totalUserNum?._hex)}</div>
                    </div>
                    <div className="firData">
                            <div className="whiteTT">NEW PARTICIPANTS<br/>IN 24 HOURS</div>
                        <div className="numData">+{con.totalNew}</div>
                    </div>
                    <div className="firData">
                            <div className="whiteTT">TOTAL EARNED<br/>TRX</div>
                            <div className="numData">{parseInt(con.packet?._totalFundingAmount?._hex) / 1000000}</div>
                    </div>
                    <div className="firData">
                            <div className="whiteTT">TOTAL EARNED<br/>USD</div>
                        <div className="numData">{parseInt(con.packet?._totalFundingAmount?._hex) * 3 / 100000000}</div>
                    </div>
                </div>
            </div>
        )
    }
}

Com1.contextType = TronLinkContext

export default Com1;
