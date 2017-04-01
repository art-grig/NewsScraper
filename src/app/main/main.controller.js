(function() {
  'use strict';

  angular
    .module('newsScraperRc')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $http, $uibModal, RowEditor, uiGridConstants) {
    var vm = this;


    vm.serviceGrid = {
      enableRowSelection : true,
      enableRowHeaderSelection: false,
      enableColumnMenus: false,
      gridMenuShowHideColumns: false,
      multiSelect: false,
      enableSorting : true,
      enableFiltering : true,
      enableGridMenu : true
    };

    vm.serviceGrid.columnDefs = [{
      field: 'title',
      displayName: 'Վերնագիրը',
      enableSorting : true,
      enableCellEdit: false
    }, {
        field: 'url',
        displayName: 'Հղում',
        enableSorting: true,
        enableCellEdit: false,
        cellTemplate: '<div class="article-title"><a target="_blank" href="{{row.entity.url}}">{{row.entity.url}}</a></div>'
    }
    ];

    $http.get('http://mserver:8082/api/news').success(function(response) {
      console.log(response);
      vm.serviceGrid.data = response;
    });

  }
})();
