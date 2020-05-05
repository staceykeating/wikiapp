// $(".fas fa-heart").click(function() {
//   let clicked = $(this).attr('user_id');
//   if(clicked === true){

const loadMaps = function() {
  $.getJSON('/map_show')
  .then(function(map) {
    initialize(map, 'home-container');
  })
}

loadMaps();
