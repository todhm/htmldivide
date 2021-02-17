import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import BoxData from './BoxData';
import './boxstyle.css';

const boxDataList = [
  {
    followNumber: 8, 
    battingMoney: 4127,
  },
  {
    followNumber: 8, 
    battingMoney: 4127,
  },
  {
    followNumber: 8, 
    battingMoney: 4127,
  },
  {
    followNumber: 8, 
    battingMoney: 4127,
  },
  {
    followNumber: 8, 
    battingMoney: 4127,
  },
  {
    followNumber: 8, 
    battingMoney: 4127,
  },
  {
    followNumber: 8, 
    battingMoney: 4127,
  },
  {
    followNumber: 8, 
    battingMoney: 4127,
  },
  {
    followNumber: 8, 
    battingMoney: 4127,
  },
  {
    followNumber: 8, 
    battingMoney: 4127,
  },
  {
    followNumber: 8, 
    battingMoney: 4127,
  },
  {
    followNumber: 8, 
    battingMoney: 4127,
  }
]

const splitChunks=(inputArray, perChunk)=>{
  return inputArray.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/perChunk)
  
    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }
  
    resultArray[chunkIndex].push(item)
  
    return resultArray
  }, [])
}
const BoxWrapper = () => {
  const splittedDataList = splitChunks(boxDataList, 4);
  return (
    <Grid container justify="center" alignItems="center" className="boxWrapper">
      {splittedDataList.map((rowDataList,wrapperIndex)=>{
        return(
          <Grid container justify="center" alignItems="center" key={wrapperIndex} className="boxRowHeight">
            {rowDataList.map((rd,idx)=>{
              return(
                <Grid item md={3}  xs={6} container  key={idx}  justify="center" alignItems="center">
                  <BoxData followNumber={rd.followNumber} battingMoney={rd.battingMoney}/>
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


export default BoxWrapper;