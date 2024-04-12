const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar el cuerpo de las solicitudes JSON
app.use(express.json());

// Ruta default del programa
app.get("/", (req, res) => {
    const htmlResponse = `
      <html>
        <head>
          <title>Parcial Segundo Corte</title>
        </head>
        <body>
          <h1>Soy la ruta default del parcial de segundo corte desplegado en vercel</h1>
        </body>
      </html>
    `;
    res.send(htmlResponse);
  });


// Ruta para obtener el precio de una moneda
app.get('/coin/:coinName', async (req, res) => {
    const { coinName } = req.params;
    try {
        const response = await axios.get(`https://api.coincap.io/v2/assets/${coinName}`);
        const price = response.data.data.priceUsd;
        res.send(`El precio en dólares de la moneda para el día de hoy es ${price}`);
    } catch (error) {
        res.status(404).send('El nombre de la moneda no fue encontrado en la base de datos');
    }
});

// Ruta para obtener una lista de usuarios
app.get('/users/:count', (req, res) => {
    // Implementa la lógica para obtener la lista de usuarios
});

// Ruta para crear un nuevo usuario
app.post('/users', (req, res) => {
    // Implementa la lógica para crear un nuevo usuario
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
