angular.module('restaurant', ['ionic', 'ngMaterial', 'ui.router', 'restaurant.config', 'restaurant.controllers', 'restaurant.filters', 'restaurant.directives', 'restaurant.services', 'ionic-multi-date-picker'])
// 'ngMockE2E'

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })


  /*
  .run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
      if ('data' in next && 'authorizedRoles' in next.data) {
        var authorizedRoles = next.data.authorizedRoles;
        if (!AuthService.isAuthorized(authorizedRoles)) {
          event.preventDefault();
          //$state.go('tab/menu');
          $state.go($state.current, {}, {reload: true});
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        }
      }

      if (!AuthService.isAuthenticated()) {
        if (next.name !== 'login') {
          event.preventDefault();
          $state.go('login');
        }
      }
    });
  })
*/



  /*
  timer:
   .run(function(ClockSrv){
   ClockSrv.startClock(function(){
   console.log("clocksrv");
   });
   })
   */

  .config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider

      .state('login', {
        url: '/login',
        templateUrl: 'templates/forms/login.html',
        controller: 'loginCtrl'
      })

      .state('help', {
        url: '/help',
        templateUrl: 'templates/help.html',
        controller: 'helpCtrl'
      })

      .state('about', {
        url: '/about',
        templateUrl: 'templates/about.html',
        controller: 'aboutCtrl'
      })

      /*Tab states*/
      .state('tab', {
        url: '/',
        abstract: true,
        templateUrl: 'templates/tabs/tabs.html'
      })

      .state('tab.menu', {
        url: 'tab/menu',
        views: {
          'menu-tab': {
            templateUrl: 'templates/tabs/menu.html',
            controller: 'menuTabCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.visitor, USER_ROLES.boarder]
        }
      })

      .state('tab.take', {
        url: 'tab/take',
        views: {
          'take-tab': {
            templateUrl: 'templates/tabs/take.html',
            controller: 'takeTabCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.visitor, USER_ROLES.boarder]
        }
      })

      .state('tab.give', {
        url: 'tab/give',
        views: {
          'give-tab': {
            templateUrl: 'templates/tabs/give.html',
            controller: 'giveTabCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.boarder]
        }
      });


    $urlRouterProvider.otherwise('/login');
  })

  .config(function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
  });
