const createMap = function(maps) {
  for (const map of maps) {
    initialize(map);
  }
};

const loadMaps = function() {
  $.getJSON('/maps')
  .then(function(maps) {
    createMap(maps);
  })
}

loadMaps();


