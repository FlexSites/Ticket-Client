const monk = require("monk");

// Connection URL
const url = process.env.MONGO_URL;

if (!url) {
  throw new Error("Missing `MONGO_URL` environment variable");
}

module.exports = monk(url);
