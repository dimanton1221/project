const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const LoginRouters = require("./routers/user");
const ClientRouters = require("./routers/ClientRouters");
const InvoiceRouters = require("./routers/Invoice");
const JadwalRouters = require("./routers/JadwalRoutes");
const pagesRouters = require("./routers/pages");
const mysqlStore = require("express-mysql-session")(sessions);
const cors = require("cors");
require("dotenv").config();

const app = express();

const options = {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
};

const sessionStore = new mysqlStore(options);

// middleware
const oneDay = 1000 * 60 * 60 * 24;
//session middleware
app.use(
    sessions({
        store: sessionStore,
        secret: process.env.SESSION_SECRET,
        saveUninitialized: true,
        cookie: { maxAge: oneDay },
        resave: false,
    })
);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");
// custom middleware
app.use("/",pagesRouters);
app.use("/user", LoginRouters);
app.use("/clients", ClientRouters);
app.use("/invoices", InvoiceRouters);
app.use("/delivery-schedules", JadwalRouters);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
