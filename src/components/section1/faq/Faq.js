import React, {useState} from 'react';
import PropTypes from "prop-types";
import union from './assets/union.svg';
import minus from './assets/minus.svg';
import Grid from '@material-ui/core/Grid';



const Faq = ({question, answer}) => {

  const [questionClosed, setFoldQuestion] = useState(true);
  return (
    <Grid container  style={{marginBottom:15}}>
      <Grid container className="faqBox" justify="center">
        <Grid container className="faqBoxInner" justify="space-between">
          <Grid container className="faqQuestions" item xs={9} justify="flex-start" alignItems="center">
            {question}
          </Grid>
          <Grid container item xs={2} alignItems="center" justify="flex-end" onClick={(e)=>setFoldQuestion(!questionClosed)}>
            <img  src={questionClosed?union:minus}/>
          </Grid>
        </Grid>
      </Grid>
      {!questionClosed?
        <Grid container  className="faqBoxAnswer" justify="center" >
          <Grid container className="faqBoxInner faqQuestions" justify="flex-start" alignItems="center">
            {answer}
          </Grid>
        </Grid>:null
      }
    </Grid>

  );
}


Faq.defaultProps={
  question: "",
  answer: "",
}
Faq.propTypes={
  question: PropTypes.string, 
  answer: PropTypes.string,
}

export default Faq;