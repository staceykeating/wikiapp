const express = require('express');
const router  = express.Router();

module.exports = (db) => {
// Home page
  router.get("/", (req, res) => {
    req.session.user_id = 3; // Hardcoded user_id as there is no authentication process
    const user_id = req.session.user_id;
    db.getUserById(user_id)
      .then(user => {
        const templateVars = {
          currentUser: user
        }
        res.render("index", templateVars);
      });
  });
// Loads all maps for homepage
  router.get('/maps', (req, res) => {
    const user_id = req.session.user_id;
    db.getAllMapsInDatabase(user_id)
      .then(maps => {
        let arrMarkers = [];
        for (const map of maps) {
          arrMarkers.push(db.getMarkersForMap(map.id));
        }
        Promise.all(arrMarkers).then((values) => {
          for (let i = 0; i < values.length; i++) {
            maps[i]['markers'] = values[i];
          }
          res.json(maps);
        })
      })
  });
// User profile
  router.get('/profile', (req, res) => {
    const user_id = req.session.user_id;
    db.getUserById(user_id)
      .then(user => {
        const templateVars = {
          currentUser: user
        }
        res.render("profile", templateVars);
      });
  })
// Loads all favorited maps for profile page
  router.get('/my-favorites', (req, res) => {
    const user_id = req.session.user_id;
    db.getAllUserFavoriteMaps(user_id)
      .then(maps => {
        let arr = [];
        for (const map of maps) {
          arr.push(db.getMarkersForMap(map.id));
        }
        // Adds a markers property to each map
        Promise.all(arr).then((values) => { 
          for (let i = 0; i < values.length; i++) {
            maps[i]['markers'] = values[i]; 
          }
          res.json(maps);
        })
      });
  })
// Loads all user created maps for profile page
  router.get('/my-maps', (req, res) => {
    const user_id = req.session.user_id;
    db.getAllUserMaps(user_id)
      .then(maps => {
        let arr = [];
        for (const map of maps) {
          arr.push(db.getMarkersForMap(map.id));
        }
        // Adds a markers property to each map
        Promise.all(arr).then((values) => {
          for (let i = 0; i < values.length; i++) {
            maps[i]['markers'] = values[i];
          }
          res.json(maps);
        })
      })
  })
// Loads all maps a user has contributed to for profile page
  router.get('/my-contributions', (req, res) => {
    const user_id = req.session.user_id;
    db.getAllUserMarkers(user_id)
      .then(maps => {
        let arr = [];
        for (const map of maps) {
          arr.push(db.getMarkersForMap(map.id));
        }
        // Adds a markers property to each map
        Promise.all(arr).then((values) => {
          for (let i = 0; i < values.length; i++) {
            maps[i]['markers'] = values[i];
          }
          res.json(maps);
        })
      })

  })
// Create map page
  router.get('/create', (req, res) => {
    const user_id = req.session.user_id;
    db.getUserById(user_id)
      .then(user => {
        const templateVars = {
          currentUser: user
        }
        res.render("create", templateVars);
      });
  })
// Creates map in database
  router.post('/create', (req, res) => {
    const creator_id = req.session.user_id;
    db.addMap(req.body.title, req.body.description, creator_id)
    .then(map => {
      res.redirect(`/map_show/${map.id}`);
    });
  });
// Directs user to edit page when icon on a map is clicked
  router.post('/:map_id/edit', (req, res) => {
    const map_id = req.params.map_id;
    res.redirect(`/map_show/${map_id}`,)
  });
// Adds map to users favorites when favorite button is clicked
  router.post('/:map_id/favorites', (req, res) => {
    const user_id = req.session.user_id;
    const map_id = req.params.map_id;
    db.checkFavorite(user_id, map_id)
      .then(fav => {
        // Checks whether or not the user has the map favorited
        if (fav.length > 0) {
          db.removeFavorite(user_id, map_id);
          res.status(201);
        } else {
          db.addFavorite(user_id, map_id);
          res.status(201);
        }
      })
  })
// Edit page for a particular map
  router.get('/map_show/:map_id', (req, res) => {
    const map_id = req.params.map_id;
    db.getMapById(map_id)
    .then(map => {
      // adds markers property to map 
      db.getMarkersForMap(map.id)
        .then(markers => {
          map['markers'] = markers;
          const user_id = req.session.user_id;
          db.getUserById(user_id)
            .then(user => {
              const templateVars = {
                currentUser: user,
                mapJson: map
              }
              res.render('edits', templateVars);
            });
        })
      })
    })
// Creates new marker in database from edit page
  router.post('/map_show/:map_id', (req, res) => {
    const map_id = req.params.map_id;
    const marker = {
      marker_title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      longitude: req.body.lng,
      latitude: req.body.lat,
      map_id: req.params.map_id,
      creator_id: req.session.user_id
    }
    db.addMarker(marker)
    .then(() => {
      res.redirect(`/map_show/${map_id}`);
    });
  });
// Deletes a marker from database from the edit page
  router.post('/map_show/:map_id/DELETE/marker', (req, res) => {
    db.deleteMarker(req.body.marker_id).then(() => {
      res.redirect(`/map_show/${req.params.map_id}`);
    });
  });
// Deletes a map from the database from the edit page
  router.post('/map_show/:map_id/DELETE', (req, res) => {
    const map_id = req.params.map_id;
    db.deleteMap(map_id)
    .then(() => {
      res.redirect('/profile');
    });
  });

  return router;
};

