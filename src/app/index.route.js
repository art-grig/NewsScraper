(function() {
  'use strict';

  angular
    .module('newsScraperRc')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('keywords', {
        url: '/',
        templateUrl: 'app/keywords/keywords.html',
        controller: 'KeywordsController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
