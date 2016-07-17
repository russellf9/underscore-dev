var catsModule = require('./cats/cat.module');

module.exports = angular.module('app', [
        catsModule.name
]);