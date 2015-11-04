(function() {
  var app = angular.module('friendlyDateApp', []);
  app.directive('friendlyDate', ['$filter', function($filter) {
  return {
    scope: {
      date: '@',
      prefix: '@',
      fullFormat: '@',
      shortFormat: '@',
      titleClass: '@',
      contentClass: '@',
    },
    template: "<p class=\"{{titleClass}}\">{{title}}</p>\
     <p class=\"{{contentClass}}\">{{content}}</p>",
    link: function(scope, element, attrs) {
      var prefix = scope.prefix;
      var date = new Date(Date.parse(scope.date));
      var now = new Date();
      var title = '';
      var content = '';
      if (now.getFullYear() == date.getFullYear() && now.getMonth() == date.getMonth() && now.getDate() == date.getDate()) {
        // today
        if (prefix) title = prefix;
        if (now.getHours() > date.getHours()) {
          content = 'Today, ' + (now.getHours() - date.getHours()) + ' hours ago'
        } else if (now.getMinutes() > date.getMinutes()) {
          content = 'Today, ' + (now.getMinutes() - date.getMinutes()) + ' mins ago'
        } else {
          content = 'a moment now';
        }
      } else {
        var yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        if (now.getFullYear() == date.getFullYear() && now.getMonth() == date.getMonth() && now.getDate() == date.getDate() + 1) {
          // yesterday
          if (prefix) title = prefix;
          content = 'yesterday, ' + $filter('date')(date, scope.shortFormat);
        } else {
          if (prefix) title = prefix;
          title += ' on'
          content = $filter('date')(date, scope.fullFormat)
        }
      }
      scope.title = title;
      scope.content = content;
    }
  };
}]);

  app.controller('initController', function($scope) {    
    $scope.dateList=[];
    var now = new Date();
    var yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    var severalDaysAgo = new Date();
    severalDaysAgo.setDate(now.getDate() - 30);
    var severalHrsAgo = new Date();
    severalHrsAgo.setHours(now.getHours() - 3);
    var severalMinsAgo = new Date();
    severalMinsAgo.setMinutes(now.getMinutes() - 3);
    $scope.dateList.push(now.toString());
    $scope.dateList.push(yesterday.toString());
    $scope.dateList.push(severalDaysAgo.toString());
    $scope.dateList.push(severalHrsAgo.toString());
    $scope.dateList.push(severalMinsAgo.toString());
  });
})();