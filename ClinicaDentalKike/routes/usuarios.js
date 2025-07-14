const express = require("express");
const ServicioUsuarios = require('.//../services/usuarios');

const Usuarios = new ServicioUsuarios();

const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();
const Router = express.Router();

Router.post("/autenticar", async (solicitud, respuesta) => {
  respuesta.json(await Usuarios.Autenticacion(solicitud.body.UsuarioId, solicitud.body.Contrasena))
});

Router.post("/validarToken", async (solicitud, respuesta) => {
  respuesta.json(await Usuarios.ValidarToken(solicitud))
});

Router.post("/desautenticar", async (solicitud, respuesta) => {
  respuesta.json(await Usuarios.DesAutenticacion(solicitud.body.UsuarioId));
});

Router.post("/listar", async (solicitud, respuesta) => {
    let resultado;
    try{
      resultado = await Usuarios.ValidarToken(solicitud);
    } catch(error) {
      console.error('Error en la validación del token:', error);
      respuesta.status(401).json(error);
    }
    if(resultado.TipoDeUsuario === 'Doctor' || resultado.TipoDeUsuario === 'Recepcionista'){
      const Usuario = await listadoDeUsuarios(solicitud.params.UsuarioId);
      Usuario.push({ Token: await Usuarios.RegenerarToken(resultado.UsuarioId, resultado.TipoDeUsuario)});
      respuesta.json(Usuario);
    } else {
      console.log('Acceso no autorizado');
      respuesta.status(401).json();
    }
  });
  
  Router.get("/:UsuarioId", async (solicitud, respuesta) => {
    let resultado;
    try{
      resultado = await Usuarios.ValidarToken(solicitud);
    } catch(error) {
      console.error('Error en la validación del token:', error);
      respuesta.status(401).json(error);
    }
    if(resultado.TipoDeUsuario === 'Doctor' || resultado.TipoDeUsuario === 'Recepcionista'){
      const Usuarios = await listadoDeUsuarios(solicitud.params.UsuarioId);
      respuesta.json(Usuarios);
    } else {
      console.log('Acceso no autorizado');
      respuesta.status(401).json();
    }
  });
  
  function listadoDeUsuarios(UsuarioId) {
    return Usuarios.Listar(UsuarioId)
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
      let NuevosDatos = [Usuarios.Agregar(solicitud.body.UsuarioId, solicitud.body.Nombre, solicitud.body.PrimerApellido, solicitud.body.SegundoApellido, solicitud.body.TipoDeUsuario, solicitud.body.Contrasena, solicitud.body.UsuarioIdAuditoria)];
      NuevosDatos.push({ Token: await Usuarios.RegenerarToken(resultado.UsuarioId, resultado.TipoDeUsuario)});

      respuesta.json(NuevosDatos);
    } else {
      console.log('Acceso no autorizado');
      respuesta.status(401).json();
    }
  });
    
  
Router.delete('/:UsuarioId', async (solicitud, respuesta) => {
    let resultado;
    try{
      resultado = await Usuarios.ValidarToken(solicitud);
    } catch(error) {
      console.error('Error en la validación del token:', error);
      respuesta.status(401).json(error);
    }

    if(resultado.TipoDeUsuario === 'Doctor' || resultado.TipoDeUsuario === 'Recepcionista'){
      respuesta.json(Usuarios.Borrar(solicitud.params.UsuarioId, solicitud.body.UsuarioIdAuditoria));
    } else {
      console.log('Acceso no autorizado');
      respuesta.status(401).json();
    }
  });
  
Router.put('/:UsuarioId', async (solicitud, respuesta) => {
    const { UsuarioId } = solicitud.params;
    const { ...usuarioData } = solicitud.body;
    let resultado;
    try{
      resultado = await Usuarios.ValidarToken(solicitud);
    } catch(error) {
      console.error('Error en la validación del token:', error);
      respuesta.status(401).json(error);
    }
    if(resultado.TipoDeUsuario === 'Doctor' || resultado.TipoDeUsuario === 'Recepcionista'){
      respuesta.json(Usuarios.Actualizar(UsuarioId, usuarioData, solicitud.body.UsuarioIdAuditoria));
    } else {
      console.log('Acceso no autorizado');
      respuesta.status(401).json();
    }
  });

module.exports = Router;