(function() {
  'use strict';

  var bookshelfApp = angular.module('bookshelfApp', ['ngRoute',
                                                    'booksController',
                                                    'twPopover']);

  bookshelfApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/books/:officeName', {
      templateUrl: 'partials/list-books.html',
      controller: 'BooksController'
    }).otherwise({
      redirectTo: '/books/poa'
    });
  }]);
})();
