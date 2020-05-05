const createMap = function(maps, class) {
  for (const map of maps) {
    initialize(map, class);
  }
};

const loadFavoriteMaps = function() {
  $.getJSON('/my-favorites')
  .then(function(maps) {
    createMap(maps, 'favorites-container');
  })
};

const loadMyMaps = function() {
  $.getJSON('/my-maps')
  .then(function(maps) {
    createMap(maps, 'my-maps-container');
  })
};

const loadMyContributions = function() {
  $.getJSON('/my-contributions')
  .then(function(maps) {
    createMap(maps, 'my-contributions-container');
  })
}

loadFavoriteMaps();
loadMyMaps();
loadMyContributions();
