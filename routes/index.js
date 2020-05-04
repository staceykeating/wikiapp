const express = require('express');
const router  = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("index");
  });

  router.get('/maps', (req, res) => {
    const maps = [
      {id: 1, title: 'Breweries'},
      {id: 2, title: 'Cakes'},
      {id: 3, title: 'Party Supplies'}
    ];
    //database.getAllMaps();
    res.json(maps);
  });

  router.get('/profile', (req, res) => {
    res.render("profile")
  })

  router.get('/create', (req, res) => {
    res.render("create")
  })
 
  return router;
};
