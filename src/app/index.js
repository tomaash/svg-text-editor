'use strict';
rangy.init();

angular.module('svgTextEditor', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ui.bootstrap', 'draganddrop'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('foo', {
        url: '/foo',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('rectangle', {
        url: '/rectangle',
        templateUrl: 'app/rectangle/rectangle.html',
        controller: 'RectangleCtrl'
      });
    $urlRouterProvider.otherwise('/');
  })
;
