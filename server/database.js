// load .env data into process.env
//require('dotenv').config();

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

//all info about markers on a map

const getUserById = function(user_id) {
  return db.query(`
  SELECT * FROM users
  WHERE id = $1;
  `, [user_id])

  .then(res => res.rows[0])
  .catch(error => error);
}
  exports.getUserById = getUserById;

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
  const getAllUserFavoriteMaps = function(user_id) {
    return db.query(`
    SELECT maps.*, COUNT(favorites) AS liked FROM maps
    JOIN favorites ON map_id = maps.id
    WHERE favorites.user_id = $1
    GROUP BY maps.id
    ORDER by maps.id;
    `, [user_id])
//returns multiple maps
    .then(res => (res.rows))
    .catch(error => (error));
  }
  exports.getAllUserFavoriteMaps = getAllUserFavoriteMaps;

// get all maps that belong to a user
  const getAllUserMaps = function(user_id) {
    return db.query(`
    SELECT maps.*, COUNT(favorite) AS liked FROM maps
    JOIN users ON users.id = maps.creator_id
    LEFT JOIN (SELECT * FROM favorites WHERE user_id = $1) AS favorite ON map_id = maps.id
    WHERE users.id = $1
    GROUP BY maps.id
    ORDER BY maps.id;
    `, [user_id])
//returns multiple maps
    .then(res => (res.rows))
    .catch(error => (error));
  }
  exports.getAllUserMaps = getAllUserMaps;

// all markers for one user on their respective maps
 const getAllUserMarkers = function(user_id) {
    return db.query(`
    SELECT maps.id, maps.map_title, maps.description, COUNT(favorite) AS liked
    FROM maps
    LEFT JOIN (SELECT * FROM favorites WHERE user_id = $1) AS favorite ON map_id = maps.id
    JOIN markers ON markers.map_id = maps.id
    WHERE markers.creator_id = $1 AND maps.creator_id != $1
    GROUP BY maps.id;
    `, [user_id])

//returns multiple maps
    .then(res => (res.rows))
    .catch(error => (error));
  }
  exports.getAllUserMarkers = getAllUserMarkers;

const getAllMapsInDatabase = function(user_id) {
  return db.query(`
  SELECT maps.*, COUNT(favorite) AS liked FROM maps
  LEFT JOIN (SELECT * FROM favorites WHERE user_id = $1) AS favorite  ON map_id = maps.id
  GROUP BY maps.id ORDER BY maps.id;
  `,[user_id])
//returns multiple maps
    .then(res => (res.rows))
    .catch(error => (error));
  }
exports.getAllMapsInDatabase = getAllMapsInDatabase;


  //add new marker to database
  const addMarker =  function(marker) {
    return db.query(`INSERT INTO markers
    (marker_title, description, image_url, longitude, latitude, map_id, creator_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
    [marker.marker_title, marker.description, marker.image_url, marker.longitude, marker.latitude, marker.map_id, marker.creator_id])
    .then(res => (res.rows))
    .catch(error => (error));
  }
  exports.addMarker = addMarker;

//add new map to database
  const addMap =  function(title, description, creator_id) {
    return db.query(`INSERT INTO maps
    (map_title, creator_id, description, zoom) VALUES($1, $2, $3, $4) RETURNING *;`,
    [title, creator_id, description, 12])
    .then(res => (res.rows[0]))
    .catch(error => (error));
  }
  exports.addMap = addMap;
//returns map for map id
  const getMapById =  function(map_id) {
    return db.query(`
    SELECT * FROM maps WHERE id = $1;
    `,[map_id] )
    .then(res => (res.rows[0]))
    .catch(error => (error));
  }
  exports.getMapById = getMapById;

  const addFavorite = function(user_id, map_id) {
    return db.query(`INSERT INTO favorites
    (user_id, map_id) VALUES($1, $2) RETURNING *;`,
    [user_id, map_id])
    .then(res => (res.rows[0]))
    .catch(error => (error));
  }
  exports.addFavorite = addFavorite;

  const removeFavorite = function(user_id, map_id) {
    return db.query(`DELETE FROM favorites
    WHERE user_id = $1 AND map_id = $2;
    `, [user_id, map_id])
    .then(res => res.rows[0])
    .catch(error => error);
  }
  exports.removeFavorite = removeFavorite;

  const checkFavorite = function(user_id, map_id) {
    return db.query(`SELECT *
    FROM favorites
    WHERE user_id = $1 AND map_id = $2;
    `, [ user_id, map_id ])
    .then(res => res.rows)
    .catch(error => error)
  }
  exports.checkFavorite = checkFavorite;

  const deleteMap = function(map_id){
    return db.query(`DELETE FROM maps
    WHERE id = $1;`, [map_id])
    .then(res => (res.rows[0]))
    .catch(error => (error));
  }
  exports.deleteMap = deleteMap;
