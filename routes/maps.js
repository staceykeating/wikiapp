const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query('SELECT * FROM favorites;')
    .then(res => {
      console.log(res.rows[0])
    })
    .catch((e) => {
      console.log(e);
    });

    res.render("index");
  });

  router.get('/maps', (req, res) => {
    res.render("edits");
  });

  router.get('/profile', (req, res) => {
    res.render("profile")
  })

  router.get('/create', (req, res) => {
    res.render("create")
  })
  
  

  // router.put("/:map_id", (req, res) => {
  //   let query = `SELECT * FROM maps WHERE id = $1`;
  //   console.log(req.get('map_id'));

  //   let map = db.query(query, [req.get('map_id')])
  //     .then(data => {
  //       const maps = data.rows;
  //       res.json({ maps });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  //     // i want to search map api, get result and save that result into my markers database
  // });

  // router.post('/search', (req, res) => {
  //   let searchValues = req.get('q');
  // });
  return router;
};
