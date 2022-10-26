const express = require('express');

const itemRoutes = express.Router();

const dbo = require('../database/connection');
const ObjectId = require('mongodb').ObjectId;

// This section will help you get a list of all the records.
itemRoutes.route('/getItems').get((req, res) => {
  const db_connect = dbo.getDatabase();
  db_connect
    .collection('items')
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
itemRoutes.route('/getItem/:id').get((req, res) => {
  const db_connect = dbo.getDatabase();
  const query = { _id: ObjectId(req.params.id) };
  db_connect.collection('items').findOne(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new record.
itemRoutes.route('/addItem').post((req, response) => {
  const db_connect = dbo.getDatabase();
  const newItem = {
    _id: req.body.id,
    name: req.body.name,
    displayName: req.body.displayName,
    quality: req.body.quality,
    type: req.body.type,
    expansion: req.body.expansion,
    sellPrice: {
      copper: req.body.sellPriceCopper,
      silver: req.body.sellPriceSilver,
      gold: req.body.sellPriceGold,
    },
    wowheadIcon: req.body.wowheadIcon,
  };

  db_connect.collection('items').insertOne(newItem, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
itemRoutes.route('/updateItem/:id').post((req, response) => {
  const db_connect = dbo.getDatabase();
  const query = { _id: ObjectId(req.params.id) };
  const updatedItem = {
    $set: {
      name: req.body.name,
      displayName: req.body.displayName,
      quality: req.body.quality,
      type: req.body.type,
      expansion: req.body.expansion,
      sellPrice: {
        copper: req.body.sellPriceCopper,
        silver: req.body.sellPriceSilver,
        gold: req.body.sellPriceGold,
      },
      wowheadIcon: req.body.wowheadIcon,
    },
  };

  db_connect.collection('items').updateOne(query, updatedItem, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you delete a record
itemRoutes.route('/deleteItem/:id').delete((req, response) => {
  const db_connect = dbo.getDatabase();
  const query = { _id: ObjectId(req.params.id) };

  db_connect.collection('items').deleteOne(query, (err, obj) => {
    if (err) throw err;
    response.json(obj);
  });
});

module.exports = itemRoutes;
