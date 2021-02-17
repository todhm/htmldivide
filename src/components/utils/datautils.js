

export const printer=(enabled, value, maxv, isInf)=>{
  if (enabled && isInf) {
    return "∞";
  } else if (enabled && !isInf) {
    return value / 1000000 + " / " + maxv / 1000000;
  } else {
    return "X";
  }
}
