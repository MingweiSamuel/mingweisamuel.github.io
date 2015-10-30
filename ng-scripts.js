var scotchApp = window.angular.module('scotchApp', ['ngRoute']);

var tabs = {
    'projects': 'Projects',
    'achievements': 'Achievements',
    'skills': 'Skills',
    'photos': 'Photo Gallery',
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

scotchApp.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
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

scotchApp.controller('achievementsController', function($scope) {
    $scope.message = 'Look at all the stuff I\'ve done.';
});

scotchApp.controller('projectsController', function($scope, $http) {
    $scope.message = 'Look at all this cool stuff.';
    $http.get('data/projects.json').then(function(res) {
      $scope.projects = res.data;                
    });
});

scotchApp.controller('photosController', function($scope) {
    $scope.message = 'Pictures of stuff go here.';
});

scotchApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});
