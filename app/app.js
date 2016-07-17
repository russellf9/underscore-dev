require('angular');


var app = angular.module('myApp', []);


var MainController = require('./controllers/MainController');
var peopleData = require('./people'); // put here

app.controller('MainController', ['$scope','$window', MainController]);


// TODO break out into modules once that is worked out...
//require('./app.module');
//var PeopleComponent = require('./people/People');
//app.component('PeopleComponent', ['$scope', PeopleComponent]);