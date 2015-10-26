var scotchApp = window.angular.module('scotchApp', ['ngRoute']);

var tabs = {
    "skills": "Skills",
    "achievements": "Achievements",
    "projects": "Projects",
    "photos": "Photo Gallery",
    "contact": "Contact Me"
};

scotchApp.controller('mainController', function($scope) {
    //base template, not on individual page
    $scope.tabs = tabs;
});

// configure our routes
scotchApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'homeController'
        });
    var tabKeys = Object.keys(tabs);
    for (var i = 0; i < tabKeys.length; i++) {
        var key = tabKeys[i];
        $routeProvider.when('/' + key, {
           templateUrl: 'pages/' + key + '.html',
           controller: key + 'Controller'
        });
    }
});

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
    })("1998/03/03");
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

scotchApp.controller('skillsController', function($scope) {
   $scope.message = 'Skillz for Dayz'; 
});

scotchApp.controller('achievementsController', function($scope) {
    $scope.message = 'Look at all the stuff I\'ve done.';
});

scotchApp.controller('projectsController', function($scope) {
    $scope.message = 'Look at all the stuff I\'ve worked on.';
});

scotchApp.controller('photosController', function($scope) {
    $scope.message = 'Pictures of stuff go here.';
});

scotchApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});