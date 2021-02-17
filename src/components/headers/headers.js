import React,{useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import chinesename from './assets/chinesename.svg';
import britan from './assets/usus.svg';
import chinaimg from './assets/chch.svg';
import './header.css';


const Header =({history})=>{
  const lang = localStorage.getItem('lang')?localStorage.getItem('lang'):'english';
  const [country, setCountry] = useState(lang);
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    localStorage.setItem('lang', event.target.value);
    window.location.reload();
  };

  return(
    <Grid container justify="center" className="headerWrapper">
      <Grid container className="mainGridWidth" justify="space-between">
        <Grid container item xs={3} justify="flex-start" alignItems="center" onClick={(e)=>{window.location.href=domains.path.home}}>
          <img src={chinesename}/>
        </Grid>
        <Grid container item xs={3} justify="flex-end" alignItems="center">
          <Select classes={{select:"selectStyle"}} MenuProps={{classes:{list:"menuListOuter"}}} value={country} onChange={handleCountryChange}>
            <MenuItem value="english" classes={{selected:"menuSelected",root:"menuSelected"}}>
              <img className="contry" src={britan}/>
              <p className="whiteText">English</p>
            </MenuItem>
            <MenuItem value="chinese" classes={{selected:"menuSelected",root:"menuSelected"}}>
              <img className="contry"  src={chinaimg}/>
              <p className="whiteText">Chinese</p>
            </MenuItem>
            {/* <MenuItem value="britan" classes={{selected:"menuSelected"}}>
              <img className="contry" src={britan}/>
              <p className="whiteText">English</p>
            </MenuItem> */}
          </Select>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Header;