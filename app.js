//console.log("Bienvenidosss!!");
const express = require("express");
const mongo = require("mongoose");
const cors = require("cors");

const rutaTipoEquipo = require("./Rutas/tipoEquipoRuta");
const rutaEstado = require("./Rutas/estadoEquipoRuta");
const rutaUsuarios = require("./Rutas/usuarioRuta");
const rutaMarca = require("./Rutas/marcaRuta");
const rutaInv = require("./Rutas/inventarioRuta");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/tipos", rutaTipoEquipo);
app.use("/estados", rutaEstado);
app.use("/usuarios", rutaUsuarios);
app.use("/marcas", rutaMarca);
app.use("/inventario", rutaInv);

mongo
  .connect(
    "mongodb+srv://usuarioIUD:jsgddfkd2578@databasemongo.ph5ecmz.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Conexion corecta a Mongo");
  })
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("Conexion exitosa en el puerto 5000"));
