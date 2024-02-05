const express = require('express');
const routes = express.Router();
const add = require('./controller');

routes.post("/add-details",add.addmethod);

routes.get("/get-details",add.getmethod);

routes.put("/update-comment/:id",add.updatemethod);

module.exports = routes;