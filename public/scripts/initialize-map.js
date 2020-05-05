let _map;
const initialize = function(map, container) {
    // creates a class for this particular map
    const newDiv = `map_${map.id}`;
    const newMapTemplate= `<h2>${map.map_title}</h2> <div class="maps ${newDiv}"></div>
    <div class="icon">
      <form method="POST" action="/create"><button type="submit" i class="fas fa-heart"></i></button></form>
      <form method="POST" action="/edit"><button type="submit" i class="fas fa-edit"></i></button></form></div>`;


    // appends a new div with the newDiv class for this particular map to live
    $(`.${container}`).append(newMapTemplate);
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
