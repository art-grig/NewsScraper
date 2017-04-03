


(function() {
  'use strict';



  angular
    .module('newsScraperRc')
    .controller('KeywordsController', KeywordsController)
    .controller('RowEditCtrl', RowEditCtrl)
    .service('RowEditor', RowEditor);
  /** @ngInject */
  function KeywordsController($scope, $http, $uibModal, RowEditor, uiGridConstants, API_URL) {
    var vm = this;

    vm.editRow = RowEditor.editRow;
    $scope.status = ['Զինված ուժեր', 'Ընտրություններ'];
    vm.serviceGrid = {
      minRowsToShow: 25,
      enableRowSelection : true,
      enableRowHeaderSelection : false,
      multiSelect: false,
      gridMenuShowHideColumns: false,
      enableColumnMenus: false,
      enableSorting : true,
      enableFiltering : true,
      enableGridMenu: true,
      rowTemplate : "<div ng-dblclick=\"grid.appScope.vm.editRow(grid, row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>"
    };


    vm.serviceGrid.columnDefs = [{
        field: 'index',
        displayName: '#',
        enableSorting: false,
        enableFiltering: false,
        enableCellEdit: false,
        width: 50,
        cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1}}</div>'
    },
      {
        field: 'keyword',
        displayName: 'Բանալի',
      enableSorting : true,
      enableCellEdit : false
    }, {
            field: 'category',
            displayName: 'Կատեգորիա',
        enableSorting: true,
        enableCellEdit: false,
        cellTemplate: '<div>{{COL_FIELD == 1 ? "Զինված ուժեր" : "Ընտրություններ"}}</div>'
    },
      {
          field: 'author',
          displayName: 'Հեղինակ',
        enableSorting : true,
        enableCellEdit : false
      }
    ];

    $http.get(API_URL + '/keywords').success(function (response) {
      vm.serviceGrid.data = response;
    });

    $scope.addRow = function() {
        var newService = {
          "id": "0",
        "category" : 1,
        "keyword" : "",
        "author" : ""
      };
      var rowTmp = {};
      rowTmp.entity = newService;
      vm.editRow($scope.vm.serviceGrid, rowTmp);
    };
  }

  RowEditor.$inject = [ '$http', '$rootScope', '$uibModal' ];
  function RowEditor($http, $rootScope, $uibModal) {
    var service = {};
    service.editRow = editRow;

    function editRow(grid, row) {
      $uibModal.open({
        templateUrl : 'app/keywords/service-edit.html',
        controller : [ '$http', '$uibModalInstance', 'grid', 'row', 'API_URL',RowEditCtrl ],
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

  function RowEditCtrl($http, $uibModalInstance, grid, row, API_URL) {
    var vm = this;
    vm.entity = angular.copy(row.entity);
    vm.save = save;
    function save() {
      if (row.entity.id == '0') {
        row.entity = angular.extend(row.entity, vm.entity);
        $http.post(API_URL+'/keywords', row.entity).success(function(response) { $uibModalInstance.close(row.entity);
          console.log(response);
          grid.data.push(response)})
          .error(function(response) { alert('Cannot edit row (error in console)'); console.dir(response); });

      } else {
        row.entity = angular.extend(row.entity, vm.entity);
        $http.post(API_URL+'/keywords', row.entity).success(function(response) { $uibModalInstance.close(row.entity); }).error(function(response) { alert('Cannot edit row (error in console)'); console.dir(response); });

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
        $http.delete(API_URL + '/keywords/'+row.entity.id).success(function(response) { $uibModalInstance.close(row.entity); }).error(function(response) { alert('Cannot delete row (error in console)'); console.dir(response); });

      }
      $uibModalInstance.close(row.entity);
    }

  }
})();
