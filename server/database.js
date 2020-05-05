// load .env data into process.env
//require('dotenv').config();

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

//all info about markers on a map
const getMarkersForMap = function(map) {
  return db.query(`
  SELECT * FROM markers
  WHERE map_id = $1;
  `, [map])

  .then(res => res.rows)
  .catch(error => (error));
}
  exports.getMarkersForMap = getMarkersForMap;

//gets the favourite maps for one user
  const getAllUserFavouriteMaps = function(user_id) {
    return db.query(`
    SELECT maps.* FROM favorites
    JOIN users ON favorites.user_id = users.id
    JOIN maps ON favorites.map_id = maps.id
    WHERE users.id = $1;
    `, [user_id])
//returns multiple maps
    .then(res => (res.rows))
    .catch(error => (error));
  }
  exports.getAllUserFavouriteMaps = getAllUserFavouriteMaps;

// get all maps that belong to a user
  const getAllUserMaps = function(user) {
    return db.query(`
    SELECT * FROM maps
    JOIN users ON users.id = maps.creator_id
    WHERE users.id = $1;
    `, [user])
//returns multiple maps
    .then(res => (res.rows))
    .catch(error => (error));
  }
  exports.getAllUserMaps = getAllUserMaps;

// all markers for one user on their respective maps
 const getAllUserMarkers = function(user) {
    return db.query(`
    SELECT * FROM markers
    JOIN users ON users.id = markers.creator_id
    JOIN maps ON maps.id = map_id
    WHERE users.id = $1
    `, [user])

//returns multiple maps
    .then(res => (res.rows))
    .catch(error => (error));
  }
  exports.getAllUserMarkers = getAllUserMarkers;

const getAllMapsInDatabase = function() {
  return db.query(`
  SELECT * FROM maps;
  `,)
//returns multiple maps
    .then(res => (res.rows))
    .catch(error => (error));
  }
exports.getAllMapsInDatabase = getAllMapsInDatabase;


  //add new marker to database
  const addMarker =  function(marker) {
    return db.query(`INSERT INTO markers
    (title, description, image, longitude, latitude, map_id, creator_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [marker.title, marker.description, marker.image, marker.longitude, marker.latitude, marker.map_id, marker.creator_id])
    .then(res => (res.rows[0]))
    .catch(error => (error));
  }
  exports.addMarker = addMarker;

//add new map to database
  const addMap =  function(map) {
    return db.query(`INSERT INTO maps
    (title, creator_id, description, zoom) VALUES($1, $2, $3, $4) RETURNING *`,
    [map.title, map.creator_id, map.description, map.zoom])
    .then(res => (res.rows[0]))
    .catch(error => (error));
  }
  exports.addMap = addMap;

