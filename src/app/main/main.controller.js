(function() {
  'use strict';

  angular
    .module('newsScraperRc')
    .controller('MainController', MainController)
    .directive('gridLoading', function () {
      return {
        restrict: 'C',
        require: '^uiGrid',
        link: function ($scope, $elm, $attrs, uiGridCtrl) {
          $scope.grid = uiGridCtrl.grid;
        }
      }
    });


  /** @ngInject */
  function MainController($scope,$timeout, $http, $uibModal, RowEditor, uiGridConstants, API_URL) {
    var vm = this;

    $scope.updateStatus = function(entity) {
      console.log('test');
      var reqDest = API_URL + '/news/' + entity.id + '/status/' + entity.status;
      $http.post(reqDest, "").success(function(response) {console.log(response)})
        .error(function(response) {  console.log(response); });
    }

    vm.serviceGrid = {
      rowHeight: 50,
      enableRowSelection : true,
      enableRowHeaderSelection: false,
      enableColumnMenus: false,
      gridMenuShowHideColumns: false,
      multiSelect: false,
      enableSorting : true,
      enableFiltering : true,
      enableGridMenu : true,
      minRowsToShow: 15
    };

    vm.statusTypes = [
      {value: 1, label: 'Նոր'},
      {value: 2, label: 'Դիտված'},
      {value: 3, label: 'Անպետք'}
    ];

    vm.serviceGrid.columnDefs = [
      {
        field: 'index',
        displayName: '№',
        enableSorting: false,
        enableFiltering: false,
        enableCellEdit: false,
        width: 50,
        cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1}}</div>'
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
      },
      {
        field: 'keywords',
        displayName: 'Բանալիներ',
        enableSorting: true,
        enableCellEdit: false,
        cellTemplate: '<textarea  disabled style=" width:100%" ng-bind="row.entity.keywords.join(\',\')"></textarea>'
      },
      {
        field: 'status',
        displayName: 'Կարգավիճակ',
        filter: { selectOptions: vm.statusTypes, defaultValue: 1,type: uiGridConstants.filter.SELECT },
        enableCellEdit: false,
        width: 100,
        // cellTemplate: '<div>{{COL_FIELD == 1 ? "Նոր" :  COL_FIELD == 2 ? "Դիտված" : "Անպետք"}}</div>'
        cellTemplate: '<select style=" width:100%" class="input" ng-change="grid.appScope.updateStatus(row.entity)" ng-model="row.entity.status" ng-options="v.id as v.name for v in [{id: 1, name:\'Նոր\'}, {id: 2, name: \'Դիտված\'},{id: 3, name: \'Անպետք\'}]"> </select>'
      },
      {
        field: 'concurrences',
        displayName: '#',
        enableSorting: true,
        enableFiltering: false,
        enableCellEdit: false,
        width: 50,
        cellTemplate: '<span>{{row.entity.keywords.length}}</span>'
      }

    ];

    vm.serviceGrid.columnDefs[5].filter.term = 1;
    $timeout(function () {
      $http.get(API_URL + '/news').success(function(response) {
        console.log(response);
        vm.serviceGrid.data = response;
      });
    }, 1000);


  }
})();
