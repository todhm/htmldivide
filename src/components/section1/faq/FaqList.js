import React, {useState} from 'react';
import {
	useMediaQuery,
} from '@material-ui/core';
import PropTypes from "prop-types";
import Grid from '@material-ui/core/Grid';
import Faq from './Faq';
import faqimage from './assets/faq.svg';
import './sec4.css';

const FaqList = () => {

  const isMobile = useMediaQuery('(max-width:769px)');
  const lang = localStorage.getItem('lang')?localStorage.getItem('lang'):'english';
  const faqDataList = [
	  {
		  question: "What is Dahong?",
		  answer: "Dahong is a decentralized blockchain platform for BAAS funding. Anyone can join our network to raise fund.",
	  },
	  {
		  question: "How do Dahong work?",
		  answer: "Dahong platform runs on Tron blockchain as elaborate, faultless, and autonomous smart contract. All critical calculations are run on TRON network, safe from any kind of attacks. ",
	  },
	  {
		  question: "Can the Dahong platform be manipulated?",
		  answer: "No one can change the smart contract, even the admins. ",
	  },
	  {
		  question: "What Tron wallet should I use?",
		  answer: "Dahong supports Tronlink wallet for full service. If your browser don’t have Tronlink wallet installed, you still can monitor the service.",
	  },
	  {
		  question: "How do I raise fund here?",
		  answer: "You first need to register into Dahong platform with 500 TRX fee. Then, you can call your partners and friends to join Dahong, with your Tron address referred. ",
	  },
	  {
		  question: "What is level? How do I extend my earning?",
		  answer: "If you are not satisfied with current revenue, you can activate more levels to widen your income. Right after registration, you have level 1 activated. Open other levels to raise more.",
	  },
	  {
		  question: "I raised enough fund to the limit. What should I do after?",
		  answer: "We had to set the funding limit for initial users, in order to block malicious activities. If you want to have unlimited revenues, open upper levels. The smart contract will unlock your limit.",
	  },
	  {
		  question: "X3, and X6 platforms… how are they different?",
		  answer: "You can claim much more revenues on X6 platform, but in return, X6 revenue depends more on how your partners attract their partners. If you are confident on your partner’s performance, X6 is your great choice.",
	  },
	  {
		  question: "Why is my profit proportion different from a while ago?",
		  answer: "Dahong provides dynamic rate of profit, calculated from each user’s performance. The more you gain performance, the more share you will get. It’s algorithm is coded on the smart contract, so you don’t have to worry about the mechanism.",
	  },
	  {
		  question: "How do lottery work? Can I join?",
		  answer: "Every period, we hold a special lottery event. Users buy the tickets, and the winners get the prizes. Unlike other lottery, Dahong lottery gives extra winning ratio to well performing users.",
	  },
  ]

  return (
    <>
      <Grid container alignItems="center" style={{marginBottom:85}}>
        <img src={faqimage} alt="faqimage"/>
      </Grid>
      <Grid container spacing={isMobile?0:5} justify="center">
        {
        faqDataList.map((x,index)=>(
          <Grid item xs={12} md={6} key={index}>
            <Faq  question={x.question} answer={x.answer}/>
          </Grid>
          ))
        }
      </Grid>
    </>
  );
}



FaqList.propTypes={
}
FaqList.defaultProps={

}
export default FaqList;
