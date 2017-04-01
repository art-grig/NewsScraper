(function() {
  'use strict';

  window.categories = [
      'Զինված ուժեր',
      'Ընտրություններ'
  ]

  angular
    .module('newsScraperRc')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
