

const connection = require("mongoose").connect(
  `mongodb+srv://soniasaini:soniasaini@cluster0.neg6vl9.mongodb.net/training?retryWrites=true&w=majority`
);
module.exports = connection;
