const CartsModel = require("../models/cart");

const cartOperations = {
  fetchItems(user_id, response) {
    CartsModel.findOne({ user_id }, (err, data) => {
      if (err) response.status(500).send();
      else response.status(200).send(data);
    });
  },
  addItem(user_id, book_id, response) {
    console.log({ user_id, book_id });
    CartsModel.findOne({ user_id }, (err, data) => {
      console.log({ err, data });
      if (err) response.status(500).send();
      else if (data && data.items && data.items.length > 0) {
        delete data._id;
        for (let i = 0; i < data.items.length; i++) {
          if (data.items[i].book_id == book_id) {
            data.items[i].quantity += 1;
            break;
          }
        }
        updateCart(user_id, data, response);
      } else {
        this.addEntryToCart(user_id, book_id, response);
      }
    });
  },
  deleteItem(user_id, book_id, response) {
    CartsModel.findOne({ user_id }, (err, data) => {
      if (err) response.status(500).send();
      else {
        if (data && data.items && data.items.length > 0) {
          delete data._id;
          for (let i = 0; i < data.items.length; i++) {
            if (data.items[i].book_id == book_id) {
              delete data.items[i];
              break;
            }
          }
          updateCart(user_id, data, response);
        } else {
          response.status(200).send();
        }
      }
    });
  },
  deleteOneItemQunatity(user_id, book_id, response) {
    CartsModel.findOne({ user_id }, (err, data) => {
      if (err) response.status(500).send();
      else if (data && data.items && data.items.length > 0) {
        delete data._id;
        for (let i = 0; i < data.items.length; i++) {
          if (data.items[i].book_id == book_id) {
            data.items[i].quantity -= 1;
            if (data.items[i].quantity == 0) delete data.items[i];
            if (data.items.length == 0) {
              this.clearCart(user_id, response);
              return;
            }
            break;
          }
        }
        updateCart(user_id, data, response);
      } else {
        this.addEntryToCart(user_id, book_id, response);
      }
    });
  },
  clearCart(user_id, response) {
    CartsModel.deleteOne({ user_id }, (err) => {
      if (err) response.status(500).send();
      else response.status(200).send();
    });
  },
  addEntryToCart(user_id, book_id, response) {
    CartsModel.create({ user_id, items: { book_id, quantity: 1 } }, (err) => {
      console.log(err);
      if (err) response.status(500).send();
      else response.status(200).send();
    });
  },
  updateCart(user_id, cart_data, response) {
    CartsModel.updateOne({ user_id }, { $set: cart_data }, (err) => {
      if (err) response.status(500).send();
      else response.status(200).send();
    });
  },
};
module.exports = cartOperations;
