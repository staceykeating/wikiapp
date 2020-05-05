let _map;
const initialize = function(map) {
    // creates a class for this particular map
    const newDiv = `map_${map.id}`;
    // appends a new div with the newDiv class for this particular map to live
    $(`#maps_container`).append(`<h1>${map.map_title}<h1> <div class="maps ${newDiv}"></div>`);
    // creates an instance of a map
    _map = new google.maps.Map($(`.${newDiv}`)[0], {
      center: {lat: 49.2827, lng: -123.1207}, // all maps are of vancouver
      zoom: 12,
      disableDefaultUI: true
    });


    const markers = map.markers;

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
};