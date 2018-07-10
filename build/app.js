// below calls for angular module

/*
WHAT I LEARNED
Sometimes mobile + localhost will not work.  When you deploy to heroku, it works better! Idk lol fine
*/

var app = angular.module('App', []);


//idk lol
var sum = 0

//BELOW IS MY APP CONTROLLER! - Where everything is hooked up to
app.controller('AppController', ['$http', function($http) {

  //Because I am currently using localhost, I use the localhost:3000/calculator as my apiRoute

   var apiRoute = 'http://localhost:3000/calculator';

   //var apiRoute = 'https://ag-sf-calculator.herokuapp.com/calculator';



  // this is the location of the creator's heroku app
  //var apiRoute = 'https://mean-calculator.herokuapp.com/calculator';

  var _this = this;
  _this.results = [];
  _this.operators = [];
  _this.A = []; //14GA
  _this.B = []; //18GA
  _this.C = []; //16GA 120x60
  _this.D = []; //16GA 120x48
  _this.E = []; //20GA
  _this.F = []; //18GA Stainless
  _this.G = []; //20GA Stainless
  _this.H = []; //16GA Galvanneal 120x48
  _this.I = []; //26GA Galvanneal 120x60
  _this.I = []; //20GA Galvanneal


  //the below equation is not needed
  //_this.sumA = sum

console.log("work pls");
  $http.get(apiRoute)
  
  .then(function(res) {
    _this.operators = res.data.operators;
  }, function(res) {
    console.log(res);
  });

  _this.calculate = function(operator, value1) {
    _this.error = validate(operator, value1);

    //BELOW POSTS ALL RESULTS!!
    if (!_this.error) {
      $http.post(apiRoute, {operator, value1})
        .then(function(res) {
          //All of this below pushes stuff into arrays... not what I want....
          
          _this.results.push(res.data.result)
          //_this.A = 7
         // _this.A.push(res.data.A) - Do I even need this???
         // _this.B.push(res.data.B)


  //Below not pushed into array - what I want for "Resuls Combined!"
       _this.sumA = res.data.A
       _this.sumB = res.data.B
       _this.sumC = res.data.C
       _this.sumD = res.data.D
       _this.sumE = res.data.E
       _this.sumF = res.data.F
       _this.sumG = res.data.G
       _this.sumH = res.data.H
       _this.sumI = res.data.I
       _this.sumJ = res.data.J

        
        }, function(res) {
          console.log(res);
        });
    }
    //ABOVE POSTS ALL RESULTS!!
  }
}]);

// BELOW: Not having below does not allow me to enter anything
function validate(operator, value1) {
  if (!operator) return 'Please select a Door.';
  if ((!value1 && value1 != 0) || (!value1 && value1 != 0)) return 'Please enter a QTY.';
  if(value1 <=0) return 'Choose a number greater than zero.'
  if (value1 % 1 != 0) return 'Choose a whole number.'
  return null;
}
