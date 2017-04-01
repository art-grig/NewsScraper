(function() {
  'use strict';

  angular
    .module('newsScraperRc')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
