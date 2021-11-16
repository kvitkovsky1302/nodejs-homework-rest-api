const mongoose = require("mongoose");

const app = require("../app");

const { PORT = 3000, MONGO_URL } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
