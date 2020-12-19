const CartsModel = require("../models/cart");

const internalCartOperations = {
  addItemLogic(data, book) {
    let bookFound = false;
    for (let i = 0; i < data.items.length; i++) {
      if (data.items[i].book == book) {
        bookFound = true;
        data.items[i].quantity += 1;
        break;
      }
    }
    if (!bookFound) data.items.push({ book, quantity: 1 });
    return data;
  },
  reduceItemQuantityLogic(data, book) {
    for (let i = 0; i < data.items.length; i++) {
      if (data.items[i].book == book) {
        data.items[i].quantity -= 1;
        if (data.items[i].quantity == 0) data.items.splice(i, 1);
        if (data.items.length == 0) {
          return null;
        }
        break;
      }
    }
    return data;
  },
  deleteItem(data, book) {
    for (let i = 0; i < data.items.length; i++) {
      if (data.items[i].book == book) {
        data.items.splice(i, 1);
        break;
      }
    }
    return data;
  },
};

const cartOperations = {
  fetchItems(user_id, response) {
    CartsModel.findOne({ user_id })
      .populate("items.book")
      .exec(function (err, data) {
        if (err) response.status(500).send();
        else response.status(200).send(data.items);
      });
  },
  addItem(user_id, book, response) {
    CartsModel.findOne({ user_id }, (err, data) => {
      if (err) response.status(500).send();
      else if (data && data.items && data.items.length > 0) {
        data = internalCartOperations.addItemLogic(data, book);
        cartOperations.updateCart(user_id, data, response);
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
          let data = internalCartOperations.deleteItem(data, book);
          this.updateCart(user_id, data, response);
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
        data = internalCartOperations.reduceItemQuantityLogic(data, book);
        if (data) this.updateCart(user_id, data, response);
        else this.clearCart(user_id, response);
      } else {
        response.status(200).send();
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
      if (err) response.status(500).send();
      else this.fetchItems(user_id, response);
    });
  },
  updateCart(user_id, cart_data, response) {
    if (cart_data._id) delete cart_data._id;
    CartsModel.updateOne({ user_id }, { $set: cart_data }, (err) => {
      if (err) response.status(500).send();
      else this.fetchItems(user_id, response);
    });
  },
};

module.exports = cartOperations;
