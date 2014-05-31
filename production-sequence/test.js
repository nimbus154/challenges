var findProductionSequence = require('./productionSequence').findProdutionSequence;

var D = [];
var s = '';
var t = '';
var result = findProductionSequence(s, t, D);
console.log(result);
