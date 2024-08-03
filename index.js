const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./app/utilities/db/mongoose-client');
const router = express.Router();
const applyRoutes = require('./app/routes/index-route');

app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '50mb' }));

app.get('/api/health-check', (req, res) => {
  res.send('Server is up and running');
});

app.use('/api', applyRoutes.routes(router));

app.use(function (err, req, res, next) {
  logger.error(err);
  // console.log(err);
  if (err.response) {
    return res
      .status(err.response?.status)
      .send(err.response?.data);
  }
  return res
    .status(500)
    .send(
      'Internal Server Error. Please contact Administrator'
    );
});

// const db = require('./app/models');
// const Role = db.role;

// db.sequelize.sync();

// function initial() {
//   Role.create({
//     id: 1,
//     name: 'user',
//   });

//   Role.create({
//     id: 2,
//     name: 'auditor',
//   });

//   Role.create({
//     id: 3,
//     name: 'moderator',
//   });
//   Role.create({
//     id: 4,
//     name: 'admin',
//   });
//   Role.create({
//     id: 5,
//     name: 'super_admin',
//   });
// }
// require('./app/routes/user.routes')(app);
// require('./app/routes/auth.routes')(app);
// require('./app/routes/customer.routes')(app);

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to MDM application.' });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
