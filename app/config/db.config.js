module.exports = {
  HOST: 'localhost',
  USER: 'postgres',
  PASSWORD: 'Mohib123@',
  DB: 'MDM',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
