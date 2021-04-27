import express from "express";
const app = express();
app.get("/", function (req, res) {
  res.json({
    message: "Hello World!",
  });
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Sakila api is running at http://localhost:${PORT}`);
});
