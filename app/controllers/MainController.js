module.exports = function($scope, $window) {
    $scope.message = 'Setting Up 2';

    // for the time being use set up the underscore dependency so
    var _ = $window._;

    var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
    $scope.names = _.pluck(stooges, 'name');

    // Ok This is working
   // console.log('2 stooges ', stooges);

    $scope.peopleData = require('.././people'); // hack like this for the time being

    console.log('peopleData ', $scope.peopleData);



    $scope.model = {};


    //==== Scope functions ====

    $scope.update = function() {
        $scope.filteredData = _getPeopleGroupedByProfession($scope.model.selectedProfession);
    };

    // utility functions

    function _filterPeopleByProfession(people, profession) {
        if (!profession || profession === 'All') {
            return people;
        }
        return _.where(people, {
            job_title: profession
        });
    }

    function _getPeopleGroupedByProfession(profession) {
        var filteredPeople = _filterPeopleByProfession($scope.peopleData, profession);

        return filteredPeople;
    }

    // Create a fill list of possible drop down options by `plucking` all possible va;ues
    $scope.model.professions = _.uniq(_.pluck(_.flatten($scope.peopleData), "job_title"));

    // Create and set the default option
    $scope.model.professions.unshift('All');

    $scope.model.selectedProfession =  $scope.model.professions[0];


    // Mke the iniitial call to set the View data
    $scope.update();

};

