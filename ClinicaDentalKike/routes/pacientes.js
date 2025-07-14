const express = require("express");
const ServicioUsuarios = require('.//../services/usuarios');

const Usuarios = new ServicioUsuarios();

const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();
const Router = express.Router();


function listadoDePacientes(UsuarioId) {
    return Usuarios.ListarPacientes(UsuarioId)
}

Router.get("/", async (solicitud, respuesta) => {
    const Usuarios = await listadoDePacientes(solicitud.params.UsuarioId);
    respuesta.json(Usuarios);
});


module.exports = Router;