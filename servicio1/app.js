const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post('/operacion', (req, res) => {
    const { operacion, numero1, numero2 } = req.body;

    let resultado;
    switch (operacion) {
        case 'suma':
            resultado = numero1 + numero2;
            break;
        case 'resta':
            resultado = numero1 - numero2;
            break;
        case 'multiplicacion':
            resultado = numero1 * numero2;
            break;
        case 'division':
            if (numero2 === 0) {
                return res.status(400).send('División por cero no permitida.');
            }
            resultado = numero1 / numero2;
            break;
        default:
            return res.status(400).send('Operación no soportada.');
    }

    res.send({ resultado });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
