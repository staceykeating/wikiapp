const createMap = function(maps) {
  for (const map of maps) {
    initialize(map);
    console.log(map);
  }
};

const loadMaps = function() {
  $.getJSON('/maps')
  .then(function(maps) {
    createMap(maps);
  })
}
loadMaps();