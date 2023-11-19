require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const xss = require("xss-clean")
const helmet = require("helmet")
const hpp = require("hpp")
const ratelimiting = require("express-rate-limit")
const { errorHandler, notFound } = require("./middlewares/error");
const cors = require("cors")
const app = express(); // init app
app.use(express.json()); // middlewares
app.use(helmet()) // security headers
app.use(hpp()) // http param pollution
app.use(xss()) //protect api (cross site scripting)
app.use(ratelimiting({
  windowMs : 10 * 60 * 1000, //100 req in 10mun
  max : 100,
}))
 mongoose.connect(process.env.MONGO_URL)
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} on port` , process.env.PORT);
    console.log("Connected to MongoDB ^_^");

  });
}).catch ((error) => {
    console.log("Connection to MongoDB failed !", error)
});
app.use(cors({
  origin : "http://localhost:3000"
}))
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/users", require("./routes/usersRoute"))
app.use("/api/posts", require("./routes/postsRoute"))
app.use("/api/comments", require("./routes/commentRoutes"))
app.use("/api/categories", require("./routes/categoryRoutes"))
app.use("/api/password", require("./routes/passwordRoute"))
app.use(notFound)
app.use(errorHandler)