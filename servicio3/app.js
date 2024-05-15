const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3003;

const mongoURI = 'mongodb://miUsuario:miContraseña@mongodb:27017/miDatabase?authSource=admin';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  age: Number
}));

app.use(express.json());

app.get('/users', (req, res) => {
    User.find()
        .then(users => res.send(users))
        .catch(err => res.status(500).send(err.message));
});

app.put('/users/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(user => res.send(user))
        .catch(err => res.status(500).send(err.message));
});

app.delete('/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.send({ message: 'Usuario eliminado' }))
        .catch(err => res.status(500).send(err.message));
});

app.listen(PORT, () => {
    console.log(`Servicio 3 corriendo en puerto ${PORT}`);
});
