function eval() {
    // Do not use eval!!!
    return;
}

let op = {
  "+" : (a, b) => +a + +b,
  "-" : (a, b) => a - b,
  "*" : (a, b) => a * b,
  "/" : (a, b) => b != 0 ? a / b : (() => { throw new Error('TypeError: Division by zero.') })()
    }

function calc(expr){
  resArr = expr.split(' ');
  for(let i = expr.match(/[\+\/\*\-]/g).length; i != 0; i--){
    resArr.indexOf('/') != -1 ? resArr.splice(resArr.indexOf('/')-1, 3, op['/'](resArr[resArr.indexOf('/')-1],resArr[resArr.indexOf('/')+1])):
    resArr.indexOf('*') != -1 ? resArr.splice(resArr.indexOf('*')-1, 3, op['*'](resArr[resArr.indexOf('*')-1],resArr[resArr.indexOf('*')+1])):
    resArr.indexOf('-') != -1 ? resArr.splice(resArr.indexOf('-')-1, 3, op['-'](resArr[resArr.indexOf('-')-1],resArr[resArr.indexOf('-')+1])):
    resArr.indexOf('+') != -1 ? resArr.splice(resArr.indexOf('+')-1, 3, op['+'](resArr[resArr.indexOf('+')-1],resArr[resArr.indexOf('+')+1])):"";
  }
  return +resArr[0];
}

function expressionCalculator(expr) {
  let arr = [];
  for(item of expr.split(' ')){
    if(item != "") arr.push(item);
  }
  let result = arr.join('').replace(/(\*|\/|\+|\-)/g, " $& ");
  if(result.replace(/[^(]/g, "").length != result.replace(/[^)]/g, "").length){
  throw new Error("ExpressionError: Brackets must be paired");
};
  
  if(result.match(/\(/g) != null){
    for(let i = result.match(/\(/g).length; i != 0; i--){
      let calculateDepth = result.match(/(\([0-9\+\/\*\-. ]+\))/)[0];
      Depth = calculateDepth.slice(1, calculateDepth.length - 1);
      result = result.replace(calculateDepth, calc(Depth));
    }
  }
  return +calc(result).toFixed(4);
}

module.exports = {
    expressionCalculator
}