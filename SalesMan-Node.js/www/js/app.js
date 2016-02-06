// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

    .run(function ($ionicPlatform, $rootScope, $state) {
        $rootScope.$on("$stateChangeStart", function (event, toState) {
            var firebaseLocalToken = localStorage.getItem("token");
            if (toState.loginCompulsory && !firebaseLocalToken) {
                event.preventDefault();
                $state.go("login");
            }
        });

        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider,$httpProvider) {
        $stateProvider
            .state('tab.home', {
                url: '/home',
                views: {
                    'tab-home': {
                        templateUrl: 'templates/tab-home.html',
                        controller: 'homeCtrl',
                        loginCompulsory: true
                    }
                }
            })

            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:

            .state('tab.signin', {
                url: '/signin',
                views: {
                    'tab-signin': {
                        templateUrl: 'templates/tab-signin.html',
                        controller: 'SigninCtrl'
                    }
                }
            })

            .state('tab.signup', {
                url: '/signup',
                views: {
                    'tab-signup': {
                        templateUrl: 'templates/tab-signup.html',
                        controller: 'SignupCtrl'
                    }
                }
            })

            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/tab-chats.html',
                        controller: 'ChatsCtrl'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/signin');
        //$httpProvider.interceptors.push('httpInterceptor');
    })
    //.factory("httpInterceptor", function () {
    //    return {
    //        request: function (config) {
    //            var token = localStorage.getItem("token");
    //            if (token) {
    //                config.url = config.url + "?token=" + token;
    //            }
    //            return config;
    //        }
    //    }
    //});

