const knex = require('knex');
const {dbEnv} = require('../config/environment');

const config = require('../knexfile');

const environment = process.env.DB_ENV || 'development';

const db = knex(config[environment]);

module.exports = db;