const CartsModel = require("../models/cart");

const cartOperations = {
  fetchItems(user_id, response) {
    CartsModel.findOne({ user_id })
      .populate("items.book")
      .exec(function (err, data) {
        console.log({ err, data });
        if (err) response.status(500).send();
        else response.status(200).send(data);
      });
  },
  addItem(user_id, book, response) {
    console.log({ user_id, book });
    CartsModel.findOne({ user_id }, (err, data) => {
      console.log({ err, data });
      if (err) response.status(500).send();
      else if (data && data.items && data.items.length > 0) {
        let bookFound = false;
        for (let i = 0; i < data.items.length; i++) {
          if (data.items[i].book == book) {
            bookFound = true;
            data.items[i].quantity += 1;
            break;
          }
        }
        if (!bookFound) data.items.push({ book, quantity: 1 });
        this.updateCart(data._id, data, response);
      } else {
        this.addEntryToCart(user_id, book, response);
      }
    });
  },
  deleteItem(user_id, book, response) {
    CartsModel.findOne({ user_id }, (err, data) => {
      if (err) response.status(500).send();
      else {
        if (data && data.items && data.items.length > 0) {
          for (let i = 0; i < data.items.length; i++) {
            if (data.items[i].book == book) {
              data.items.splice(i, 1);
              break;
            }
          }
          this.updateCart(data._id, data, response);
        } else {
          response.status(200).send();
        }
      }
    });
  },
  deleteOneItemQunatity(user_id, book, response) {
    CartsModel.findOne({ user_id }, (err, data) => {
      if (err) response.status(500).send();
      else if (data && data.items && data.items.length > 0) {
        for (let i = 0; i < data.items.length; i++) {
          if (data.items[i].book == book) {
            data.items[i].quantity -= 1;
            if (data.items[i].quantity == 0) data.items.splice(i, 1);
            if (data.items.length == 0) {
              this.clearCart(user_id, response);
              return;
            }
            break;
          }
        }
        this.updateCart(data._id, data, response);
      } else {
        this.addEntryToCart(user_id, book, response);
      }
    });
  },
  clearCart(user_id, response) {
    CartsModel.deleteOne({ user_id }, (err) => {
      if (err) response.status(500).send();
      else response.status(200).send();
    });
  },
  addEntryToCart(user_id, book, response) {
    let items = [];
    items.push({ book, quantity: 1 });
    CartsModel.create({ user_id, items: items }, (err) => {
      console.log(err);
      if (err) response.status(500).send();
      else response.status(200).send();
    });
  },
  updateCart(_id, cart_data, response) {
    console.log({ csrt: JSON.stringify(cart_data) });
    if (cart_data._id) delete cart_data._id;
    CartsModel.updateOne({ _id }, { $set: cart_data }, (err) => {
      console.log(err);
      if (err) response.status(500).send();
      else response.status(200).send();
    });
  },
};
module.exports = cartOperations;