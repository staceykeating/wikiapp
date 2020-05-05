const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("index");
  });

  router.get('/maps', (req, res) => {
    db.getAllMapsInDatabase()
      .then(maps => {
      res.json(maps);
      });
  });

  router.get(':mapid/markers', (req, res) => {
    db.getMarkersForMap(map)
    .then(markers => {
      res.json(markers);
    });
  });

  router.get('/profile', (req, res) => {
    res.render("profile")
  })

  router.get('/create', (req, res) => {
    res.render("create")
  })

  router.get('/edits', (req, res) => {
    res.render("edits")
  })

  return router;
};
