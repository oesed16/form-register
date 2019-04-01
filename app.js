const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser')

// Configuración
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-forms', { useNewUrlParser: true })
  .then(db => console.log('Db connected'))
  .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/styles'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Definición del Schema
const UserSchema = new mongoose.Schema({
    name: { type: String},
    email: { type: String },
    password: { type: String }
});

// Definición del Modelo
const User = mongoose.model("User", UserSchema);

// Rutas
app.get('/', async (req, res) => {
    const users = await User.find({});
    res.render('index', { users: users });
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        contraseña: req.body.password
      });
      console.log(user);
    res.redirect('/');
});

app.listen(3000, () => console.log('Listening on port 3000!'));