const mongoose = require("mongoose");

const MONGOURI =
  "mongodb://Avinash:z61hsJTo1fDL4Qao@cluster0-shard-00-00.czohr.mongodb.net:27017,cluster0-shard-00-01.czohr.mongodb.net:27017,cluster0-shard-00-02.czohr.mongodb.net:27017/spiceDatabase?ssl=true&replicaSet=atlas-p5bu98-shard-0&authSource=admin&retryWrites=true&w=majority";
//   "mongodb+srv://Avinash:z61hsJTo1fDL4Qao@cluster0.czohr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// z61hsJTo1fDL4Qao
module.exports = () => {
  mongoose
    .connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection sucessful");
    })
    .catch((e) => {
      console.log(e);
    });
};
