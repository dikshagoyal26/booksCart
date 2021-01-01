var connection = require("../connection");
const Schema = connection.Schema;
const WishlistSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    ref: "Users",
  },
  books: [
    {
      type: String,
      ref: "Books",
      unique: true,
    },
  ],
});
const WishlistModel = connection.model("wishlist", WishlistSchema);
module.exports = WishlistModel;
