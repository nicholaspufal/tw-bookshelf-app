(function() {
  'use strict';

  angular.module('twBookshelf',['ngRoute']).
    config(function($routeProvider) {
      $routeProvider.when('/books/:officeName', { 
        templateUrl: 'partials/list-books.html',
        controller: 'BooksController'
      }).otherwise({
        redirectTo: '/books/poa'
      });
    }).
    controller('BooksController', function($scope, $http, $routeParams) {
      $scope.splitInRows = function(books) {
        var rows = [];
        angular.forEach(books, function(book, key) {
          if (key % 7 == 0) rows.push([]);
          rows[Math.floor(key / 7)].push(book);
        });
        return rows;
      };

      $scope.sanitizeBookCover = function(bookCover) {
        return (bookCover === null) ? 'img/no_cover.png' : bookCover;
      };

      $http({ method: 'GET', url: 'http://twbookshelf-service.herokuapp.com/books/' + $routeParams.officeName }).
        success(function(data, status, headers, config) {
          $scope.rows = $scope.splitInRows(data);
        }).
        error(function(data, status, headers, config) {
          console.log("Service is down!");
      });
    }).
    directive('twPopover', function($interpolate) {
      var template = "Copies: {{ copies }}<br/>Owner: {{ owner }}<br/>Waiting list: {{ waiting_list }}<br/>Comments: {{ comments }}<br/>Who is reading: {{ who_is_reading }}<br/>";
      var interpolatedTemplate = $interpolate(template);

      return {
        link: function (scope, element) {
          var options = {
            placement: 'auto top',
            title: scope.book.title,
            content: interpolatedTemplate(scope.book),
            trigger: 'hover',
            html: true
          };

          $(element).popover(options);
        }
      };
    });
})();
