const createMap = function(maps, container) {
  for (const map of maps) {
    initialize(map, container);
  }
};

const loadMaps = function() {
  $.getJSON('/maps')
  .then(function(maps) {
    createMap(maps, 'home-container');
  })
}

$(document).ready(() => {
  loadMaps();
});


