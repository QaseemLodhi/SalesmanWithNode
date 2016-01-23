angular.module('starter.controllers', [])

    .controller('SigninCtrl', function ($scope, $http,$state) {
        $scope.username = '';
        $scope.email = '';
        $scope.password = '';
        $scope.signin = function () {
            var user = {
                email: $scope.email,
                passowrd: $scope.password
            };
            $http.post('/api/signin', {data: user})
                .then(function (res) {
                    if (response.token) {
                        localStorage.setItem('token', response.token);
                        alert("Successful Signin");
                        console.log('Signin-Data', res);
                        $state.go("home");
                    }
                }, function (err) {
                    console.log(err);
                })
        }
    })
    .controller('SignupCtrl', function ($scope, $timeout, $http, $state) {

        $scope.signup = function (firstName, lastName, email, password) {
            var user = {
                firstName: firstName,
                lastName: lastName,
                Email: email,
                password: password
            }
            $http.post('/api/signup', {data: user})
                .then(function (resdata) {
                    alert('Mubarak Ho');
                    console.log('Data: ', resdata);
                    $state.go('tab.signin');
                }, function (err) {
                    alert('Nuksan Hogaya');
                    console.log('Error: ', err)
                })
        }
    })

    .controller('homeCtrl',function($scope,$http,$state){
        $http.get('/api/salesman')
            .then(function(res){
                console.log(res);
            },function(err){
                console.log(err);
            })
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
