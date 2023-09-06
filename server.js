require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const path = require("path");
const { logger } = require("./middleware/logEvent");
const cors = require("cors");
const errorHandle = require("./middleware/erroHandle");
const corsOperations = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const credentials = require("./middleware/credentials");

//connect to mongoose
connectDB();

app.use(logger);

// Cross Origin Resource sharing
app.use(cors(corsOperations));

//Handle options credentials check - before CORS
// And fetch cookies Requirement
app.use(credentials);

//Build-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//buld-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// serve static  public
app.use("/", express.static(path.join(__dirname, "/public")));

//routes
app.use("/", require("./route/root"));
app.use("/register", require("./route/api/register"));
app.use("/login", require("./route/api/login"));
app.use("/logout", require("./route/api/logout"));
app.use("/refreshtoken", require("./route/refreshToken"));

const os = require("os");
const networkInterfaces = os.networkInterfaces();
let addresses = [];

for (const k in networkInterfaces) {
  for (const k2 in networkInterfaces[k]) {
    const address = networkInterfaces[k][k2];
    if (address.family === "IPv4" && !address.internal) {
      addresses.push(address.address);
    }
  }
}

console.log(addresses);

// app.use(verifyJWT);
app.use("/employees", require("./route/api/employees"));

// app.all("*", (req, res) => {
//   res.status(404)
//   if (req.accepts('html')) {
//     res.sendFile(path.join(__dirname, "views", "404.html"));
//   } else if (req.accepts('json')) {
//     res.json({error : '404 not found'})

//   } else {
//     res.type('txt').send('404 not found')
//   }

// });

app.get(
  "/red(.html)?",
  (req, res, next) => {
    console.log("Allah help me");
    next();
  },
  (req, res) => {
    res.send("it is okay");
  }
);
//handle error
app.use(errorHandle);

mongoose.connection.once("open", () => {
  console.log("connected to mangoosedb");

  app.listen(PORT, () => console.log(`serves run on Port ${PORT}`));
});
