const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
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

  router.get('/create', (req, res) => {
    res.render("create")
  })

  router.get('/edits', (req, res) => {
    res.render("edits")
  })

  return router;
};
