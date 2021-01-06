const WishlistModel = require("../models/wishlist");

const wishlistOperations = {
  fetchWishlistedItems(user_id, response) {
    WishlistModel.findOne({ user_id })
      .populate("books")
      .exec(function (err, data) {
        if (err) response.status(500).send();
        else {
          console.log({ data });
          if (data) response.status(200).send(data.books);
          else response.status(200).send([]);
        }
      });
  },
  createWishlist(user_id, response) {
    WishlistModel.create({ user_id }, (err) => {
      if (err) {
        response.status(500).send("White List is not created due to error");
      } else {
        response.status(200).send();
      }
    });
  },
  addWishlistedItem(user_id, bookId, response) {
    WishlistModel.updateOne(
      { user_id },
      { $push: { books: bookId } },
      (err) => {
        console.log(err);
        if (err) {
          response.status(500).send("book Not Added Due to Error");
        } else {
          this.fetchWishlistedItems(user_id, response);
        }
      }
    );
  },
  removeWishlistedItem(user_id, bookId, response) {
    WishlistModel.updateOne(
      { user_id },
      { $pull: { books: bookId } },
      (err) => {
        if (err) {
          response.status(500).send("book Not removed Due to Error");
        } else {
          this.fetchWishlistedItems(user_id, response);
        }
      }
    );
  },
  clearWishlist(user_id, response) {
    WishlistModel.updateOne({ user_id }, { $set: { books: [] } }, (err) => {
      if (err) {
        response.status(500).send("Wishlist not cleared Due to Error");
      } else {
        response.status(200).send([]);
      }
    });
  },
};

module.exports = wishlistOperations;
