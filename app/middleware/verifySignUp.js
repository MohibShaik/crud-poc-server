const userModel = require('../models/user.model');

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  userModel
    .findOne({
      where: {
        username: req.body.username,
      },
    })
    .then((user) => {
      if (user) {
        res.status(400).send({
          message: 'Failed! Username is already in use!',
        });
        return;
      }

      // Email
      userModel
        .findOne({
          where: {
            email: req.body.email,
          },
        })
        .then((user) => {
          if (user) {
            res.status(400).send({
              message: 'Failed! Email is already in use!',
            });
            return;
          }

          next();
        });
    });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail:
    checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
