
const allowOrigins = require('./allowOrigins')
const corsOperations = {
  origin: (origin, callback) => {
    if (allowOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allow"));
    }
  },
  optionSucessStatus: 200,
};

module.exports = corsOperations;