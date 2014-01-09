(function() {
  'use strict';

  var twPopover = angular.module('twPopover', []);

  twPopover.directive('twPopover', ['$interpolate', function($interpolate) {
    var template = 'Copies: {{ copies }}<br/>' +
                   'Owner: {{ owner }}<br/>' +
                   'Waiting list: {{ waiting_list }}<br/>' +
                   'Comments: {{ comments }}<br/>' +
                   'Who is reading: {{ who_is_reading }}<br/>';
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
  }]);
})();
