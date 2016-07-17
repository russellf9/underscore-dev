var catComponent = require("./cat.component");

angular.module('cats', []);


module.exports = angular.module('cats', [])
    .directive('cat', catComponent);