require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const path = require("path");
const { logger } = require("./middleware/logEvent");
const cors = require("cors");
const errorHandle = require("./middleware/erroHandle");
// const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const credentials = require("./middleware/credentials");

const allowCors = fn => async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res, next)
}

//connect to mongoose
connectDB();

app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
//  app.use(credentials);

//Cross Origin Resource sharing
// app.use(cors(corsOptions));
const corsOptions = {

  origin: ['http://localhost:5173','https://www.abaniseedu.com'],
  credentials: true,
  // optionsSuccessStatus:40

};

app.use(cors(corsOptions));

//Build-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//buld-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// serve static  public
app.use("/", express.static(path.join(__dirname, "/public")));

//routes
app.use("/", allowCors(require("./route/root")));

app.use("/register", allowCors(require("./route/api/register")));
app.use("/login", allowCors(require("./route/api/login")));
app.use("/logout", allowCors(require("./route/api/logout")));
app.use("/refreshtoken", allowCors(require("./route/refreshToken")));
app.use("/getbal", allowCors(require("./route/api/getBal")));
app.use("/sendmessage", allowCors(require("./route/api/sendmessage")));
app.use("/sub", allowCors(require("./route/databundle")));
app.use("/transaction", allowCors(require("./route/transaction")));
app.use("/card", allowCors(require("./route/card")));
app.use("/resetpassword", allowCors(require("./route/resetpassword")));
app.use("/veryfyJWT", allowCors(require("./middleware/verifyJWT")));
app.use("/valid", allowCors(require("./controllers/verify")));
app.use("/dashboard", allowCors(require("./controllers/dashboard")));
app.use("/virtual", allowCors(require("./route/api/virtual")));

app.use("/fund", allowCors(require("./route/api/fund")));


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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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
