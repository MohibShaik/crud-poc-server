const mongoose = require('mongoose');
const decrypt = require('../decrypt/decrypt');
const config = require('../../config/auth.config');

mongoose.set('strictQuery', false);
console.log(config.connectionString);
mongoose.connect(config.connectionString, {
  // sslValidate: false,
  // ssl: true,
  // sslKey: config.mongoKeyPath,
  // user: config.mongoUser,
  // pass: decrypt.getPassword(),
  // authSource: config.authSource,
});

// var mongoDB = mongoose.connection;

mongoose.connection.on('connected', function () {
  console.log('Connected to db');
});

mongoose.connection.on('error', function (err) {
  console.log(
    'Mongoose default connection has occured ' +
      err +
      ' error'
  );
});

mongoose.connection.on('disconnected', function () {
  console.log(
    'Mongoose default connection is disconnected'
  );
});

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log(
      'Mongoose default connection is disconnected due to application termination'
    );
    process.exit(0);
  });
});
