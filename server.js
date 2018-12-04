/*
How I would improve this code:

Please take a look at my "WB Doors Calculator" Project, improvements in that project are very similar to the improvements I would like to make in this project.

Summary of both projects:

1. Use a database (Firebase/MongoDB), or at least use more of the JSON file I have in this project
# All of my data should be moved there. 

2. **Condense the repetion of similar code with functions and loops**
# Combined with (1) this will save me tons of lines of code (it would especially clean up the 'operator' variable and the large amounts of 'if' statements below), and will be easier to add items that way.

3. More friendly variable names

See "WB Doors Calculator" Project for more details on improvements I would like to create here
*/

'use strict';

const express = require('express');
const app = express();
let PORT = process.env.PORT || 3000;

var config = require('./cabinetdata.json');

let operators = [

  { name: 'Classic 100', symbol: 'Classic 100' },
  { name: 'Classic 999', symbol: 'Classic 999' },

  { name: 'CM1101', symbol: 'CM1101' },

  { name: 'EL: 116EL-SQ', symbol: '116EL-SQ' },
  { name: 'EL: 117EL-SQ', symbol: '117EL-SQ' },
  { name: 'EL: 117EL-SQ-3in', symbol: '117EL-SQ-3in' },
  { name: 'EL: 118EL-SQ', symbol: '118EL-SQ' },
  { name: 'EL: 118EL-SQ-3in', symbol: '118EL-SQ-3in' },

  { name: 'EL: 126EL-SQ', symbol: '126EL-SQ' },
  { name: 'EL: 128EL-SQ', symbol: '128EL-SQ' },

  { name: 'EL: 508EL-SQ', symbol: '508EL-SQ' },
  { name: 'EL: 516EL-SQ', symbol: '516EL-SQ' },
  { name: 'EL: 518EL-SQ', symbol: '518EL-SQ' },

  { name: 'EL-SSF: 128EL-SQ-SSF', symbol: '128EL-SQ-SSF' },

  { name: 'HDOC-10: Punch', symbol: 'HDOC-10: Punch' },
  { name: 'HDOC-20: Punch', symbol: 'HDOC-20: Punch' },
  { name: 'HDOC-30: Punch', symbol: 'HDOC-30: Punch' },

  { name: 'HDOC-10: Laser 120x48', symbol: 'HDOC-10: Laser 120x48' },
  { name: 'HDOC-20: Laser 120x48', symbol: 'HDOC-20: Laser 120x48' },
  { name: 'HDOC-30: Laser 120x48', symbol: 'HDOC-30: Laser 120x48' },

  { name: 'HDOC-10: Laser 120x60', symbol: 'HDOC-10: Laser 120x60' },
  { name: 'HDOC-20: Laser 120x60', symbol: 'HDOC-20: Laser 120x60' },
  { name: 'HDOC-30: Laser 120x60', symbol: 'HDOC-30: Laser 120x60' },

  { name: 'Hydrant House', symbol: 'Hydrant House' },

  { name: 'Safeguard: 10lb SG Tub', symbol: 'Safeguard: 10lb SG Tub' },

];

app.use(express.static(__dirname + '/build'));

app.use(require('body-parser').json());
app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Origin', 'https://mean-calculator.herokuapp.com/calculator');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.listen(PORT, () => {
  console.log('server started on port', PORT);

});

//Used array below.  Need this to initiate an array for objects to be held when inputted.
var array_14GA = [];
var array_16GA_120x48 = [];
var array_16GA_120x60 = [];
var array_18GA = [];
var array_20GA = [];
var array_18GA_SS = [];
var array_20GA_SS = [];
var array_16GA_Galv_120x48 = [];
var array_16GA_Galv_120x60 = [];
var array_20GA_Galv = [];

app.route('/calculator')

  .get((req, res) => {

    res.json({
      operators,

    });
    array_14GA = [];
    array_16GA_120x48 = [];
    array_16GA_120x60 = [];
    array_18GA = [];
    array_20GA = [];
    array_18GA_SS = [];
    array_20GA_SS = [];
    array_16GA_Galv_120x48 = [];
    array_16GA_Galv_120x60 = [];
    array_20GA_Galv = [];
  })

  .post((req, res) => {

    let operator = req.body.operator.name;
    let value1 = req.body.value1;

    let value_14GA = req.body.value_14GA
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

    if (operator == 'Classic 100') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = 0;
      value_18GA = 0;
      value_20GA = value1 / config.Classic_100_FullAssyPerSheet;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = 0;
      value_16GA_Galv_120x60 = 0;
      value_20GA_Galv = 0;
    }

    if (operator == 'Classic 999') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = 0;
      value_18GA = 0;
      value_20GA = value1 / config.Classic_999_FullAssyPerSheet;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = 0;
      value_16GA_Galv_120x60 = 0;
      value_20GA_Galv = 0;
    }

    // CM1101 Calculations

    if (operator == 'CM1101') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = 0;
      value_18GA = 0;
      value_20GA = 0;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = 0;
      value_16GA_Galv_120x60 = value1 / config.CM1101_AssyPerSheet;
      value_20GA_Galv = 0;
    }

    //Elite: STANDARD CALCULATIONS

    //Elite: 100 Cabinet Calculation - Standard

    if (operator == 'EL: 116EL-SQ') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = value1 / config.EL_116_SQ_FrontsPerSheet;
      value_18GA = 0;
      value_20GA = value1 / config.EL_100_TubsPerSheet;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = 0;
      value_16GA_Galv_120x60 = 0;
      value_20GA_Galv = 0;
    }

    if (operator == 'EL: 117EL-SQ') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = value1 / config.EL_117_SQ_FrontsPerSheet;
      value_18GA = 0;
      value_20GA = value1 / config.EL_100_TubsPerSheet;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = 0;
      value_16GA_Galv_120x60 = 0;
      value_20GA_Galv = 0;
    }

    if (operator == 'EL: 117EL-SQ-3in') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = value1 / config.EL_117_SQ_3in_FrontsPerSheet;
      value_18GA = 0;
      value_20GA = value1 / config.EL_100_TubsPerSheet;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = 0;
      value_16GA_Galv_120x60 = 0;
      value_20GA_Galv = 0;
    }

    if (operator == 'EL: 118EL-SQ') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = value1 / config.EL_118_SQ_FrontsPerSheet;
      value_18GA = 0;
      value_20GA = value1 / config.EL_100_TubsPerSheet;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = 0;
      value_16GA_Galv_120x60 = 0;
      value_20GA_Galv = 0;
    }

    if (operator == 'EL: 118EL-SQ-3in') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = value1 / config.EL_118_SQ_3in_FrontsPerSheet;
      value_18GA = 0;
      value_20GA = value1 / config.EL_100_TubsPerSheet;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = 0;
      value_16GA_Galv_120x60 = 0;
      value_20GA_Galv = 0;
    }

    if (operator == 'EL: 126EL-SQ') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = value1 / config.EL_126_SQ_FrontsPerSheet;
      value_18GA = 0;
      value_20GA = value1 / config.EL_100_TubsPerSheet;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = 0;
      value_16GA_Galv_120x60 = 0;
      value_20GA_Galv = 0;
    }

    if (operator == 'EL: 128EL-SQ') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = value1 / config.EL_128_SQ_FrontsPerSheet;
      value_18GA = 0;
      value_20GA = value1 / config.EL_100_TubsPerSheet;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = 0;
      value_16GA_Galv_120x60 = 0;
      value_20GA_Galv = 0;
    }

    //Elite: 500 Cabinet Calculation - Standard

    if (operator == 'EL: 508EL-SQ') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = 0;
      value_18GA = (value1 / config.EL_500_SurfaceTubsPerSheet) + (value1 / config.EL_508_SQ_SurfaceFrontsPerSheet);
      value_20GA = 0;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = 0;
      value_16GA_Galv_120x60 = 0;
      value_20GA_Galv = 0;
    }

    if (operator == 'EL: 516EL-SQ') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = value1 / config.EL_516_SQ_FrontsPerSheet;
      value_18GA = 0;
      value_20GA = value1 / config.EL_500_TubsPerSheet;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = 0;
      value_16GA_Galv_120x60 = 0;
      value_20GA_Galv = 0;
    }

    if (operator == 'EL: 518EL-SQ') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = value1 / config.EL_518_SQ_FrontsPerSheet;
      value_18GA = 0;
      value_20GA = value1 / config.EL_500_TubsPerSheet;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = 0;
      value_16GA_Galv_120x60 = 0;
      value_20GA_Galv = 0;
    }

    //Elite: SSF - Stainless Steel Front CALCULATIONS

    if (operator == 'EL-SSF: 128EL-SQ-SSF') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = 0;
      value_18GA = value1 / config.EL_100_SSF_TubsPerSheet;
      value_20GA = 0;
      value_18GA_SS = value1 / config.EL_128_SQ_SSF_FrontsPerSheet;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = 0;
      value_16GA_Galv_120x60 = 0;
      value_20GA_Galv = 0;
    }

    //HDOC Calculations - Punch

    if (operator == 'HDOC-10: Punch') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = 0;
      value_18GA = 0;
      value_20GA = 0;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = value1 / config.HDOC_10_Punch_FullAssyPerSheet;
      value_16GA_Galv_120x60 = 0;
      value_20GA_Galv = 0;
    }

    if (operator == 'HDOC-20: Punch') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = 0;
      value_18GA = 0;
      value_20GA = 0;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = value1 / config.HDOC_20_Punch_FullAssyPerSheet;
      value_16GA_Galv_120x60 = 0;
      value_20GA_Galv = 0;
    }

    if (operator == 'HDOC-30: Punch') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = 0;
      value_18GA = 0;
      value_20GA = 0;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = value1 / config.HDOC_30_Punch_FullAssyPerSheet;
      value_16GA_Galv_120x60 = 0;
      value_20GA_Galv = 0;
    }

    //HDOC Calculations - Laser 120x48

    if (operator == 'HDOC-10: Laser 120x48') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = 0;
      value_18GA = 0;
      value_20GA = 0;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = value1 / config.HDOC_10_Laser_120x48_FullAssyPerSheet;
      value_16GA_Galv_120x60 = 0;
      value_20GA_Galv = 0;
    }

    if (operator == 'HDOC-20: Laser 120x48') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = 0;
      value_18GA = 0;
      value_20GA = 0;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = value1 / config.HDOC_20_Laser_120x48_FullAssyPerSheet;
      value_16GA_Galv_120x60 = 0;
      value_20GA_Galv = 0;
    }

    if (operator == 'HDOC-30: Laser 120x48') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = 0;
      value_18GA = 0;
      value_20GA = 0;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = value1 / config.HDOC_30_Laser_120x48_FullAssyPerSheet;
      value_16GA_Galv_120x60 = 0;
      value_20GA_Galv = 0;
    }

    //HDOC Calculations - Laser 120x60

    if (operator == 'HDOC-10: Laser 120x60') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = 0;
      value_18GA = 0;
      value_20GA = 0;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = 0
      value_16GA_Galv_120x60 = value1 / config.HDOC_10_Laser_120x60_FullAssyPerSheet;
      value_20GA_Galv = 0;
    }

    if (operator == 'HDOC-20: Laser 120x60') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = 0;
      value_18GA = 0;
      value_20GA = 0;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = 0
      value_16GA_Galv_120x60 = value1 / config.HDOC_20_Laser_120x60_FullAssyPerSheet;
      value_20GA_Galv = 0;
    }

    if (operator == 'HDOC-30: Laser 120x60') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = 0;
      value_18GA = 0;
      value_20GA = 0;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = 0
      value_16GA_Galv_120x60 = value1 / config.HDOC_30_Laser_120x60_FullAssyPerSheet;
      value_20GA_Galv = 0;
    }

    //Hydrant House Calculation

    if (operator == 'Hydrant House') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = 0;
      value_18GA = 0;
      value_20GA = 0;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = 0;
      value_16GA_Galv_120x60 = value1 / config.Hydrant_House;
      value_20GA_Galv = 0;
    }

    //Safeguard SG Tub Calculations

    if (operator == 'Safeguard: 10lb SG Tub') {
      value_14GA = 0;
      value_16GA_120x48 = 0;
      value_16GA_120x60 = 0;
      value_18GA = 0;
      value_20GA = 0;
      value_18GA_SS = 0;
      value_20GA_SS = 0;
      value_16GA_Galv_120x48 = 0;
      value_16GA_Galv_120x60 = 0;
      value_20GA_Galv = value1 / config.Safeguard_SG_Tub_10lb;
    }

    // Rounding data

    value_14GA = Math.round(value_14GA * 1000);
    value_14GA = value_14GA / 1000;

    let result = value_14GA

    value_18GA = Math.round(value_18GA * 1000);
    value_18GA = value_18GA / 1000;

    array_18GA.push(value_18GA);

    var sum_18GA = array_18GA.reduce(function (a, b) { return a + b; }, 0);

    sum_18GA = Math.round(sum_18GA * 1000);
    sum_18GA = sum_18GA / 1000;

    var lastsum_18GA = sum_18GA

    value_14GA = Math.round(value_14GA * 1000);
    value_14GA = value_14GA / 1000;

    array_14GA.push(value_14GA);

    var sum_14GA = array_14GA.reduce(function (a, b) { return a + b; }, 0);

    sum_14GA = Math.round(sum_14GA * 1000);
    sum_14GA = sum_14GA / 1000;

    var lastsum_14GA = sum_14GA

    value_16GA_120x60 = Math.round(value_16GA_120x60 * 1000);
    value_16GA_120x60 = value_16GA_120x60 / 1000;

    array_16GA_120x60.push(value_16GA_120x60);

    var sum_16GA_120x60 = array_16GA_120x60.reduce(function (a, b) { return a + b; }, 0);

    sum_16GA_120x60 = Math.round(sum_16GA_120x60 * 1000);
    sum_16GA_120x60 = sum_16GA_120x60 / 1000;

    var lastsum_16GA_120x60 = sum_16GA_120x60

    value_16GA_120x48 = Math.round(value_16GA_120x48 * 1000);
    value_16GA_120x48 = value_16GA_120x48 / 1000;

    array_16GA_120x48.push(value_16GA_120x48);

    var sum_16GA_120x48 = array_16GA_120x48.reduce(function (a, b) { return a + b; }, 0);

    sum_16GA_120x48 = Math.round(sum_16GA_120x48 * 1000);
    sum_16GA_120x48 = sum_16GA_120x48 / 1000;

    var lastsum_16GA_120x48 = sum_16GA_120x48

    value_20GA = Math.round(value_20GA * 1000);
    value_20GA = value_20GA / 1000;

    array_20GA.push(value_20GA);

    var sum_20GA = array_20GA.reduce(function (a, b) { return a + b; }, 0);

    sum_20GA = Math.round(sum_20GA * 1000);
    sum_20GA = sum_20GA / 1000;

    var lastsum_20GA = sum_20GA

    value_18GA_SS = Math.round(value_18GA_SS * 1000);
    value_18GA_SS = value_18GA_SS / 1000;

    array_18GA_SS.push(value_18GA_SS);

    var sum_18GA_SS = array_18GA_SS.reduce(function (a, b) { return a + b; }, 0);

    sum_18GA_SS = Math.round(sum_18GA_SS * 1000);
    sum_18GA_SS = sum_18GA_SS / 1000;

    var lastsum_18GA_SS = sum_18GA_SS

    value_20GA_SS = Math.round(value_20GA_SS * 1000);
    value_20GA_SS = value_20GA_SS / 1000;

    array_20GA_SS.push(value_20GA_SS);

    var sum_20GA_SS = array_20GA_SS.reduce(function (a, b) { return a + b; }, 0);

    sum_20GA_SS = Math.round(sum_20GA_SS * 1000);
    sum_20GA_SS = sum_20GA_SS / 1000;

    var lastsum_20GA_SS = sum_20GA_SS

    value_16GA_Galv_120x48 = Math.round(value_16GA_Galv_120x48 * 1000);
    value_16GA_Galv_120x48 = value_16GA_Galv_120x48 / 1000;

    array_16GA_Galv_120x48.push(value_16GA_Galv_120x48);

    var sum_16GA_Galv_120x48 = array_16GA_Galv_120x48.reduce(function (a, b) { return a + b; }, 0);

    sum_16GA_Galv_120x48 = Math.round(sum_16GA_Galv_120x48 * 1000);
    sum_16GA_Galv_120x48 = sum_16GA_Galv_120x48 / 1000;

    var lastsum_16GA_Galv_120x48 = sum_16GA_Galv_120x48

    value_16GA_Galv_120x60 = Math.round(value_16GA_Galv_120x60 * 1000);
    value_16GA_Galv_120x60 = value_16GA_Galv_120x60 / 1000;

    array_16GA_Galv_120x60.push(value_16GA_Galv_120x60);

    var sum_16GA_Galv_120x60 = array_16GA_Galv_120x60.reduce(function (a, b) { return a + b; }, 0);

    sum_16GA_Galv_120x60 = Math.round(sum_16GA_Galv_120x60 * 1000);
    sum_16GA_Galv_120x60 = sum_16GA_Galv_120x60 / 1000;

    var lastsum_16GA_Galv_120x60 = sum_16GA_Galv_120x60

    value_20GA_Galv = Math.round(value_20GA_Galv * 1000);
    value_20GA_Galv = value_20GA_Galv / 1000;

    array_20GA_Galv.push(value_20GA_Galv);

    var sum_20GA_Galv = array_20GA_Galv.reduce(function (a, b) { return a + b; }, 0);

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
