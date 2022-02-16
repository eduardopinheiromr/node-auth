const app = require("./app");
const routes = require("./routes");
require("dotenv").config();

const port = process.env.PORT || 3000;

routes(app);

app.listen(port, function () {
  console.log("API is running at http://localhost:" + port);
});
