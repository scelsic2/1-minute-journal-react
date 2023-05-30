require("dotenv").config();
const express = require("express");
const path = require('path');
const session = require("express-session");
const PORT = process.env.PORT || 3001;
const db = require("./config/connection");

const api_routes = require("./routes/api_routes");
const auth_routes = require("./routes/auth_routes");

const app = express();
app.use(express.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
      secure: process.env.PORT ? true : false ,
      maxAge: 1000 * 60 * 60 * 1
    },
  })
);

app.use("/api", api_routes);
app.use("/auth", auth_routes);

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

db.once("open", () => {
  app.listen(PORT, () => console.log("server started on port %s", PORT));
});
