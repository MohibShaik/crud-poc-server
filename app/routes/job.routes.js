const jobController = require('../controllers/job.controller');
var express = require('express');
var router = express.Router();
const { verifySignUp } = require('../middleware');

const jobRoute = (router) => {
  router.post('/jobs/new', jobController.saveNewJob);
  router.post('/jobs', jobController.getAllJobs);

};

exports.jobRoute = jobRoute;
