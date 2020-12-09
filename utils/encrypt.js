const bcrypt = require("bcrypt");

const encryptOperations = {
  saltRounds: 12,
  encryptPassword(textPassword) {
    return bcrypt.hashSync(textPassword, this.saltRounds);
  },
  comparePassword(textPassword, encryptedPassword) {
    return bcrypt.compareSync(textPassword, encryptedPassword);
  },
};
module.exports = encryptOperations;
