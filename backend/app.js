require("dotenv").config();
require("express-async-errors");
const express = require("express");

//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const app = express();
const authenticateUser = require("./middleware/authentication");

//ConnectDB
const connectDB = require("./db/connect");

//routers
const authRouter = require("./routes/auth");
const friendrequestsRouter = require("./routes/friendrequests");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(express.json());
// extra packages
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(
  rateLimiter({
    windowMs: 30 * 60 * 1000, // 15 minutes
    max: 1000, //limit each IP to 100 requests per windowMS
  })
);

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/friends", authenticateUser, friendrequestsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
