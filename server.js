'use strict';

//hello it is 7_9 3:36 pm

//add mongodb to heroku https://www.youtube.com/watch?v=N42pkl-aIIQ

// mobile listen: 10.0.0.240:3000

const express = require('express');
const app = express();
let PORT = process.env.PORT || 3000;

var config = require('./cabinetdata.json');

// The below operators show up in the front end.  We can use them in our "calculate" section.
let operators = [

  {name:'EL: 116EL-SQ', symbol:'116EL-SQ'},

];


//below are the simple math functions.  When someone chooses and operator, it will "return" a result.
// in order for me to use "value_14GA", I needed to put it below in the parenthesis...

//14GA Calculation - NOTE: the function can be called anything, not just "calculate" if you want

/*
function calculate14GA(operator, value1) {
  
  if ( operator == 'GP100 24x24' )   
  return value1/config.GP_24x24_DoorsPerSheet; // I can add "+ " | 14GA sheets"" if I wanted to
  
  if ( operator == 'GP100 18x18' )      
  return value1 /config.GP_18x18_DoorsPerSheet;

}

*/


// Program has access here in the beginning
console.log('hello3')

// stuff idk (?)


app.use(express.static(__dirname + '/build'));

app.use(require('body-parser').json());
app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Origin', 'https://mean-calculator.herokuapp.com/calculator');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// starting server (?)
app.listen(PORT, () => {
  console.log('server started on port', PORT);
  
});

//Used array below.  Need this to initiate an array for objects to be held when inputted.
var array_14GA = [];
var array_16GA_120x48= [];
var array_16GA_120x60 = [];
var array_18GA = [];
var array_20GA = [];

app.route('/calculator')

  .get((req, res) => {
  
    res.json({
      operators,
       
    });
    console.log('hello in route')
    array_14GA = [];
    array_16GA_120x48 = [];
    array_16GA_120x60 = [];
    array_18GA = [];
    array_20GA = [];
  })
  
  .post((req, res) => {
    //Program in here once "calculate" has been hit
    console.log('hello in 1')

    //Requesting something? 
    let operator  = req.body.operator.name;
    let value1    = req.body.value1;

    let value_14GA    = req.body.value_14GA //this allowed me to use value_14GA I guess
    let value_16GA_120x48 = req.body.value_16GA 
    let value_16GA_120x60 = req.body.value_16GA
    let value_18GA = req.body.value_18GA
    let value_20GA = req.body.value_20GA
    let note = req.body.note

    //GP Door calculation

    if ( operator == 'EL: 116EL-SQ' )   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = value1 / config.EL_116_SQ_FrontsPerSheet;
    value_18GA = 0;
    value_20GA = value1 / config.EL_100_TubsPerSheet;}



    value_14GA = Math.round(value_14GA * 1000);
    value_14GA = value_14GA / 1000;
      
    // this "calculate" is from the the "calculate" function above
    //I really should change the below code to not use result and straight up use value_14GA instead
    let result = value_14GA

    console.log(result, "It is simply the 14GA result..., which is also the value_14GA as well")
    
    // Calculate the 18GA
//    console.log(value_18GA, "OLD value_18GA is here")
    // Rouding 18GA
    value_18GA = Math.round(value_18GA * 1000);
    value_18GA = value_18GA / 1000;
    // Rounded 18GA
//    console.log(value_18GA, "NEW value_18GA is here")

    array_18GA.push(value_18GA);
          
//    console.log(array_18GA);

    var sum_18GA = array_18GA.reduce(function(a, b) { return a + b; }, 0);

    sum_18GA = Math.round(sum_18GA * 1000);
    sum_18GA = sum_18GA / 1000;

//    console.log(sum_18GA, 'this is the NEW sum_18GA'); //where long numbers are
//    console.log('hello in 2')
    var lastsum_18GA = sum_18GA
//    console.log(lastsum_18GA, 'this is the last sum_18GA') //where long numbers are




    // Calculate the 14GA
//    console.log(value_14GA, "value_14GA is here")
    // Rounding 14GA
    value_14GA = Math.round(value_14GA * 1000);
    value_14GA = value_14GA / 1000;
    // Rounded 14GA
    array_14GA.push(value_14GA);
      
    console.log(array_14GA);
    
    var sum_14GA = array_14GA.reduce(function(a, b) { return a + b; }, 0);

    sum_14GA = Math.round(sum_14GA * 1000);
    sum_14GA = sum_14GA / 1000;

    var lastsum_14GA = sum_14GA
//    console.log(lastsum_14GA, 'this is the last sum_14GA')

    

    // Calculate the 16GA_120x60
//    console.log(value_16GA_120x60, "OLD value_16GA_120x60 is here")
    // Rouding 16GA_120x60
    value_16GA_120x60 = Math.round(value_16GA_120x60 * 1000);
    value_16GA_120x60 = value_16GA_120x60 / 1000;
    // Rounded 16GA_120x60
//    console.log(value_16GA_120x60, "NEW value_16GA_120x60 is here")

    array_16GA_120x60.push(value_16GA_120x60);
          
//    console.log(array_16GA_120x60);

    var sum_16GA_120x60 = array_16GA_120x60.reduce(function(a, b) { return a + b; }, 0);

    sum_16GA_120x60 = Math.round(sum_16GA_120x60 * 1000);
    sum_16GA_120x60 = sum_16GA_120x60 / 1000;

//    console.log(sum_16GA_120x60, 'this is the NEW sum_16GA_120x60'); //where long numbers are
//    console.log('hello in 2')
    var lastsum_16GA_120x60 = sum_16GA_120x60
//    console.log(lastsum_16GA_120x60, 'this is the last sum_16GA_120x60') //where long numbers are



    // Calculate the 16GA_120x48
//    console.log(value_16GA_120x48, "OLD value_16GA_120x48 is here")
    // Rouding 16GA_120x48
    value_16GA_120x48 = Math.round(value_16GA_120x48 * 1000);
    value_16GA_120x48 = value_16GA_120x48 / 1000;
    // Rounded 16GA_120x48
//    console.log(value_16GA_120x48, "NEW value_16GA_120x48 is here")

    array_16GA_120x48.push(value_16GA_120x48);
          
//    console.log(array_16GA_120x48);

    var sum_16GA_120x48 = array_16GA_120x48.reduce(function(a, b) { return a + b; }, 0);

    sum_16GA_120x48 = Math.round(sum_16GA_120x48 * 1000);
    sum_16GA_120x48 = sum_16GA_120x48 / 1000;

//    console.log(sum_16GA_120x48, 'this is the NEW sum_16GA_120x48'); //where long numbers are
//    console.log('hello in 2')
    var lastsum_16GA_120x48 = sum_16GA_120x48
//    console.log(lastsum_16GA_120x48, 'this is the last sum_16GA_120x48') //where long numbers are


    // Calculate the 20GA
//    console.log(value_20GA, "OLD value_20GA is here")
    // Rouding 20GA
    value_20GA = Math.round(value_20GA * 1000);
    value_20GA = value_20GA / 1000;
    // Rounded 20GA
//    console.log(value_20GA, "NEW value_20GA is here")

    array_20GA.push(value_20GA);
          
//    console.log(array_20GA);

    var sum_20GA = array_20GA.reduce(function(a, b) { return a + b; }, 0);

    sum_20GA = Math.round(sum_20GA * 1000);
    sum_20GA = sum_20GA / 1000;

//    console.log(sum_20GA, 'this is the NEW sum_20GA'); //where long numbers are
//    console.log('hello in 2')
    var lastsum_20GA = sum_20GA
//    console.log(lastsum_20GA, 'this is the last sum_20GA') //where long numbers are
    

    res.json({
      A: 
        lastsum_14GA,
        
      B:
        lastsum_18GA,

      C:
        lastsum_16GA_120x60,

      D:
        lastsum_16GA_120x48,

      E:
        lastsum_20GA,

      result: {   
        operator: req.body.operator.symbol, 
        value1,
        result, // value_14GA
        value_18GA,
        value_16GA_120x60,
        value_16GA_120x48,
        value_20GA,
        note,
      },

      output: {
        
      }
    });
});
  


// Ideas:
// 1. Think about making function calculations that will return some result (in this case, would be different gauge materials)
// 2. Create more doors...