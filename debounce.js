;(function(DemacFactory, $, undefined) {
  'use strict';

  /**
   * Taken from underscore.js
   *
   * @param func
   * @param wait
   * @param immediate
   * @returns {Function}
   * @constructor
   */
  DemacFactory.Debounce = function (func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

}(window.DemacFactory = window.DemacFactory || {}, jQuery));