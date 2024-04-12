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
          <h1>Hecho por: Nicolas Esteban Muñoz Sendoya</h1>
          <h1>ID Estudiantil: 0000302248</h1>
        </body>
      </html>
    `;
    res.send(htmlResponse);
  });

  // Ruta para obtener el precio de una moneda específica
  app.get('/coin/:coinName', async (req, res) => {
      const { coinName } = req.params;
  
      try {
          // Hacer una solicitud GET a la API de CoinCap
          const response = await axios.get(`https://api.coincap.io/v2/assets/${coinName}`);
          const data = response.data.data;
  
          // Verificar si se encontró la moneda en la base de datos de CoinCap
          if (data) {
              const priceUsd = data.priceUsd;
              res.send(`El precio en dólares de ${coinName} para el día de hoy es ${priceUsd}`);
          } else {
              res.status(404).send("El nombre de la moneda no fue encontrado en la base de datos");
          }
      } catch (error) {
          console.error("Error al obtener el precio de la moneda:", error);
          res.status(500).send("Ocurrió un error al procesar la solicitud");
      }
  });
  

// Array de estudiantes
const students = [
  "ACERO GARCIA, SAMUEL",
  "ALJURI MARTINEZ, DAREK",
  "AZCONA, ANDRÉS",
  "CEPEDA URIBE, JUAN FELIPE",
  "CHAVES PEREZ, ANA MARIA",
  "CRUZ PAVAS, CARLOS DAVID",
  "DIAZ ALGARIN, DIEGO NORBERTO",
  "DIAZ BERNAL, JORGE ESTEBAN",
  "DIAZ VARGAS, DAVID ESTEBAN",
  "FORERO PEÑA, JUAN JOSE",
  "GUTIERREZ DE PIÑERES BARBOSA, SANTIAGO",
  "LOPEZ HUERTAS, SAMUEL ESTEBAN",
  "MEDINA FERNANDEZ, MICHAEL STEVEN",
  "MORENO CARVAJAL, KATHERIN JULIANA",
  "MORENO PATARROYO, JUAN PABLO",
  "MUÑOZ SENDOYA, NICOLAS ESTEBAN",
  "NAVARRO CUY, SANTIAGO",
  "PARRADO MORALES, JUAN PABLO",
  "RAMIREZ CHINCHILLA, DANIEL SANTIAGO",
  "RESTREPO COCA, JUAN PABLO",
  "REYES GONZALEZ, GABRIELA",
  "RODRIGUEZ FALLA, JUAN JOSE",
  "RUIZ TORRES, VALENTINA",
  "SALAS GUTIERREZ, MARIANA",
  "SANCHEZ SANDOVAL, SEBASTIAN",
  "SARMIENTO GUARNIZO, JOSUE DAVID",
  "SOLER PRADO, SANTIAGO",
  "TAMAYO LOPEZ, MARIA FERNANDA",
  "URREA LARA, DEIVID NICOLAS"
];
  
  // Ruta para obtener una lista de usuarios
app.get('/users/:count', (req, res) => {
    let { count } = req.params;
    let { sort } = req.query;
    count = parseInt(count); // Convertir a entero

    // Verificar si el parámetro count está presente y es válido
    if (!count || count > students.length) {
        count = students.length; // Por defecto, devolver todos los estudiantes
    }

    // Ordenar la lista de estudiantes según el parámetro sort
    let sortedStudents;
    if (sort && sort.toUpperCase() === 'DESC') {
        sortedStudents = students.slice(0, count).sort((a, b) => b.localeCompare(a)); // Ordenar descendente
    } else {
        sortedStudents = students.slice(0, count).sort((a, b) => a.localeCompare(b)); // Ordenar ascendente
    }

    // Construir la lista de usuarios con nombre y apellido
    const userList = sortedStudents.map(student => {
        const [lastName, firstName] = student.split(', ');
        return { Nombre: `${firstName}`, 
                 Apellido: `${lastName}` };
    });

    // Retornar la lista de usuarios como JSON
    res.json(userList);
});


  
// Ruta para crear un nuevo usuario
app.post('/users', (req, res) => {
    const { name, lastName, email, city = "Bogotá", country = "Colombia" } = req.body;

    // Verificar si los campos obligatorios están presentes
    if (!name || !lastName || !email) {
        return res.status(400).json({ error: "Nombre, apellido y correo electrónico son campos obligatorios." });
    }

    // Verificar y asignar automáticamente "Bogotá" si city está vacío
    const validatedCity = city === "" ? "Bogotá": city;
    
    // Verificar y asignar automáticamente "Colombia" si country está vacío
    const validatedCountry = country === "" ? "Colombia": country;

    // Crear el objeto de usuario
    const newUser = {
        name,
        lastName,
        email,
        city: validatedCity,
        country: validatedCountry
    };

    // Aquí podrías guardar el nuevo usuario en tu base de datos, pero por ahora solo lo devolveremos como respuesta
    res.status(201).json(newUser);
});



// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
