const { PrismaClient } = require("@prisma/client")
const bcrypt = require ('bcrypt');
const crypto = require ('crypto');
const jwt = require ('jsonwebtoken');

const prisma = new PrismaClient();

class Usuarios {

  constructor() {

  };

  PalabraSecreta = "MiPalabraSecreta";

  async Autenticacion(UsuarioId, ContrasenaSinEncriptar) {
    // console.log('Iniciando autenticación para:', UsuarioId);

    // bcrypt.hash(ContrasenaSinEncriptar, 10, function(err, hash) {
    //   console.log(hash); //Contra encriptada
    // });

    let Usuario = await prisma.usuario.findFirst({
      where: {
        UsuarioId: UsuarioId,
      },
      select: {
        TipoDeUsuario: true,
        Contrasena: true,
        Token: true,
        UsuarioId: true
      }
    });

    let resultado = await bcrypt.compare(ContrasenaSinEncriptar, Usuario.Contrasena);

    if(resultado === true) {
      let Token = jwt.sign({ UsuarioId: Usuario.UsuarioId, TipoDeUsuario: Usuario.TipoDeUsuario }, this.PalabraSecreta, { expiresIn: '5m' });
      
      console.log('Token generado:', Token);

      // Actualizar el campo Token en la base de datos
      await prisma.usuario.update({
      where: { UsuarioId: UsuarioId },
      data: { Token: Token }
      });

      return Token
    } else {
      console.log('Contraseña incorrecta');
      return false;
    }
  };

  async ValidarToken(solicitud) {
    try {
      // Extraer el token de la cabecera de autorización
      const tokenRecibido = solicitud.headers.authorization.split(" ")[1];
      //console.log("Token Recibido En Validar:", tokenRecibido)
      // Verificar el token
      const tokenVerificado = jwt.verify(tokenRecibido, this.PalabraSecreta);
  
      // Buscar el usuario 
      const Usuario = await prisma.usuario.findFirst({
        where: {
          UsuarioId: tokenVerificado.UsuarioId
        },
        select: {
          Token: true,
          TipoDeUsuario: true,
          UsuarioId: true
        }
      });
  
      // Comprobar si el token en la base de datos coincide con el token recibido
      if (Usuario && Usuario.Token === tokenRecibido) {
        return { UsuarioId: tokenVerificado.UsuarioId, TipoDeUsuario: tokenVerificado.TipoDeUsuario };
      } else {
        console.log('Token no válido o usuario no encontrado');
        return "Token no válido o usuario no encontrado.";
      }
    } catch (err) {
      console.error('Error al verificar el token:', err);
      return "Error al verificar el token.";
    }
  };
  
  async RegenerarToken(UsuarioId, TipoDeUsuario) {
    let token = jwt.sign({ UsuarioId, TipoDeUsuario }, this.PalabraSecreta, { expiresIn: '5m' }); 
    await prisma.usuario.update({
      where: { 
        UsuarioId: UsuarioId,
      },
      data: {
        Token: token,
      },
    });
    return token;
  }

  async DesAutenticacion(UsuarioId) {
    try {
      await prisma.usuario.update({
        where: { 
          UsuarioId: UsuarioId,
        },
        data: {
          Token: "Sesión cerrada",
        },
      });
    } catch (err) {
    console.log(err);
    }
  }

  async registrarAuditoria(UsuarioIdAuditoria, Accion, DescripcionAuditoria) {
    try {
      await prisma.auditoria.create({
        data: {
          UsuarioIdAuditoria: UsuarioIdAuditoria,
          Accion: Accion,
          DescripcionAuditoria: DescripcionAuditoria
        }
      });
    } catch (error) {
      console.error(`No se pudo registrar la auditoría debido al error: ${error}`);
    }
  }

  async Agregar(UsuarioId, Nombre, PrimerApellido, SegundoApellido, TipoDeUsuario, Contrasena, UsuarioIdAuditoria) {
    let resultado;
    try {

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(Contrasena, 10);

      resultado = await prisma.usuario.create({
        data: {
        UsuarioId: UsuarioId,
        Nombre: Nombre,
        PrimerApellido: PrimerApellido,
        SegundoApellido: SegundoApellido, 
        TipoDeUsuario: TipoDeUsuario,
        Contrasena: hashedPassword,
        }
      });
      await this.registrarAuditoria(UsuarioIdAuditoria, 'Crear', `Se creó un usuario con ID: ${UsuarioId}`);
    } catch (error) {
      console.error(`No se pudo insertar el usuario ${UsuarioId} debido al error: ${error}`);
    }
    return resultado;
  };

  async Actualizar(UsuarioId, usuarioData, UsuarioIdAuditoria) {
    let resultado;
    try {
      resultado = await prisma.usuario.update({
        where: { UsuarioId: UsuarioId },
        data: { 
          Nombre: usuarioData.Nombre,
          PrimerApellido: usuarioData.PrimerApellido,
          SegundoApellido: usuarioData.SegundoApellido,
          TipoDeUsuario: usuarioData.TipoDeUsuario, 
          Contrasena: usuarioData.Contrasena,
          Token: usuarioData.Token,
        },
      });
      await this.registrarAuditoria(UsuarioIdAuditoria, 'Actualizar', `Se actualizó el usuario con ID: ${UsuarioId}`);
    } catch (error) {
      console.error(`No se pudo actualizar el usuario ${UsuarioId} debido al error: ${error}`);
    }
    return resultado;
  };

  async Borrar(UsuarioId, UsuarioIdAuditoria) {
    let resultado;
    try {
      // Eliminar citas asociadas al usuario
      await prisma.cita.deleteMany({
        where: {
          UsuarioId: UsuarioId,
        },
      });
  
      // Eliminar expedientes asociados al usuario
      await prisma.expedienteDePaciente.deleteMany({
        where: {
          UsuarioId: UsuarioId,
        },
      });
  
      // Eliminar el usuario
      resultado = await prisma.usuario.delete({
        where: {
          UsuarioId: UsuarioId,
        },
      });
  
      // Registrar auditoría
      await this.registrarAuditoria(UsuarioIdAuditoria, 'Eliminar', `Se eliminó el usuario con ID: ${UsuarioId}`);
    } catch (error) {
      console.error(`No se pudo borrar el usuario ${UsuarioId} debido al error: ${error}`);
    }
    return resultado;
  }
  
  Listar(UsuarioId) {
    let Usuario;
    if (UsuarioId === undefined) {
      Usuario = prisma.usuario.findMany();
    } else {
      Usuario = prisma.usuario.findMany({
        where: {
            UsuarioId: UsuarioId,
        },
      });
    }
    return Usuario;
  };

  async ListarPacientes() {
    const pacientes = await prisma.usuario.findMany({
      where: {
        TipoDeUsuario: "Paciente"
      }
    });
    return pacientes;
  };
  
}

module.exports = Usuarios;