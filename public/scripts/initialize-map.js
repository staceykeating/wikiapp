
let _map;
const initialize = function(map) {
    // creates a class for this particular map
    const newDiv = `map_${map.id}`;
    // appends a new div with the newDiv class for this particular map to live
    $(`#maps_container`).append(`<h1>${map.title}<h1> <div class="maps ${newDiv}"></div>`);
    // creates an instance of a map
    _map = new google.maps.Map($(`.${newDiv}`)[0], {
      center: {lat: 49.2827, lng: -123.1207}, // all maps are of vancouver
      zoom: 12,
      disableDefaultUI: true
    });

    const markers = [
      {map_id: 3, title: 'tacofino', latitude:49.279762, longitude: -123.115518},
      {map_id: 3, title: 'mcdonalds', latitude:49.2728373, longitude: -123.119373}
    ];
    
    for (const marker of markers) {
      // Initialize info window and insert content as html
      let infowindow = new google.maps.InfoWindow({
        content: `<h4>${marker.title}</h4>`
      });
      // create marker
      let _marker = new google.maps.Marker({
        position: {lat: marker.latitude, lng: marker.longitude},
        title: marker.title,
        map: _map
      });
      // assign click event listener to marker ofr info window
      _marker.addListener('click',() => {
        infowindow.open(_map, _marker)
      });
    }
};