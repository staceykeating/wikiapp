const express = require('express');
const router  = express.Router();



module.exports = (db) => {

  router.get("/", (req, res) => {
    req.session.user_id = 2;
    res.render("index");
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
    res.render("profile")
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
    res.render("create")
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
          res.render('edits',{ mapJson: map });
        })
      })
    })


  return router;
};

