
Demac Factory
========

#### collection.js v1.1.0
#### map.js v1.1.0
#### template.js v0.1.0
#### debounce.js - From underscore.js

#### Options

Option | Type | Default | Description
------ | ---- | ------- | -----------
apiCallback | String | undefined | You will need to specify this value if you're loading the google api script dynamically.
inline | boolean | true | If set to true, the script will autoinialiaze the google map.  Setting this to false is useful for when your map is on a modal.
mapCanvas | string | 'map_canvas' | The ID of your element that will hold the map.
center | object | { lat: '', lng: '' } | Where map should center to.

### Usage

```html
<script src="js/debounce.js"></script>
<script src="js/collection.js"></script>
<script src="js/map.js"></script>
```

```html
<script>
	window.Demac = window.Demac || {};
    Demac.StoreLocator = new DemacFactory.Map();
    Demac.StoreLocator.Collection = new DemacFactory.Collection();
    Demac.StoreLocator.Collection.set([{"id":"1","name":"","address":"","zipcode":"","city":"","region_id":"","country_id":"","phone":"","fax":"","lat":"","long":"","location_id":"","store_id":""}]);

    Demac.StoreLocator.Collection.add([1, 2, 3]);
    Demac.StoreLocator.Collection.add(3);

    jQuery(document).ready(function($) {
        Demac.StoreLocator.init({
            apiCallback: 'Demac.StoreLocator.callback',
            inline: true,
            center: {
                lat: 0,
                lng: 0
            },
            afterLoad: function (context) {
                $('body').on('submit', '#findLocation', function (event) {
                    event.preventDefault();

                    geocoder = new google.maps.Geocoder();

                    geocoder.geocode({ address: $('#postal-code').val() }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            context.google.map.panTo(results[0].geometry.location);
                        }
                    });
                });
            }
        });

        $(window).on('DemacFactory.Map.BoundsChanged', function(event, data) {
            $('.store-location .store').hide();
            for (var i = 0; i < data.length; i++) {
                var store = $('#store-' + data[i]);
                if (store.length > 0) {
                    store.show();
                }
            }
        });
    }(jQuery));
</script>
```