import React, {useState, Component} from 'react';
import PropTypes from "prop-types";
import Grid from '@material-ui/core/Grid';
import followImage from './Group.svg';
import {parseMoneyString} from './utils';

class LeftBox extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          id: '-',
          childs: '-',
          earned_usd: '-',
          earned_trx: '-'
      }
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

  async componentDidMount() {
    // TODO : this code seems useless. remove when possible
    /*const tronWeb = await this.readyTronlink()
    const contract = await tronWeb.contract().at(domains.contract)

    contract.totalUserNum().call().then(res => {
        this.setState(prev => ({...prev, participants: parseInt(res._hex)}) )
    })

    contract.totalFundingAmount().call().then(res => {
        this.setState(prev => ({...prev,
            participants_earned: parseInt(res._hex) / 1000000,
            participants_usd: parseInt(res._hex) / 1000000 * 1235}) )
    })*/
  }


  render() {
    return (
      <Grid container className="boxWrapper" justify="center">
        <Grid container style={{width:"80%"}}  alignItems="flex-start" style={{maxHeight:300}}>
          <Grid container className="whiteIdTextBox" justify="flex-end">
            ID 17600311
          </Grid>
          <Grid container className="whiteIdTextBox" justify="flex-end">
            <img src={followImage} alt="grouupimage"/>
            8
          </Grid>
          <Grid container className="whiteIdTextBox" justify="flex-end" style={{marginBottom:90}}>
            $ {parseMoneyString(4127)}
          </Grid>
          <Grid container className="boxBorderGreenText" justify="center" alignItems="center">
            184 TRX
          </Grid>
        </Grid>
      </Grid>
    )
  }
}


export default LeftBox;
