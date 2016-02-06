angular.module('starter.controllers', [])

    .controller('SigninCtrl', function ($scope, $http,$state,$rootScope) {
        $scope.email= "";
        $scope.password = "";
        $scope.signin = function (email, password) {
            var user = {
                Email: email,
                password: password
            };
            $http.post('/signin',user)
                .success(function(res){
                    if (res.token) {
                        localStorage.setItem('token', res.token);
                        localStorage.setItem('Login',true);
                        alert('Login Successful');
                        console.log('Data: ', res);
                        $state.go('tab.home');
                    }
                })
                .error(function(err){
                    alert('Either username and password do not match');
                    console.log('Error:',err)
                })
        };
    })
    .controller('SignupCtrl', function ($scope, $timeout, $http, $state) {

        $scope.signup = function (firstName, lastName, email, password) {
            var user = {
                firstName: firstName,
                lastName: lastName,
                Email: email,
                password: password,
                FirebaseToken:''
            }
            $http.post('/signup',  user)
                .success(function(data){
                    alert('Successfully SignUp');
                    console.log('Data: ', data);
                    $state.go('tab.signin');
                })
                .error(function(err){
                    alert('Either username and password do not match');
                    console.log('Error:',err)
                })
        }
    })

    .controller('homeCtrl',function($scope,$http,$state,$rootScope){

        $scope.logout = function(){
            localStorage.removeItem('token');
            localStorage.setItem('Login',false);
            $state.go('tab.signin');
        };
        //if(user)
        //$http.get('/api/salesman')
        //    .then(function(res){
        //        console.log(res);
        //    },function(err){
        //        console.log(err);
        //    })
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
