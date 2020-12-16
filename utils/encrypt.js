const bcrypt = require("bcrypt");

const encryptOperations = {
  // 2^salrounds will be processed to create a hash
  saltRounds: 10, // its the cost for processing the data 10 hashes/sec, for 8 its 40hashes/sec & for 12 its 2-3 hashes/sec
  encryptPassword(textPassword) {
    return bcrypt.hashSync(textPassword, this.saltRounds);
  },
  comparePassword(textPassword, encryptedPassword) {
    return bcrypt.compareSync(textPassword, encryptedPassword);
  },
};
module.exports = encryptOperations;
