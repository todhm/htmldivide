import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import dummy from "./assets/exel.svg"
import chartmini from "./assets/chartmini.svg"


const ContractSection = () => {

  return (
    <Grid container justify="center" alignItems="center" className="contractWrapper">
      <Grid container justify="center" className="contractExplanation" style={{ wordWrap: "break-word",maxWidth:"95%" }} >
          All Data is stored on the blockchain in the public domain and can be verified
      </Grid>
      <Grid container justify="center" className="contractExplanation">
        <span className="contractText">Contract Address</span> <span className="contractAddress">{domains.contract}</span>
      </Grid>
      <Grid container justify="center" className="contractExplanation">
        <img className="dummydata10" src={dummy} />
        <img className="chartmini" src={chartmini} />
      </Grid>


    </Grid>

  );
}


export default ContractSection;
