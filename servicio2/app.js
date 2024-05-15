const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3002;

const mongoURI = 'mongodb://miUsuario:miContraseña@mongodb:27017/miDatabase?authSource=admin';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const User = mongoose.model('User', UserSchema);

app.use(express.json());

app.post('/users', (req, res) => {
    const newUser = new User(req.body);

    newUser.save()
      .then(user => res.send(user))
      .catch(err => res.status(400).send(err.message));
});

app.listen(PORT, () => {
    console.log(`Servicio 2 corriendo en puerto ${PORT}`);
});
