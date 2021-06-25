const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("E:/Auto Backup of C Drive/Desktop/project/src/models/db/conn");

const Register = require("./models/registers");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);


app.get("/", (req, res) => {
    res.render("index");

});

app.get("/register", (req, res) => {
    res.render("register");
});
app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});
//create a new user in our databse

app.post("/register", async (req, res) => {
    try {
        const password = req.body.Password;
        const cpassword = req.body.ConfirmPassword;

        if (password === cpassword) {

            const registerEmployee = new Register({

                firstname: req.body.fname,
                lastname: req.body.lname,
                email: req.body.email,
                gender: req.body.gen,
                Phone: req.body.phone,
                Password: password,
                ConfirmPassword: cpassword

            })
            const registered = await registerEmployee.save();
            res.status(201).render("profile");


        } else {
            res.send("password are not matching");
        }

    } catch (error) {
        res.status(400).send(error)
    }
})


//login work start

app.post("/login", async(req, res) =>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail= await Register.findOne({email:email});
        if(useremail.Password === password){
            res.status(201).render("index");
        }else
        {
            res.send("incorrect password");
        }

        
    } catch (error) {
        res.status(400).send("invalid Email");
    }
})

app.listen(port, () => {
    console.log(`Server is ruuning at port number ${port}`);
});