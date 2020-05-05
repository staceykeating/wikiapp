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

$(document).ready(function() {
  const favouriteMap = function() {}
  $(".fas fa-heart").click(function() {
    let clicked = $(this).attr('user_id');
    if(clicked === true){
      $(this).find('.fas fa-heart').val(clicked).css('color', '#FF0000');
   } else {
    $(this).find('.fas fa-heart').val(clicked).css('color', '#000');
   }
  });
});
//  $("fas fa-edit").click(function () {
//    let clicked = $(this).attr('map_id');
//    if (clicked === true){

//    }

