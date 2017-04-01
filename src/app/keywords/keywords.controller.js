


(function() {
  'use strict';

  RowEditor.$inject = [ '$http', '$rootScope', '$uibModal' ];
  function RowEditor($http, $rootScope, $uibModal) {
    var service = {};
    service.editRow = editRow;

    function editRow(grid, row) {
      $uibModal.open({
        templateUrl : 'app/keywords/service-edit.html',
        controller : [ '$http', '$uibModalInstance', 'grid', 'row', RowEditCtrl ],
        controllerAs : 'vm',
        resolve : {
          grid : function() {
            return grid;
          },
          row : function() {
            return row;
          }
        }
      });
    }

    return service;
  }

  function RowEditCtrl($http, $uibModalInstance, grid, row) {
    var vm = this;
    vm.entity = angular.copy(row.entity);
    vm.save = save;
    function save() {
      if (row.entity.id == '0') {
        console.log(row.entity);
        row.entity = angular.extend(row.entity, vm.entity);
        $http.post('http://mserver:8082/api/keywords', row.entity).success(function(response) { $uibModalInstance.close(row.entity);
          console.log(response);
          grid.data.push(response)})
          .error(function(response) { alert('Cannot edit row (error in console)'); console.dir(response); });
        //row.entity = angular.extend(row.entity, vm.entity);
        //real ID come back from response after the save in DB
        //row.entity.id = Math.floor(100 + Math.random() * 1000);

        //grid.data.push(row.entity);

      } else {
        row.entity = angular.extend(row.entity, vm.entity);
        /*
         * $http.post('http://localhost:8080/service/save', row.entity).success(function(response) { $uibModalInstance.close(row.entity); }).error(function(response) { alert('Cannot edit row (error in console)'); console.dir(response); });
         */
      }
      $uibModalInstance.close(row.entity);
    }

    vm.remove = remove;
    function remove() {
      console.dir(row)
      if (row.entity.id != '0') {
        row.entity = angular.extend(row.entity, vm.entity);
        var index = grid.appScope.vm.serviceGrid.data.indexOf(row.entity);
        grid.appScope.vm.serviceGrid.data.splice(index, 1);
        /*
         * $http.delete('http://localhost:8080/service/delete/'+row.entity.id).success(function(response) { $uibModalInstance.close(row.entity); }).error(function(response) { alert('Cannot delete row (error in console)'); console.dir(response); });
         */
      }
      $uibModalInstance.close(row.entity);
    }

  }

  angular
    .module('newsScraperRc')
    .controller('KeywordsController', KeywordsController)
    .controller('RowEditCtrl', RowEditCtrl)
    .service('RowEditor', RowEditor);
  /** @ngInject */
  function KeywordsController($scope, $http, $uibModal, RowEditor, uiGridConstants) {
    var vm = this;

    vm.editRow = RowEditor.editRow;

    vm.serviceGrid = {
      enableRowSelection : true,
      enableRowHeaderSelection : false,
      multiSelect : false,
      enableSorting : true,
      enableFiltering : true,
      enableGridMenu : true,
      rowTemplate : "<div ng-dblclick=\"grid.appScope.vm.editRow(grid, row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>"
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
      field : 'category',
      enableSorting : true,
      enableCellEdit : false
    }, {
      field : 'keyword',
      enableSorting : true,
      enableCellEdit : false
    },
      {
        field : 'author',
        enableSorting : true,
        enableCellEdit : false
      }
    ];

    vm.serviceGrid.data = {};

    $http.get('http://mserver:8082/api/keywords').success(function(response) {
      console.log(response);
      vm.serviceGrid.data = response;
    });

    $scope.addRow = function() {
      var newService = {
        "id" : "0",
        "category" : "military",
        "keyword" : "test",
        "author" : "MTDC"
      };
      var rowTmp = {};
      rowTmp.entity = newService;
      vm.editRow($scope.vm.serviceGrid, rowTmp);
    };
  }
})();
