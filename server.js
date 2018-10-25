'use strict';

//add mongodb to heroku https://www.youtube.com/watch?v=N42pkl-aIIQ

// mobile listen: 10.0.0.240:3000

const express = require('express');
const app = express();
let PORT = process.env.PORT || 3000;

var config = require('./cabinetdata.json');

// The below operators show up in the front end.  We can use them in our "calculate" section.
let operators = [

  {name:'Classic 100', symbol:'Classic 100'},
  {name:'Classic 999', symbol:'Classic 999'},

  {name:'CM1101', symbol:'CM1101'},

  {name:'EL: 116EL-SQ', symbol:'116EL-SQ'},
  {name:'EL: 117EL-SQ', symbol:'117EL-SQ'},
  {name:'EL: 117EL-SQ-3in', symbol:'117EL-SQ-3in'},
  {name:'EL: 118EL-SQ', symbol:'118EL-SQ'},
  {name:'EL: 118EL-SQ-3in', symbol:'118EL-SQ-3in'},

  {name:'EL: 126EL-SQ', symbol:'126EL-SQ'},
  {name:'EL: 128EL-SQ', symbol:'128EL-SQ'},

  {name:'EL: 508EL-SQ', symbol:'508EL-SQ'},
  {name:'EL: 516EL-SQ', symbol:'516EL-SQ'},
  {name:'EL: 518EL-SQ', symbol:'518EL-SQ'},

  {name:'EL-SSF: 128EL-SQ-SSF', symbol:'128EL-SQ-SSF'},

  {name:'HDOC-10: Punch', symbol:'HDOC-10: Punch'},
  {name:'HDOC-20: Punch', symbol:'HDOC-20: Punch'},
  {name:'HDOC-30: Punch', symbol:'HDOC-30: Punch'},

  {name:'HDOC-10: Laser 120x48', symbol:'HDOC-10: Laser 120x48'},
  {name:'HDOC-20: Laser 120x48', symbol:'HDOC-20: Laser 120x48'},
  {name:'HDOC-30: Laser 120x48', symbol:'HDOC-30: Laser 120x48'},

  {name:'HDOC-10: Laser 120x60', symbol:'HDOC-10: Laser 120x60'},
  {name:'HDOC-20: Laser 120x60', symbol:'HDOC-20: Laser 120x60'},
  {name:'HDOC-30: Laser 120x60', symbol:'HDOC-30: Laser 120x60'},



  {name:'Hydrant House', symbol:'Hydrant House'},

  {name:'Safeguard: 10lb SG Tub', symbol:'Safeguard: 10lb SG Tub'},

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
var array_18GA_SS = []; // Stainless
var array_20GA_SS = []; // Stainless
var array_16GA_Galv_120x48 = []; // Galvanneal
var array_16GA_Galv_120x60 = []; // Galvanneal
var array_20GA_Galv = []; // Galvanneal

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
    array_18GA_SS = [];
    array_20GA_SS = [];
    array_16GA_Galv_120x48= [];
    array_16GA_Galv_120x60= [];
    array_20GA_Galv= [];
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
    let value_18GA_SS = req.body.value_18GA_SS
    let value_20GA_SS = req.body.value_20GA_SS
    let value_16GA_Galv_120x48 = req.body.value_16GA_Galv_120x48
    let value_16GA_Galv_120x60 = req.body.value_16GA_Galv_120x60
    let value_20GA_Galv = req.body.value_20GA_Galv
    let note = req.body.note

    //Classic Calculations

    if ( operator == 'Classic 100' )   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = 0;
    value_18GA = 0;
    value_20GA = value1 / config.Classic_100_FullAssyPerSheet;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = 0;
    value_16GA_Galv_120x60 = 0;
    value_20GA_Galv = 0;}

    if ( operator == 'Classic 999' )   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = 0;
    value_18GA = 0;
    value_20GA = value1 / config.Classic_999_FullAssyPerSheet;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = 0;
    value_16GA_Galv_120x60 = 0;
    value_20GA_Galv = 0;}

    //'CM1101 Calculations

    if ( operator == 'CM1101' )   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = 0;
    value_18GA = 0;
    value_20GA = 0;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = 0;
    value_16GA_Galv_120x60 = value1 / config.CM1101_AssyPerSheet;
    value_20GA_Galv = 0;}

    //Elite: STANDARD CALCULATIONS

    //Elite: 100 Cabinet Calculation - Standard

    if ( operator == 'EL: 116EL-SQ' )   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = value1 / config.EL_116_SQ_FrontsPerSheet;
    value_18GA = 0;
    value_20GA = value1 / config.EL_100_TubsPerSheet;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = 0;
    value_16GA_Galv_120x60 = 0;
    value_20GA_Galv = 0;}

    if ( operator == 'EL: 117EL-SQ' )   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = value1 / config.EL_117_SQ_FrontsPerSheet;
    value_18GA = 0;
    value_20GA = value1 / config.EL_100_TubsPerSheet;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = 0;
    value_16GA_Galv_120x60 = 0;
    value_20GA_Galv = 0;}

    if ( operator == 'EL: 117EL-SQ-3in' )   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = value1 / config.EL_117_SQ_3in_FrontsPerSheet;
    value_18GA = 0;
    value_20GA = value1 / config.EL_100_TubsPerSheet;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = 0;
    value_16GA_Galv_120x60 = 0;
    value_20GA_Galv = 0;}

    if ( operator == 'EL: 118EL-SQ' )   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = value1 / config.EL_118_SQ_FrontsPerSheet;
    value_18GA = 0;
    value_20GA = value1 / config.EL_100_TubsPerSheet;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = 0;
    value_16GA_Galv_120x60 = 0;
    value_20GA_Galv = 0;}

    if ( operator == 'EL: 118EL-SQ-3in' )   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = value1 / config.EL_118_SQ_3in_FrontsPerSheet;
    value_18GA = 0;
    value_20GA = value1 / config.EL_100_TubsPerSheet;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = 0;
    value_16GA_Galv_120x60 = 0;
    value_20GA_Galv = 0;}

    if ( operator == 'EL: 126EL-SQ' )   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = value1 / config.EL_126_SQ_FrontsPerSheet;
    value_18GA = 0;
    value_20GA = value1 / config.EL_100_TubsPerSheet;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = 0;
    value_16GA_Galv_120x60 = 0;
    value_20GA_Galv = 0;}

    if ( operator == 'EL: 128EL-SQ' )   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = value1 / config.EL_128_SQ_FrontsPerSheet;
    value_18GA = 0;
    value_20GA = value1 / config.EL_100_TubsPerSheet;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = 0;
    value_16GA_Galv_120x60 = 0;
    value_20GA_Galv = 0;}

    //Elite: 500 Cabinet Calculation - Standard

    if ( operator == 'EL: 508EL-SQ' )   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = 0;
    value_18GA = (value1 / config.EL_500_SurfaceTubsPerSheet) + (value1 / config.EL_508_SQ_SurfaceFrontsPerSheet);
    value_20GA = 0;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = 0;
    value_16GA_Galv_120x60 = 0;
    value_20GA_Galv = 0;}

    if ( operator == 'EL: 516EL-SQ' )   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = value1 / config.EL_516_SQ_FrontsPerSheet;
    value_18GA = 0;
    value_20GA = value1 / config.EL_500_TubsPerSheet;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = 0;
    value_16GA_Galv_120x60 = 0;
    value_20GA_Galv = 0;}

    if ( operator == 'EL: 518EL-SQ' )   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = value1 / config.EL_518_SQ_FrontsPerSheet;
    value_18GA = 0;
    value_20GA = value1 / config.EL_500_TubsPerSheet;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = 0;
    value_16GA_Galv_120x60 = 0;
    value_20GA_Galv = 0;}

    //Elite: SSF - Stainless Steel Front CALCULATIONS

    if ( operator == 'EL-SSF: 128EL-SQ-SSF' )   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = 0;
    value_18GA = value1 / config.EL_100_SSF_TubsPerSheet;
    value_20GA = 0;
    value_18GA_SS = value1 / config.EL_128_SQ_SSF_FrontsPerSheet;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = 0;
    value_16GA_Galv_120x60 = 0;
    value_20GA_Galv = 0;}

    //HDOC Calculations - Punch

    if ( operator == 'HDOC-10: Punch')   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = 0;
    value_18GA = 0;
    value_20GA = 0;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = value1 / config.HDOC_10_Punch_FullAssyPerSheet;
    value_16GA_Galv_120x60 = 0;
    value_20GA_Galv = 0;}

    if ( operator == 'HDOC-20: Punch')   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = 0;
    value_18GA = 0;
    value_20GA = 0;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = value1 / config.HDOC_20_Punch_FullAssyPerSheet;
    value_16GA_Galv_120x60 = 0;
    value_20GA_Galv = 0;}

    if ( operator == 'HDOC-30: Punch')   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = 0;
    value_18GA = 0;
    value_20GA = 0;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = value1 / config.HDOC_30_Punch_FullAssyPerSheet;
    value_16GA_Galv_120x60 = 0;
    value_20GA_Galv = 0;}
    
    //HDOC Calculations - Laser 120x48

    if ( operator == 'HDOC-10: Laser 120x48')   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = 0;
    value_18GA = 0;
    value_20GA = 0;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = value1 / config.HDOC_10_Laser_120x48_FullAssyPerSheet;
    value_16GA_Galv_120x60 = 0;
    value_20GA_Galv = 0;}

    if ( operator == 'HDOC-20: Laser 120x48')   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = 0;
    value_18GA = 0;
    value_20GA = 0;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = value1 / config.HDOC_20_Laser_120x48_FullAssyPerSheet;
    value_16GA_Galv_120x60 = 0;
    value_20GA_Galv = 0;}

    if ( operator == 'HDOC-30: Laser 120x48')   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = 0;
    value_18GA = 0;
    value_20GA = 0;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = value1 / config.HDOC_30_Laser_120x48_FullAssyPerSheet;
    value_16GA_Galv_120x60 = 0;
    value_20GA_Galv = 0;}

    //HDOC Calculations - Laser 120x60

    if ( operator == 'HDOC-10: Laser 120x60')   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = 0;
    value_18GA = 0;
    value_20GA = 0;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = 0
    value_16GA_Galv_120x60 = value1 / config.HDOC_10_Laser_120x60_FullAssyPerSheet;
    value_20GA_Galv = 0;}

    if ( operator == 'HDOC-20: Laser 120x60')   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = 0;
    value_18GA = 0;
    value_20GA = 0;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = 0
    value_16GA_Galv_120x60 = value1 / config.HDOC_20_Laser_120x60_FullAssyPerSheet;
    value_20GA_Galv = 0;}

    if ( operator == 'HDOC-30: Laser 120x60')   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = 0;
    value_18GA = 0;
    value_20GA = 0;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = 0
    value_16GA_Galv_120x60 = value1 / config.HDOC_30_Laser_120x60_FullAssyPerSheet;
    value_20GA_Galv = 0;}

    //Hydrant House Calculation

    if ( operator == 'Hydrant House')   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = 0;
    value_18GA = 0;
    value_20GA = 0;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = 0;
    value_16GA_Galv_120x60 = value1 / config.Hydrant_House;
    value_20GA_Galv = 0;}

    //Safeguard SG Tub Calculations

    if ( operator == 'Safeguard: 10lb SG Tub')   
    {value_14GA = 0;
    value_16GA_120x48= 0;
    value_16GA_120x60 = 0;
    value_18GA = 0;
    value_20GA = 0;
    value_18GA_SS = 0;
    value_20GA_SS = 0;
    value_16GA_Galv_120x48 = 0;
    value_16GA_Galv_120x60 = 0;
    value_20GA_Galv = value1 / config.Safeguard_SG_Tub_10lb;}



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
    value_20GA = Math.round(value_20GA * 1000);
    value_20GA = value_20GA / 1000;

    array_20GA.push(value_20GA);

    var sum_20GA = array_20GA.reduce(function(a, b) { return a + b; }, 0);

    sum_20GA = Math.round(sum_20GA * 1000);
    sum_20GA = sum_20GA / 1000;

    var lastsum_20GA = sum_20GA


    // Calculate the 18GA Stainless
    value_18GA_SS = Math.round(value_18GA_SS * 1000);
    value_18GA_SS = value_18GA_SS / 1000;

    array_18GA_SS.push(value_18GA_SS);

    var sum_18GA_SS = array_18GA_SS.reduce(function(a, b) { return a + b; }, 0);

    sum_18GA_SS = Math.round(sum_18GA_SS * 1000);
    sum_18GA_SS = sum_18GA_SS / 1000;

    var lastsum_18GA_SS = sum_18GA_SS
    
    // Calculate the 20GA Stainless
    value_20GA_SS = Math.round(value_20GA_SS * 1000);
    value_20GA_SS = value_20GA_SS / 1000;

    array_20GA_SS.push(value_20GA_SS);

    var sum_20GA_SS = array_20GA_SS.reduce(function(a, b) { return a + b; }, 0);

    sum_20GA_SS = Math.round(sum_20GA_SS * 1000);
    sum_20GA_SS = sum_20GA_SS / 1000;

    var lastsum_20GA_SS = sum_20GA_SS

    // Calculate the 16GA Galvanneal 120x48
    value_16GA_Galv_120x48 = Math.round(value_16GA_Galv_120x48 * 1000);
    value_16GA_Galv_120x48 = value_16GA_Galv_120x48 / 1000;

    array_16GA_Galv_120x48.push(value_16GA_Galv_120x48);

    var sum_16GA_Galv_120x48 = array_16GA_Galv_120x48.reduce(function(a, b) { return a + b; }, 0);

    sum_16GA_Galv_120x48 = Math.round(sum_16GA_Galv_120x48 * 1000);
    sum_16GA_Galv_120x48 = sum_16GA_Galv_120x48 / 1000;

    var lastsum_16GA_Galv_120x48 = sum_16GA_Galv_120x48


    // Calculate the 16GA Galvanneal 120x60
    value_16GA_Galv_120x60 = Math.round(value_16GA_Galv_120x60 * 1000);
    value_16GA_Galv_120x60 = value_16GA_Galv_120x60 / 1000;

    array_16GA_Galv_120x60.push(value_16GA_Galv_120x60);

    var sum_16GA_Galv_120x60 = array_16GA_Galv_120x60.reduce(function(a, b) { return a + b; }, 0);

    sum_16GA_Galv_120x60 = Math.round(sum_16GA_Galv_120x60 * 1000);
    sum_16GA_Galv_120x60 = sum_16GA_Galv_120x60 / 1000;

    var lastsum_16GA_Galv_120x60 = sum_16GA_Galv_120x60

    // Calculate the 20GA Galvanneal

    value_20GA_Galv = Math.round(value_20GA_Galv * 1000);
    value_20GA_Galv = value_20GA_Galv / 1000;

    array_20GA_Galv.push(value_20GA_Galv);

    var sum_20GA_Galv = array_20GA_Galv.reduce(function(a, b) { return a + b; }, 0);

    sum_20GA_Galv = Math.round(sum_20GA_Galv * 1000);
    sum_20GA_Galv = sum_20GA_Galv / 1000;

    var lastsum_20GA_Galv = sum_20GA_Galv

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

      F:
        lastsum_18GA_SS,

      G:
        lastsum_20GA_SS,

      H:
        lastsum_16GA_Galv_120x48,
    
      I:
        lastsum_16GA_Galv_120x60,

      J:
        lastsum_20GA_Galv,

      result: {   
        operator: req.body.operator.symbol, 
        value1,
        result, // value_14GA
        value_18GA,
        value_16GA_120x60,
        value_16GA_120x48,
        value_20GA,
        value_18GA_SS,
        value_20GA_SS,
        value_16GA_Galv_120x48,
        value_16GA_Galv_120x60,
        value_20GA_Galv,
        note,
      },

      output: {
        
      }
    });
});
  


// Ideas:
// 1. Think about making function calculations that will return some result (in this case, would be different gauge materials)
// 2. Create more doors...