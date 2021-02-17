export const parseMoneyString=(price)=>{
  return (price||price===0)?parseInt(price).toString().split( /(?=(?:...)*$)/ ).join(','):"";
}