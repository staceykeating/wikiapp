  const favouriteMap = function() {}

  $(".fas fa-heart").on("submit", function(id) {
    id.preventDefault();
    let data = $(this).data('submitter');
  });

  $(".fas fa-heart").click(function() {
    let clicked = $(this).attr('user_id');
    db.addFavorite()
    if(clicked === true){
      $(this).find('.icon').val(clicked).css('color', '#FF0000');
   } else {
    $(this).find('.icon').val(clicked).css('color', '#000');
   }
});

const addFavorite =  function(user_id, map_id) {
  return db.query(`INSERT INTO favorites
  (user_id, map_id) VALUES($1, $2) RETURNING *;`,
  [map_id, user_id])
  .then(res => (res.rows[0]))
  .catch(error => (error));
}
