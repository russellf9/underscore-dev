module.exports = function($scope, $window) {
    $scope.message = 'Setting Up';

    // for the time being use set up the underscore dependency so
    var _ = $window._;

    var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
    $scope.names = _.pluck(stooges, 'name');

    // Ok This is working
   // console.log('2 stooges ', stooges);

    var peopleData = require('.././people'); // hack like this for the time being

    console.log('peopleData ', peopleData);



};

