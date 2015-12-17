// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var requestToken = "";
var accessToken = "";
var clientId = "acd16274636c8807be1f6e2aa436ae52";
// var redirectUrl = "http://localhost:8100/oauth"
var redirectUrl = "http://52.69.102.82:3000/oauth"

var exampleApp = angular.module('home', ['ionic'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

   //  .config(function($stateProvider, $urlRouterProvider) {
   //      $stateProvider
   //          .state('login', {
   //              url: '/login',
   //              templateUrl: 'templates/login.html',
   //              controller: 'LoginController'
   //          })
   //          .state('secure', {
   //              url: '/secure',
   //              templateUrl: 'templates/secure.html',
   //              controller: 'SecureController'
   //          });
   //      $urlRouterProvider.otherwise('/login');
   //  });


exampleApp.controller('LoginController', function($scope, $http, $location) {

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    $scope.login = function() {
        var ref = window.open('https://kauth.kakao.com/oauth/authorize?client_id=' + clientId + '&redirect_uri=' + redirectUrl + '&response_type=code', '_blank', 'location=no');
        ref.addEventListener('loadstart', function(event) {
           alert("error: " + event.url);
            if((event.url).startsWith(redirectUrl)) {
                requestToken = (event.url).split("code=")[1];
                $http({method: "post", url: "https://kauth.kakao.com/oauth/token", data: "client_id=" + clientId + "&redirect_uri=" + redirectUrl + "&grant_type=authorization_code&code=" + requestToken })
                    .success(function(data) {
                        accessToken = data.access_token;
                        $location.path("/secure");
                    })
                    .error(function(data, status) {
                        alert("error: " + data);
                    });
                ref.close();
            }
        });
    }

    if (typeof String.prototype.startsWith != 'function') {
        String.prototype.startsWith = function (str){
            return this.indexOf(str) == 0;
        };
    }

    $scope.logout = function() {
      Kakao.init('81bd09553dfa596110d97ef5cdfed7b9'); //카카오에서 제공 myceo.co.kr 수정
      Kakao.Auth.logout(
      function(obj) {
      if(obj==true){}else{}
       location.href='index.html';
       }
      );
   }
});

exampleApp.controller('SecureController', function($scope, $http) {

    $scope.accessToken = accessToken;

});
