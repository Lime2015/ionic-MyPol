// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('home', ['ionic'])

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


.controller('PopupLoginCtrl',function($http, $scope, $location, $ionicPopup, $timeout) {

var clientId = "acd16274636c8807be1f6e2aa436ae52";
var redirectUrl = "http://localhost:3000/oauth"
var requestToken;
var accessToken;

$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
$scope.kakaoLogin = function(){

   // console.log(">>request kakaoLogin page")

   https://kauth.kakao.com/oauth/authorize?client_id=acd16274636c8807be1f6e2aa436ae52&redirect_url=http://localhost:3000/oauth&response_type=code
   // var ref = window.open("https://accounts.kakao.com/login?continue=https://kauth.kakao.com/oauth/authorize?client_id=" + clientId + "&redirect_url=" + redirectUrl + "&response_type=code", '_blank');
   window.open("https://kauth.kakao.com/oauth/authorize?client_id=" + clientId + "&redirect_url=" + redirectUrl + "&response_type=code", '_self');
   // ref.addEventListeneer('loadstart', function(event) {
   //    if((event.url).startsWith(redirectUrl)) {
   //       requestToken = (event.url).split("code=")[1];
   //       $http({
   //          method: "get",
   //          url: "https://kauth.kakao.com/oauth/token",
   //          data: "grant_type=authorization_code&client_id=" + clientId + "&redirect_url=" + redirectUrl + "&code=" + requestToken
   //       })
   //          .success(function(data) {
   //             accessToken = data.access_token;
   //             $location.path("/tab.dash");
   //          })
   //          .error(function(data, status) {
   //             alert("error:" + data);
   //          });
   //       ref.close();
   //    }
   // });
};

// if(typeof String.prototype.startsWith != 'function') {
//    String.prototype.startsWith = function(str) {
//       return this.indexOf(str) == 0;
//    };
// }

// Triggered on a button click, or some other target
$scope.showPopup = function() {
  $scope.data = {}

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    // template: '<input type="password" ng-model="data.wifi">',
    templateUrl: 'kakao-login.html',
    title: '', //'Enter Wi-Fi Password',
    // subTitle: 'Please use normal things',
    scope: $scope,
    cssClass: 'css/layout.css;css/common.css;css/main.css'
    // buttons: [
    //   { text: 'Cancel' },
    //   {
    //     text: '<b>Save</b>',
    //     type: 'button-positive',
    //     onTap: function(e) {
    //       if (!$scope.data.wifi) {
    //         //don't allow the user to close unless he enters wifi password
    //         e.preventDefault();
    //       } else {
    //         return $scope.data.wifi;
    //       }
    //     }
    //   }
    // ]
  });
  myPopup.then(function(res) {
    console.log('Tapped!', res);
  });
  // $timeout(function() {
  //    myPopup.close(); //close the popup after 3 seconds for some reason
  // }, 3000);
 };
 // A confirm dialog
 $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Consume Ice Cream',
     template: 'Are you sure you want to eat this ice cream?'
   });
   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
     } else {
       console.log('You are not sure');
     }
   });
 };

})
