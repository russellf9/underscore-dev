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

    // uses a search string to filter
    $scope.updateSearch = function() {
        // by id
        // model.searchId

        // clear the collection first
        $scope.filteredData = []

        var hasPeople =  _hasPeopleById($scope.model.searchId);

        if (hasPeople) {
            $scope.filteredData.push(_findPeopleById($scope.model.searchId))
        }
    };

    $scope.update = function() {

        var peopleFilteredByProfession = _getPeopleGroupedByProfession($scope.model.selectedProfession);

        var peopleFilteredByGender = _getPeopleFilteredByGender($scope.model.selectedGender);

        $scope.filteredData = _.intersection(peopleFilteredByProfession,peopleFilteredByGender);


    };

    //==== UTILITY FUNCTIONS ====

    // ALL PEOPLE
    function getPeople() {
        return $scope.peopleData;
    }

    // ID
    function _hasPeopleById(id) {
        var people = getPeople();
        var peopleIds = _.pluck(people, 'id');
        return _.contains(peopleIds, Number(id)); // Note: Had to to do type cast
    }

    function _findPeopleById(id) {
        var people = getPeople();
        return _.find(people, function(person) {
            return Number(person.id) === Number(id);
        });
    }

    // GENDER
    function _filterByGender(people, gender) {
        if (!gender || gender === 'Any') {
            return people;
        }
        return _.where(people, {
            gender: gender
        });
    }
    function _getPeopleFilteredByGender(gender) {
        return _filterByGender($scope.peopleData, gender);
    }


    // PROFESSION
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

        return _.sortBy(filteredPeople, 'last_name');
    }

    // Create a fill list of possible drop down options by `plucking` all possible values
    $scope.model.professions = _.uniq(_.pluck(_.flatten($scope.peopleData), "job_title"));

    // Create and set the default option
    $scope.model.professions.unshift('All');

    $scope.model.selectedProfession =  $scope.model.professions[0];


    // Create a list of possible gender dropdowns by `plucking` all possible values
    $scope.model.genders = _.uniq(_.pluck(_.flatten($scope.peopleData), "gender"));

    // Create and set the default option
    $scope.model.genders.unshift('Any');

    $scope.model.selectedGender =  $scope.model.genders[0];


    // Mke the initial call to set the View data
    $scope.update();

};

