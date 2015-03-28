/**
 * collection.js
 * Author: mbrzuzy
 *
 * v1.1.0
 *
 * Changes:
 * v1.1.0: Added  Collection.prototype.add() - mbrzuzy
 */

;(function(DemacFactory, $, undefined) {
  'use strict';

  DemacFactory.Collection = (function () {
    function Collection() {
      this.collection = [];
      this.loaded     = false;
    }

    Collection.prototype.set = function (data) {
      this.collection = data;
    }

    Collection.prototype.add = function (data) {
      if (data instanceof Array) {
        this.collection = this.collection.concat(data);
      } else {
        this.collection.push(data);
      }
    }

    Collection.prototype.get = function () {
      return this.collection;
    }

    return Collection;
  })();

}(window.DemacFactory = window.DemacFactory || {}, jQuery));