const express = require("express");
const ServicioExpedientes = require('.//../services/expedientes');
const ServicioUsuarios = require('.//../services/usuarios');

const Usuarios = new ServicioUsuarios();
const Expedientes = new ServicioExpedientes();

const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();
const Router = express.Router();

Router.post("/listar", async (solicitud, respuesta) => {
  let resultado;
  try{
    resultado = await Usuarios.ValidarToken(solicitud);
  } catch(error) {
    console.error('Error en la validación del token:', error);
    respuesta.status(401).json(error);
  }
  if(resultado.TipoDeUsuario === 'Doctor' || resultado.TipoDeUsuario === 'Recepcionista'){
    const Expedientes = await listadoDeExpedientes(solicitud.params.ExpedienteDePacienteId);
    Expedientes.push({ Token: await Usuarios.RegenerarToken(resultado.UsuarioId, resultado.TipoDeUsuario)});
    respuesta.json(Expedientes);
  } else {
    console.log('Acceso no autorizado');
    respuesta.status(401).json();
  }
  });
  
  Router.get("/:ExpedienteDePacienteId", async (solicitud, respuesta) => {
    const Expedientes = await listadoDeExpedientes(solicitud.params.ExpedienteDePacienteId);
    respuesta.json(Expedientes);
  });
  
  function listadoDeExpedientes(ExpedienteDePacienteId) {
    return Expedientes.Listar(ExpedienteDePacienteId)
  }
  
Router.post('/', async (solicitud, respuesta) => {
  let resultado;
    try{
      resultado = await Usuarios.ValidarToken(solicitud);
    } catch(error) {
      console.error('Error en la validación del token:', error);
      respuesta.status(401).json(error);
    }

    if(resultado.TipoDeUsuario === 'Doctor' || resultado.TipoDeUsuario === 'Recepcionista'){
      let NuevosDatos = [Expedientes.Agregar(solicitud.body.UsuarioId, solicitud.body.DescripcionDeExpediente, solicitud.body.UsuarioIdAuditoria)];
      NuevosDatos.push({ Token: await Usuarios.RegenerarToken(resultado.UsuarioId, resultado.TipoDeUsuario)});

      respuesta.json(NuevosDatos);
    } else {
      console.log('Acceso no autorizado');
      respuesta.status(401).json();
    }
  });
  
  
Router.delete('/:ExpedienteDePacienteId', async (solicitud, respuesta) => {
  let resultado;
    try{
      resultado = await Usuarios.ValidarToken(solicitud);
    } catch(error) {
      console.error('Error en la validación del token:', error);
      respuesta.status(401).json(error);
    }

    if(resultado.TipoDeUsuario === 'Doctor' || resultado.TipoDeUsuario === 'Recepcionista'){
      respuesta.json(Expedientes.Borrar(solicitud.params.ExpedienteDePacienteId, solicitud.body.UsuarioIdAuditoria));
    } else {
      console.log('Acceso no autorizado');
      respuesta.status(401).json();
    }
  });
  
Router.put('/:ExpedienteDePacienteId', async (solicitud, respuesta) => {
    const { ExpedienteDePacienteId } = solicitud.params;
    const { ...expedienteData } = solicitud.body;
    let resultado;
    try{
      resultado = await Usuarios.ValidarToken(solicitud);
    } catch(error) {
      console.error('Error en la validación del token:', error);
      respuesta.status(401).json(error);
    }
    if(resultado.TipoDeUsuario === 'Doctor' || resultado.TipoDeUsuario === 'Recepcionista'){
      respuesta.json(Expedientes.Actualizar(ExpedienteDePacienteId, expedienteData, solicitud.body.UsuarioIdAuditoria));
    } else {
      console.log('Acceso no autorizado');
      respuesta.status(401).json();
    }
  });

module.exports = Router;