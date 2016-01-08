// Ionic Starter App

// angular.module is login global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in login <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state("views",{
      url:'/index',
      templateUrl:"views/index.html"
      //controller:"yourControllerName"
    })
    .state("login",{
      url:'/login',
      templateUrl:"views/login/login.html"
      //controller:"yourControllerName"
    })
    .state("signup",{
      url:'/signup',
      templateUrl:"views/signup/signup.html"
      //controller:"yourControllerName"
    });
  $urlRouterProvider.otherwise("views")
})
