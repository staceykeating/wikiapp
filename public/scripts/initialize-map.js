let _map;
let submitMarker;

const initialize = function(map, container) {
    // creates a class for this particular map
    const newDiv = `map_${map.id}`;
    const newMapTemplate= `
    <div class="column"> <div class="maps ${newDiv}"></div>
      <div class="icon">
        <h2>${map.map_title}</h2>
        <div class="row">
          <button id="fav-${newDiv}" type="submit" i class="fas fa-heart"></i></button>
          <form method="POST" action="${map.id}/edit">
            <button type="submit" i class="fas fa-edit"></i></button>
          </form>
        </div>
      </div>
    </div>`;


    // appends a new div with the newDiv class for this particular map to live
    $(`.${container}`).append(newMapTemplate);
    // creates an instance of a map

    _map = new google.maps.Map($(`.${newDiv}`)[0], {
      center: {lat: 49.2827, lng: -123.1207}, // all maps are of vancouver
      zoom: 12,
      disableDefaultUI: true
    });

    let markers = map.markers;

    for (const marker of markers) {

      // Initialize info window and insert content as html
      let infowindow = new google.maps.InfoWindow({
        content: `<h4>${marker.marker_title}</h4>`
      });
      // create marker
      let _marker = new google.maps.Marker({
        position: {lat: marker.latitude, lng: marker.longitude},
        title: marker.marker_title,
        map: _map
      });
      // assign click event listener to marker ofr info window
      _marker.addListener('click',() => {
        infowindow.open(_map, _marker)
      });
    }

    $(`#fav-${newDiv}`).click(function(event) {
      event.preventDefault();
      if ($(`#fav-${newDiv}`).css('font-weight') == 800) {
        $(`#fav-${newDiv}`).css('font-weight', 500);
        $.post(`${map.id}/favorites`)
        .done((data) => {
          console.log(data);
        });
      } else {
        $(`#fav-${newDiv}`).css('font-weight', 800);
        $.post(`${map.id}/remove-favorites`)
        .done((data) => {
          console.log(data);
        });
      }
    });

    if (container === 'mapbox') {

      // Create the search box and link it to the UI element.
      let input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
      //  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      let markers = [];
      let searchBox = new google.maps.places.SearchBox(
      /** @type {HTMLInputElement} */(input));

      // [START region_getplaces]
      // Listen for the event fired when the user selects an item from the
      // pick list. Retrieve the matching places for that item.
      google.maps.event.addListener(searchBox, 'places_changed', function () {
      let places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      for (let i = 0, marker; marker = markers[i]; i++) {
        marker.setMap(null);
      }
      markers = [];

      // For each place, get the icon, place name, and location.
      markers = [];
      let bounds = new google.maps.LatLngBounds();
      for (let i = 0, place; place = places[i]; i++) {

      // Create a marker for each place.
      let marker = new google.maps.Marker({
        map: _map,
        title: place.name,
        position: place.geometry.location
      });

      console.log(marker.position.lat());
      console.log(marker.position.lng());
      console.log(marker.title);

      $('#title').val(marker.title);
      $('#longitude').val(marker.position.lng());
      $('#latitude').val(marker.position.lat());

      markers.push(marker);

      bounds.extend(place.geometry.location);
      }

        _map.fitBounds(bounds);
      });
  // [END region_getplaces]

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
      google.maps.event.addListener(_map, 'bounds_changed', function () {
        let bounds = _map.getBounds();
        searchBox.setBounds(bounds);
      });
    }

    google.maps.event.addDomListener(window, 'load', initialize);


};
