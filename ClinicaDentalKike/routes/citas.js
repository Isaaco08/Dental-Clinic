const express = require("express");
const ServicioCitas = require('.//../services/citas');
const ServicioTratamientos = require('.//../services/tratamientos');
const ServicioUsuarios = require('.//../services/usuarios');

const Usuarios = new ServicioUsuarios();
const Tratamientos = new ServicioTratamientos();
const Citas = new ServicioCitas();

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
    const Citas = await listadoDeCitas(solicitud.params.CitaId);
    Citas.push({ Token: await Usuarios.RegenerarToken(resultado.UsuarioId, resultado.TipoDeUsuario)});
    respuesta.json(Citas);
  } else {
    console.log('Acceso no autorizado');
    respuesta.status(401).json();
  }
  });
  
  Router.get("/:CitaId", async (solicitud, respuesta) => {
    const Citas = await listadoDeCitas(solicitud.params.CitaId);
    respuesta.json(Citas);
  });
  
  function listadoDeCitas(CitaId) {
    return Citas.Listar(CitaId)
  }
  
Router.post('/', async (solicitud, respuesta) => {
  const FechaDeCita = new Date(solicitud.body.FechaDeCita)
  let resultado;
    try{
      resultado = await Usuarios.ValidarToken(solicitud);
    } catch(error) {
      console.error('Error en la validación del token:', error);
      respuesta.status(401).json(error);
    }

    if(resultado.TipoDeUsuario === 'Doctor' || resultado.TipoDeUsuario === 'Recepcionista'){
      let NuevosDatos = [Citas.Agregar(solicitud.body.UsuarioId, solicitud.body.TratamientoId, solicitud.body.DescripcionDeCita, FechaDeCita, solicitud.body.UsuarioIdAuditoria)];
      NuevosDatos.push({ Token: await Usuarios.RegenerarToken(resultado.UsuarioId, resultado.TipoDeUsuario)});

      respuesta.json(NuevosDatos);
    } else {
      console.log('Acceso no autorizado');
      respuesta.status(401).json();
    }  
    });
  
  
Router.delete('/:CitaId', async (solicitud, respuesta) => {
  let resultado;
    try{
      resultado = await Usuarios.ValidarToken(solicitud);
    } catch(error) {
      console.error('Error en la validación del token:', error);
      respuesta.status(401).json(error);
    }

    if(resultado.TipoDeUsuario === 'Doctor' || resultado.TipoDeUsuario === 'Recepcionista'){
      respuesta.json(Citas.Borrar(solicitud.params.CitaId, solicitud.body.UsuarioIdAuditoria));
    } else {
      console.log('Acceso no autorizado');
      respuesta.status(401).json();
    }
  });
  
Router.put('/:CitaId', async (solicitud, respuesta) => {
    const { CitaId } = solicitud.params;
    const { ...citaData } = solicitud.body;
    let resultado;
    try{
      resultado = await Usuarios.ValidarToken(solicitud);
    } catch(error) {
      console.error('Error en la validación del token:', error);
      respuesta.status(401).json(error);
    }
    if(resultado.TipoDeUsuario === 'Doctor' || resultado.TipoDeUsuario === 'Recepcionista'){
      respuesta.json(Citas.Actualizar(CitaId, citaData, solicitud.body.UsuarioIdAuditoria));
    } else {
      console.log('Acceso no autorizado');
      respuesta.status(401).json();
    }
  });

module.exports = Router;