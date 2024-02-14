const mongoose = require("mongoose");

exports.connectDatabase = () => {
  mongoose
    .connect(`mongodb://127.0.0.1:27017/SocialMedia`)
    .then((con) => console.log(`Database Connected: ${con.connection.host}`))
    .catch((err) => console.log(err));
};

// const mongoose = require("mongoose");

// exports.connectDatabase = async () => {
//   try {
//     const con = await mongoose.connect("mongodb://127.0.0.1:27017/SocialMedia");
//     console.log(`Database Connected: ${con.connection.host}`);
//   } catch (err) {
//     console.error(err);
//   }
// };

