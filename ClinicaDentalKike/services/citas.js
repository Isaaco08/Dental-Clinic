const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

class Citas {

  constructor() {

  };

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

  async Agregar(UsuarioId, TratamientoId, DescripcionDeCita, FechaDeCita, UsuarioIdAuditoria) {
    let resultado;
    try {
      resultado = await prisma.cita.create({
        data: {
        UsuarioId: UsuarioId,
        TratamientoId: TratamientoId,
        DescripcionDeCita: DescripcionDeCita,
        FechaDeCita: FechaDeCita
        }
      });
      await this.registrarAuditoria(UsuarioIdAuditoria, 'Crear', `Se creó una cita con descripción: ${DescripcionDeCita}`);
    } catch (error) {
      console.error(`No se pudo insertar la cita ${DescripcionDeCita} debido al error: ${error}`);
    }
    return resultado;
  };

  async Actualizar(CitaId, citaData, UsuarioIdAuditoria) {
    let resultado;
    try {
      resultado = await prisma.cita.update({
        where: { CitaId: parseInt(CitaId) },
        data: { 
          UsuarioId: citaData.UsuarioId,
          TratamientoId: citaData.TratamientoId,
          DescripcionDeCita: citaData.DescripcionDeCita,
          //FechaDeCita: new Date(citaData.FechaDeCita)
        },
      });
      await this.registrarAuditoria(UsuarioIdAuditoria, 'Actualizar', `Se actualizó la cita con ID: ${CitaId}`);
    } catch (error) {
      console.error(`No se pudo actualizar la cita ${CitaId} debido al error: ${error}`);
    }
    return resultado;
  };

  async Borrar(CitaId, UsuarioIdAuditoria) {
    let resultado;
    try {
      resultado = await prisma.cita.delete({
        where: {
            CitaId: parseInt(CitaId),
        },
      });
      await this.registrarAuditoria(UsuarioIdAuditoria, 'Eliminar', `Se eliminó la cita con ID: ${CitaId}`);
    } catch (error) {
      console.error(`No se pudo borrar la cita ${CitaId} debido al error: ${error}`);
    }
    return resultado;
  };

  Listar(CitaId) {
    let Cita;
    if (CitaId === undefined) {
      Cita = prisma.cita.findMany({
        include: {
          Usuario: true, // Incluir datos del usuario
          Tratamiento: true, // Incluir datos del tratamiento
        },
      });
    } else {
      Cita = prisma.cita.findMany({
        where: {
          CitaId: parseInt(CitaId),
        },
        include: {
          Usuario: true, // Incluir datos del usuario
          Tratamiento: true, // Incluir datos del tratamiento
        },
      });
    }
    return Cita;
  }
  
}

module.exports = Citas;