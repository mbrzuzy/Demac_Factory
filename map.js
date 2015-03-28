/**
 * map.js
 * Author: mbrzuzy
 *
 * v1.1.0
 *
 * Changes:
 * v1.1.0: DemacFactory.Map.BoundsChanged is passed in an array of stores instead of array of store ids - mbrzuzy
 */

;(function(DemacFactory, $, undefined) {
  'use strict';

  DemacFactory.Map = (function () {
    function Map() {
      this.loaded  = false;
      this.markers = [];

      this.google = {
        api: 'http://maps.googleapis.com/maps/api/js?v=3.16&sensor=false',
        map: undefined,
        centerLatLng: undefined,
        mapOptions: {
          zoom: 8,
          disableDefaultUI: true
        }
      }

      this.options = {
        apiCallback: undefined,
        inline: true,
        mapCanvas: 'map_canvas',
        useGeoLoc: false,
        center: { lat: '', lng: '' },
        afterLoad: function () {}
      }
    }

    Map.prototype.init = function (args) {
      if (args && typeof args === 'object') {
        this.options = $.extend(this.options, args);
      }

      if (!this.loaded) {
        this.loadScript();
      }
    }

    Map.prototype.loadScript = function () {
      var url = this.google.api;

      if (typeof this.options.apiCallback !== 'undefined') {
        url += '&callback=' + this.options.apiCallback;
      }

      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      document.body.appendChild(script);
    }

    Map.prototype.callback = function () {
      this.loaded = true;

      if (typeof this.options.afterLoad === 'function') {
        this.options.afterLoad(this);
      }

      if (this.options.inline) {
        this.show();
      }
    }

    Map.prototype.show = function (forceReload) {
      if (typeof this.google.map === 'undefined' || forceReload === true) {
        this.google.map = new google.maps.Map(document.getElementById(this.options.mapCanvas), this.google.mapOptions);
      }

      if (typeof this.google.infoWindow === 'undefined') {
        this.google.infoWindow = new google.maps.InfoWindow();
      }

      this.resize();
      this.setCenter();

      if (typeof this.Collection !== 'undefined' && (!this.Collection.loaded || forceReload === true)) {
        var self = this;
        var items = this.Collection.get();
        this.markers = [];

        for (var i in items) {
          var latLng =  new google.maps.LatLng(items[i].lat, items[i].long);
          this.markers[i] = new google.maps.Marker({ position: latLng, icon: '', map: this.google.map, store: items[i] });
          google.maps.event.addListener(this.markers[i], 'click', function () {
            self.openInfoWindow(this);
          });
        }

        if (typeof DemacFactory.Debounce === 'function') {
          google.maps.event.addListener(this.google.map, 'bounds_changed', DemacFactory.Debounce(function () {
            var storesInBounds = [];
            for (var i in self.markers) {
              if (self.google.map.getBounds().contains(self.markers[i].getPosition())) {
                storesInBounds.push(self.markers[i].store);
              }
            }
            $(window).trigger('DemacFactory.Map.BoundsChanged', [storesInBounds]);
          }, 500));
        }

        google.maps.event.trigger(this.google.map, 'bounds_changed');

        this.Collection.loaded = true;
      }
    }

    Map.prototype.resize = function () {
      google.maps.event.trigger(this.google.map, 'resize');
    }

    Map.prototype.setCenter = function () {
      if (typeof this.google.map.centerLatLng === 'undefined') {
        if (this.options.center.lat !== '' && this.options.center.lng !== '') {
          this.google.map.centerLatLng = new google.maps.LatLng(this.options.center.lat, this.options.center.lng);
        }
      }

      if (typeof this.google.map.centerLatLng !== 'undefined') {
        this.google.map.setCenter(this.google.map.centerLatLng);
      }
    }

    Map.prototype.openInfoWindow = function (marker) {
      var content = marker.store.name;

      this.google.infoWindow.setContent(content);
      this.google.infoWindow.open(this.google.map, marker);
    }

    return Map;
  })();

}(window.DemacFactory = window.DemacFactory || {}, jQuery));