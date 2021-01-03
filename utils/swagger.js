var swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");
var swaggerDefinition = {
  info: {
    title: "BookCart API",
    version: "v1",
    contact: {
      name: "Diksha Goyal",
      url: "https://www.linkedin.com/in/dikshagoyal26/",
    },
  },
  host: "localhost:5000",
  basePath: "/",
};

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ["./routes/api/*.js"],
};
var swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
