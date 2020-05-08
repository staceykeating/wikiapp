let _map;

const initialize = function(map, container) {
  // creates a class for this particular map
  const newDiv = `map_${map.id}`;
  // checks if the map was favorited by the signed in user
  let favStatus = '';
  if (Number(map.liked) > 0) {
    favStatus = 'liked';
  } else {
    favStatus = 'unliked';
  }
  // Template html for each map
  const newMapTemplate= `
  <div class="column"> <div class="maps ${newDiv}"></div>
    <div class="icon">
      <h2>${map.map_title}</h2>
      <div class="row">
        <button id="fav-${newDiv}" type="submit" i class="${favStatus} fas fa-heart"></i></button>
        <form method="POST" action="${map.id}/edit">
          <button type="submit" i class="fas fa-edit"></i></button>
        </form>
      </div>
    </div>
  </div>`;

  // appends the template with the newDiv class for this particular map
  $(`.${container}`).append(newMapTemplate);
  // Google maps API loads map into our implemented template 
  _map = new google.maps.Map($(`.${newDiv}`)[0], {
    center: {lat: 49.2827, lng: -123.1207}, // all maps are of vancouver
    zoom: 12,
    disableDefaultUI: true
  });
  
  // Initialize markers
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
    // assign click event listener to marker for info window
    _marker.addListener('click',() => {
      infowindow.open(_map, _marker)
    });
  }
  
  // Toggles class for favorited status and changes the weight of the heart icon
  $(`#fav-${newDiv}`).click(function() {
    if (favStatus === 'liked') {
      $(`#fav-${newDiv}`).removeClass('liked').addClass('unliked');
    } else {
      $(`#fav-${newDiv}`).removeClass('unliked').addClass('liked');
    }
    $.post(`/${map.id}/favorites`)
      .done((data) => {
        console.log(data);
      });
  });

  // Initializes a search bar only for the edit page
  if (container === 'mapbox') {
    // Create the search box and link it to the UI element.
    let input = /** @type {HTMLInputElement} */(
    document.getElementById('pac-input'));

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
      // Clears markers when search is changed
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
        // Retrieves marker info from search and sets value to hidden input tag
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
