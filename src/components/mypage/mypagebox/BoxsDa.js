import React, {useState, Component} from 'react';
import Grid from '@material-ui/core/Grid';
import BoxData from './BoxData';
import { TronLinkContext } from './../tronWeb'
import './boxstyle.css';

class BoxsDa extends React.Component {
  splitChunks(inputArray, perChunk) {
    return inputArray.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index/perChunk)

      if(!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }

      resultArray[chunkIndex].push(item)

      return resultArray
    }, [])
  }



  render() {
    const splittedDataList = this.splitChunks(this.props.boxDataList, 4);
    return (
      <Grid container justify="center" alignItems="center" className="BoxsDa">
        {splittedDataList.map((rowDataList,wrapperIndex)=>{
          return(
            <Grid container justify="center" alignItems="center" key={wrapperIndex} className="boxRowHeight">
              {rowDataList.map((rd,idx)=>{
                const boxindex = 4 * wrapperIndex +  idx;
                return(
                  <Grid item lg={3} sm={6} xs={12} container  key={idx}  justify="center" alignItems="center" >
                    <BoxData  index={boxindex} clickDetail={this.props.clickDetail} revenue={rd.revenue} nextBuy={rd.nextBuy} followNumber={rd.followNumber} battingMoney={rd.battingMoney} boxnum={rd.boxnum} enabled={rd.enabled} value={rd.value} maxv={rd.maxv} isInf={rd.isInf} matrix={rd.matrix} printerValue={rd.printerValue}/>
                  </Grid>
                )
              })}

            </Grid>
          )

          })
        }
      </Grid>
    );
  }
}

BoxsDa.contextType = TronLinkContext

export default BoxsDa;
