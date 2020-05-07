$(document).ready(() => {
  initialize(mapJson, "mapbox");
})
$( ".createbox" ).hide();
$(".toggle").on("click", () => {
  $(".createbox").slideToggle("slow");
  $("#pac-input").focus();
});
