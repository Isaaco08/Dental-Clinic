const express = require("express");
const ServicioTratamientos = require('.//../services/tratamientos');
const ServicioUsuarios = require('.//../services/usuarios');

const Usuarios = new ServicioUsuarios();
const Tratamientos = new ServicioTratamientos();


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
    const Tratamientos = await listadoDeTratamientos(solicitud.params.TratamientoId);
    Tratamientos.push({ Token: await Usuarios.RegenerarToken(resultado.UsuarioId, resultado.TipoDeUsuario)});
    respuesta.json(Tratamientos);
  } else {
    console.log('Acceso no autorizado');
    respuesta.status(401).json();
  }
});
  
  Router.get("/:TratamientoId", async (solicitud, respuesta) => {
    const Tratamientos = await listadoDeTratamientos(solicitud.params.TratamientoId);
    respuesta.json(Tratamientos);
  });
  
  function listadoDeTratamientos(TratamientoId) {
    return Tratamientos.Listar(TratamientoId)
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
      let NuevosDatos = [Tratamientos.Agregar( solicitud.body.DescripcionDeTratamiento, solicitud.body.UsuarioIdAuditoria)];
      NuevosDatos.push({ Token: await Usuarios.RegenerarToken(resultado.UsuarioId, resultado.TipoDeUsuario)});

      respuesta.json(NuevosDatos);
    } else {
      console.log('Acceso no autorizado');
      respuesta.status(401).json();
    }
  });
  
  
Router.delete('/:TratamientoId', async (solicitud, respuesta) => {
  let resultado;
    try{
      resultado = await Usuarios.ValidarToken(solicitud);
    } catch(error) {
      console.error('Error en la validación del token:', error);
      respuesta.status(401).json(error);
    }

    if(resultado.TipoDeUsuario === 'Doctor' || resultado.TipoDeUsuario === 'Recepcionista'){
      respuesta.json(Tratamientos.Borrar(solicitud.params.TratamientoId, solicitud.body.UsuarioIdAuditoria));
    } else {
      console.log('Acceso no autorizado');
      respuesta.status(401).json();
    }
  });
  
Router.put('/:TratamientoId', async (solicitud, respuesta) => {
    const { TratamientoId } = solicitud.params;
    const { ...tratamientoData } = solicitud.body;
    let resultado;
    try{
      resultado = await Usuarios.ValidarToken(solicitud);
    } catch(error) {
      console.error('Error en la validación del token:', error);
      respuesta.status(401).json(error);
    }
    if(resultado.TipoDeUsuario === 'Doctor' || resultado.TipoDeUsuario === 'Recepcionista'){
      respuesta.json(Tratamientos.Actualizar(TratamientoId, tratamientoData, solicitud.body.UsuarioIdAuditoria));
    } else {
      console.log('Acceso no autorizado');
      respuesta.status(401).json();
    }
  });

module.exports = Router;