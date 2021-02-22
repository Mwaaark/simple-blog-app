const mongoose = require("mongoose");
const Blog = require("./models/blog");

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

const seedDB = async () => {
  await Blog.deleteMany({});
  for (let i = 0; i < 9; i++) {
    const blog = new Blog({
      title: `Maecenas sed magna tempus ${i + 1}`,
      description:
        "Mauris id fermentum nulla. Integer id eleifend lectus. Mauris tempor aliquam quam vel rhoncus. Aliquam molestie, sapien eu convallis molestie, diam orci euismod libero, ut eleifend mi velit a est.",
    });
    await blog.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
