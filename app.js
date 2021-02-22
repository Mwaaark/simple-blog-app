const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const dbUrl = process.env.DB_URL || "mongodb://localhost/simple-blog-app";
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.locals.dayjs = require("dayjs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .then((blogs) => res.json(blogs))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.post("/blogs", (req, res) => {
  const { title, description } = req.body;
  const blog = new Blog({
    title,
    description,
  });
  blog
    .save()
    .then(() => res.json("Blog added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
