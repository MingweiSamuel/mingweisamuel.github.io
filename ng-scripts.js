var scotchApp = window.angular.module('scotchApp', ['ngRoute', 'ngAnimate']);

scotchApp.filter('parseDate', function() {
    return function(str) {
        return new Date(str);
    };
});

var tabs = {
    'projects': 'Projects',
    'awards': 'Awards',
    'other': 'Other',
    'skills': 'Skills',
    'contact': 'Social'
};

scotchApp.controller('mainController', function($scope, $location) {
    //base template, not on individual page
    $scope.tabs = tabs;
    
    $scope.isActive = function(location) {
        return location === $location.path();
    };
});

// configure our routes
scotchApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        title: 'Welcome',
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    });
    
    $routeProvider.when('/detail/:name', {
        templateUrl: 'pages/detail.html',
        controller: 'detailController'
    });
    
    var tabKeys = Object.keys(tabs);
    for (var i = 0; i < tabKeys.length; i++) {
        var key = tabKeys[i];
        $routeProvider.when('/' + key, {
            title: tabs[key],
            templateUrl: 'pages/' + key + '.html',
            controller: key + 'Controller'
        });
    }
});

scotchApp.run(['$location', '$rootScope', '$routeParams', function($location, $rootScope, $routeParams) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        if (current.$$route.title)
            $rootScope.title = current.$$route.title;
        else
            $rootScope.title = $routeParams.name;
    });
}]);

// create the controller and inject Angular's $scope
scotchApp.controller('homeController', function($scope) {
    $scope.age = (function(birthDate) {
        var today = new Date();
        var birthDate = new Date(birthDate);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    })('1998/03/03');
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

scotchApp.controller('skillsController', function($scope, $http) {
    $scope.message = 'Skillz for Dayz';
    $http.get('data/skills.json').then(function(res) {
      $scope.skills = res.data;
    });
});

scotchApp.controller('awardsController', function($scope, $http) {
    $scope.awards = {};
    $http.get('data/awards.json').then(function(res) {
      $scope.awards = res.data;
    });
});

scotchApp.controller('projectsController', function($scope, $http) {
    $scope.projects = {};
    $http.get('data/projects.json').then(function(res) {
      $scope.projects = res.data;
    });
});

scotchApp.controller('otherController', function($scope) {
    $scope.message = 'Other stuff here';
});

scotchApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

scotchApp.controller('detailController', function($scope) {
    
});