'use strict'

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'tictactoe';

module.exports = {
  saveState: (state) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, (err, client) => {
        if (err) {
          console.error("err get", err);
          return reject(err);
        }
        const db = client.db(dbName);
        const collection = db.collection('state');
        collection.findOneAndReplace(
          {status: {$in: ["Pause", "Resume"]}},
          state,
          {returnNewDocument: true, upsert: true},
          (err, result) => {
            if (err) {
              console.error("errsave", err);
              return reject(err);
            }
            resolve();
            client.close();
          }
        )
      });
    })
  },
  
  getState: () => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, (err, client) => {
        if (err) {
          return reject(err);
        }
        const db = client.db(dbName);
        const collection = db.collection('state');
        collection.findOne({status: {$in: ["Pause", "Resume"]}}, (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
          client.close();
        })
      });
    })
  }
}
