const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const validateToken = require("./utils/jwt-middleware");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/swagger.json", function (req, res) {
  const swaggerSpec = require("./utils/swagger");
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
app.use("/user", require("./routes/api/user"));
app.use("/books", require("./routes/api/books"));
app.use("/category", require("./routes/api/categories"));
app.get("/uploads/:file", (req, res) => {
  res.sendFile(req.params.file, { root: "./uploads" });
});
app.use(validateToken);
app.use("/cart", require("./routes/api/cart"));
app.use("/orders", require("./routes/api/orders"));
app.use("/wishlist", require("./routes/api/wishlist"));
app.use("/admin", require("./routes/api/admin"));
app.use((req, res) => {
  res.send("OOPs!!! you have typed something wrong");
});

var PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`server start at ${PORT}`);
  }
});
