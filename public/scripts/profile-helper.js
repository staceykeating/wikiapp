const createMap = function(maps, container) {
  for (const map of maps) {
    initialize(map, container);
  }
};

const loadFavoriteMaps = function() {
  $.getJSON('/my-favorites')
  .then(function(maps) {
    console.log(maps);
    createMap(maps, 'my-favorites-container');
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

$(document).ready(() => {
  loadFavoriteMaps();
  loadMyMaps();
  loadMyContributions();
});


