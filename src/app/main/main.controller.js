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
      enableGridMenu : true,
      minRowsToShow: 25
    };

    vm.serviceGrid.columnDefs = [
      {
        field: 'index',
        displayName: '#',
        enableFiltering : false,
        width: 50,
        cellTemplate: '<span>{{rowRenderIndex + 1}}</span>'
      },
      {
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
    },
      {
        field: 'createdDate',
        displayName: 'Թարմացման ամսաթիվ',
        enableSorting: true,
        enableCellEdit: false,
        cellTemplate: '<span ng-bind="row.entity.createdDate | date: \'MM-dd-yyyy HH:mm:ss\'"></span>'
      }
    ];

    $http.get('http://mserver:8082/api/news').success(function(response) {
      console.log(response);
      vm.serviceGrid.data = response;
    });

  }
})();
