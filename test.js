// Prueba 1

module.exports.traerDatos = (expedienteId, callback) => {
  modelos.Votacion.findAll({
    attributes: ["id"],
    where: { Expediente: expedienteId },
    raw: true
  })
  .then((result) => {
    if (result.length > 0) {
      return modelos.VotacionUsuario.findAll({
        where: { Votacion: result[0].id },
        attributes: ["Voto", "Votacion"],
        include: [
          {
            model: modelos.Usuarios,
            attributes: ["Nombre"],
            where: { id: modelos.Sequelize.col("VotacionUsuario.UsuarioId") }
          }
        ],
        raw: true
      });
    } else {
      return []; // Devolver un array vacío si no hay resultados
    }
  })
  .then((resultFinal) => {
    callback(resultFinal);
  })
  .catch((error) => {
    console.error("Error en la consulta:", error);
    callback([]);
  });
};



// Prueba 2
module.exports.traerDatos = (expedienteId, callback) => {
  modelos.Votacion.findAll({
    attributes: ["id"],
    where: { Expediente: expedienteId },
    raw: true
  })
  .then((result) => {
    if (result.length > 0) {
      return modelos.VotacionUsuario.findAll({
        where: { Votacion: result[0].id },
        attributes: ["Voto", "Votacion", "UsuarioId"],
        include: [
          {
            model: modelos.Usuarios,
            attributes: ["Nombre"],
            where: { id: modelos.Sequelize.col("UsuarioId") }
          }
        ],
        raw: true
      });
    } else {
      return []; // Devolver un array vacío si no hay resultados
    }
  })
  .then((resultFinal) => {
    callback(resultFinal);
  })
  .catch((error) => {
    console.error("Error en la consulta:", error);
    callback([]);
  });
};

// Actualización de Usuario

module.exports.actualizarDatos = (datosFormulario, callback) => {
  const { Usuario, Voto, Verificado } = datosFormulario;

  modelos.VotacionUsuario.update(
    { Voto, Verificado },
    { where: { Usuario } }
  )
  .then(() => {
    callback({ success: true, message: 'Datos actualizados con éxito' });
  })
  .catch((error) => {
    console.error("Error al actualizar los datos:", error);
    callback({ success: false, message: 'Error al actualizar los datos' });
  });
};



//Front de actualización votos
// <!-- actualizar.handlebars -->

// <!DOCTYPE html>
// <html lang="es">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Formulario de Actualización</title>
// </head>
// <body>
//   <h1>Formulario de Actualización</h1>

//   <form id="updateForm">
//     <label for="usuario">Usuario:</label>
//     <input type="text" id="usuario" name="usuario" required>

//     <label for="voto">Voto:</label>
//     <input type="number" id="voto" name="voto" required>

//     <label for="verificado">Verificado:</label>
//     <input type="checkbox" id="verificado" name="verificado">

//     <button type="button" onclick="enviarFormulario()">Actualizar</button>
//   </form>

//   <div id="mensaje"></div>

//   <script>
//     function enviarFormulario() {
//       const usuario = document.getElementById('usuario').value;
//       const voto = document.getElementById('voto').value;
//       const verificado = document.getElementById('verificado').checked;

//       const formData = { Usuario: usuario, Voto: voto, Verificado: verificado };

//       fetch('/ruta-de-actualizacion', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       })
//       .then(response => response.json())
//       .then(data => {
//         const mensajeElemento = document.getElementById('mensaje');
//         if (data.success) {
//           mensajeElemento.innerHTML = '<p style="color: green;">Datos actualizados con éxito</p>';
//         } else {
//           mensajeElemento.innerHTML = '<p style="color: red;">Error al actualizar los datos</p>';
//         }
//       })
//       .catch(error => {
//         console.error('Error en la solicitud:', error);
//       });
//     }
//   </script>
// </body>
// </html>



// Posible config
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const controlador = require('./tu-controlador');

const app = express();
const puerto = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Ruta para mostrar el formulario
app.get('/formulario', (req, res) => {
  res.render('actualizar');
});

// Ruta para manejar la actualización de datos
app.post('/ruta-de-actualizacion', (req, res) => {
  const datosFormulario = req.body;

  controlador.actualizarDatos(datosFormulario, (resultado) => {
    res.json(resultado);
  });
});

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});

