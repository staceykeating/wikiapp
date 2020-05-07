const express = require('express');
const router  = express.Router();



module.exports = (db) => {


  router.get("/", (req, res) => {
    // Hardcoded user_id as there is no authentication process
    req.session.user_id = 3;
    const user_id = req.session.user_id;
    db.getUserById(user_id)
      .then(user => {
        const templateVars = {
          userName: user.name
        }
        res.render("index", templateVars);
      });
  });

  router.get('/maps', (req, res) => {
    db.getAllMapsInDatabase()
      .then(maps => {
        let arr = [];
        for (const map of maps) {
          arr.push(db.getMarkersForMap(map.id));
        }
        Promise.all(arr).then((values) => {
          for (let i = 0; i < values.length; i++) {
            maps[i]['markers'] = values[i];
          }
          res.json(maps);
        })
      })
  });



  router.get('/profile', (req, res) => {
    const user_id = req.session.user_id;
    db.getUserById(user_id)
      .then(user => {
        const templateVars = {
          userName: user.name
        }
        res.render("profile", templateVars);
      });
  })

  router.get('/my-favorites', (req, res) => {
    const user_id = req.session.user_id;
    db.getAllUserFavoriteMaps(user_id)
      .then(maps => {
        let arr = [];
        for (const map of maps) {
          arr.push(db.getMarkersForMap(map.id));
        }
        Promise.all(arr).then((values) => {
          for (let i = 0; i < values.length; i++) {
            maps[i]['markers'] = values[i];
          }
          res.json(maps);
        })
      });
  })
  router.get('/my-maps', (req, res) => {
    const user_id = req.session.user_id;
    db.getAllUserMaps(user_id)
      .then(maps => {
        let arr = [];
        for (const map of maps) {
          arr.push(db.getMarkersForMap(map.id));
        }
        Promise.all(arr).then((values) => {
          for (let i = 0; i < values.length; i++) {
            maps[i]['markers'] = values[i];
          }
          res.json(maps);
        })
      })
  })
  router.get('/my-contributions', (req, res) => {
    const user_id = req.session.user_id;
    db.getAllUserMarkers(user_id)
      .then(maps => {
        let arr = [];
        for (const map of maps) {
          arr.push(db.getMarkersForMap(map.id));
        }
        Promise.all(arr).then((values) => {
          for (let i = 0; i < values.length; i++) {
            maps[i]['markers'] = values[i];
          }
          res.json(maps);
        })
      })

  })

  router.get('/create', (req, res) => {
    const user_id = req.session.user_id;
    db.getUserById(user_id)
      .then(user => {
        const templateVars = {
          userName: user.name
        }
        res.render("create", templateVars);
      });
  })

  router.post('/create', (req, res) => {
    const creator_id = req.session.user_id;
    db.addMap(req.body.title, req.body.description, creator_id)
    .then(map => {
      res.redirect(`/map_show/${map.id}`);
    });
  });

  router.post('/:map_id/edit', (req, res) => {
    const map_id = req.params.map_id;
    res.redirect(`/map_show/${map_id}`,)
  });

  router.get('/map_show/:map_id', (req, res) => {
    const map_id = req.params.map_id;

    db.getMapById(map_id)
    .then(map => {
      db.getMarkersForMap(map.id)
        .then(markers => {
          map['markers'] = markers;
          const user_id = req.session.user_id;
          db.getUserById(user_id)
            .then(user => {
              const templateVars = {
                userName: user.name,
                mapJson: map
              }
              res.render('edits', templateVars);
            });
        })
      })
    })



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
      console.log(marker);
      db.addMarker(marker)
      .then(() => {
        res.redirect(`/map_show/${map_id}`);
      });
    });

    router.post('/map_show/:map_id/DELETE', (req, res) => {
      console.log(typeof req.body.marker_id)
      db.deleteMarker(req.body.marker_id).then(() => {
        res.redirect(`/map_show/${req.params.map_id}`);
      });
    });

  return router;
};

