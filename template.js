/**
 * template.js
 * Author: mbrzuzy
 *
 * Currently only setup to work with handlebars.js.
 *
 * v0.1.0
 */

;(function(DemacFactory, $, undefined) {
  'use strict';

  DemacFactory.Template = (function () {
    function Template(source) {
      this.source   = $(source).html();
      this.template = Handlebars.compile(this.source);
    }

    Template.prototype.build = function (data) {
      return this.template(data);
    }

    return Template;
  })();

}(window.DemacFactory = window.DemacFactory || {}, jQuery));