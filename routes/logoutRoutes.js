const express = require("express");
const app = express();
const router = express.Router();
const bodyParser= require("body-parser");
const User = require("../Schemas/UserSchema");
const session = require("express-session");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
    if (req.session) {
        req.session.destroy(() => {
            res.redirect("/login");
        })
    }
})


module.exports = router;
