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
      enableRowHeaderSelection : false,
      multiSelect : false,
      enableSorting : true,
      enableFiltering : true,
      enableGridMenu : true
    };

    vm.serviceGrid.columnDefs = [ {
      field : 'id',
      displayName : 'Id',
      enableSorting : true,
      type : 'number',
      enableCellEdit : false,
      width : 60,
      sort : {
        direction : uiGridConstants.ASC,
        priority : 1
      }
    }, {
      field : 'title',
      enableSorting : true,
      enableCellEdit : false
    }, {
      field : 'url',
      enableSorting : true,
      enableCellEdit : false,
      cellTemplate:  '<a target="_blank" href="{{row.entity.url}}">{{row.entity.url}}</a>'
    }
    ];

    $http.get('http://mserver:8082/api/news').success(function(response) {
      console.log(response);
      vm.serviceGrid.data = response;
    });

  }
})();
