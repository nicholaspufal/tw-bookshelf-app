angular.module('twBookshelf',[]).
  directive('twPopover', function() {
    return {
      link: function (scope, element, attributes) {
        var options = {
          placement: 'auto top',
          trigger: 'hover',
          html: true
        }

        $(element).popover(options);
      }
    };
  });
