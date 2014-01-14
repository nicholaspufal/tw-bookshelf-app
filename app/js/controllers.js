(function() {
  'use strict';

  var booksController = angular.module('booksController', []);

  booksController.controller('BooksController', ['$scope',
    '$http',
    '$routeParams',
    '$log',
    '$location', 
    function($scope, $http, $routeParams, $log, $location) {
      $scope.endPoint = $location.protocol() + 
                        '://twbookshelf-service.herokuapp.com/books/' +
                        $routeParams.officeName;

      $scope.splitInRows = function(books) {
        var rows = [];
        angular.forEach(books, function(book, key) {
          if (key % 7 === 0) {
            rows.push([]);
          }
          rows[Math.floor(key / 7)].push(book);
        });
        return rows;
      };

      $scope.sanitizeBookCover = function(bookCover) {
        return (bookCover === null) ? 'img/no_cover.png' : bookCover;
      };

      $http({ method: 'GET',
              url: $scope.endPoint }).
      success(function(data, status, headers, config) {
        $scope.rows = $scope.splitInRows(data);
      }).
      error(function(data, status, headers, config) {
        $log.error('Service is down!');
      });
    }]);
})();
