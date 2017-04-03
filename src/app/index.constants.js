/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('newsScraperRc')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
  .constant('API_URL', 'http://mserver:8082/api');
  //  .constant('API_URL', 'http://10.100.100.156:12135/api');

})();
