const express = require(`express`);
const hbs = require(`hbs`);
const faker = require(`@faker-js/faker`);

let app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`public`));
app.set(`views`, `views`);
app.set(`view engine`, `hbs`);

let users = [];
let emails = [];

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

app.get(`/`, (req, res) => {
  res.render(`index`);
});

let loginRoot = `admin`;
let passRoot = `root`;
app.get(`admin-login`, (req, res) => {
  res.render(`admin-login`);
});
app.post(`/admin`, (req, res) => {
  let login = req.body.login;
  let password = req.body.password;
  if (login == loginRoot && password == passRoot) {
    res.render(`admin-page`);
  } else {
    res.render(`admin`, { err: "Invalid credentials" });
  }
});

app.post(`/register`, (req, res) => {
  console.log(req.body.pass);
  let login = req.body.login;
  let pass = req.body.pass;
  let name = req.body.name;
  let surname = req.body.surname;
  let user = { login: login, pass: pass, fullname: name + " " + surname };
  if (emails.includes(login)) {
    res.render(`index`, { errorcode: "Такой пользователь уже существует" });
  } else {
    users.push(user);
    emails.push(login);
    res.render(`shop`, { user: user });
  }
});
